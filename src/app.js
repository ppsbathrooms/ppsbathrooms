// #region Imports & Setup
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const path = require('path');
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const bot = require('./bot');
const { dateTime } = require('./tools/dateTime');

const fs = require('fs');

const app = express(); // creates app for server's client
const chalk = require('chalk'); // console colors
const bcrypt = require('bcrypt'); // encryption
const crypto = require('crypto'); // generate strings

const axios = require('axios');

const CronJob = require('cron').CronJob; // schedule functions
const updateSchedulesJob = new CronJob('0 * * * *', updateAllPeriods);
updateSchedulesJob.start();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const sgMail = require('@sendgrid/mail');

dotenv.config({ path: "../.env" });

emailApi = process.env.EMAIL_API;
trivoryApi = process.env.TRIVORY_API;

sgMail.setApiKey(emailApi);

function updateAllPeriods() {
  ['cleveland', 'franklin', 'ibw'].forEach(school => {
    getPeriodData(school)
  })  
}
async function getPeriodData(school) {
  try {
    const response = await axios.get("https://trivory.com/api/today_schedule?schoolid=" + school + "&language=en&api_key=" + trivoryApi);
    const json = response.data;
    const schedule = {};
    // if(json.bellSchedule[0] != undefined) {
    const bellSchedule = json.bell_schedule[0].sched;      
    bellSchedule.forEach((period) => {
      const periodInfo = {
        start: new Date(period[0].start),
        startTime: period[0].start_time,
        end: new Date(period[0].end),
        endTime: period[0].end_time,
      };
      schedule[period[0].period] = periodInfo;
    });
    // }

    schedule['day_subtitle'] = json.day_subtitle_short;
    dt = dateTime();
    schedule['time_updated'] = `${dt.date.year.toString().slice(-2)}-${dt.date.month}-${dt.date.day} ${dt.time.hours}:${dt.time.minutes} ${dt.time.ampm}`;

    try {
      await dataColl.findOneAndUpdate(
        { schedule: school },
        { $set: { value: schedule } },
      );

      console.log(chalk.green.dim(`${dt.date.year}/${dt.date.month}/${dt.date.day} ${dt.time.hours}:${dt.time.minutes}:${dt.time.seconds} ${dt.time.ampm}` + ' | ' + school + ' schedule updated'));

    } catch (error) {
      console.error('Error updating document:', error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}



function verifyEmail(email, name, verificationKey) {
  fs.readFile('emails/verifyEmailHtml.html', 'utf8', (err, data) => {
    const unescapedEmail = unescapeRegExp(email)
    const modifiedHtml = data
      .replace('{{username}}', name)
      .replace('{{link}}', `http://ppsbathrooms.org/verify/${unescapedEmail}/${verificationKey}`)
    const msg = {
      to: unescapedEmail,
      from: 'verify@ppsbathrooms.org',
      subject: 'Welcome to ppsbathrooms! Please verify your email. ',
      html: modifiedHtml
    };

    sgMail.send(msg)
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  });
}


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(express.static('views')); // load the files that are in the views directory

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use((req, res, next) => {
  // check if the user is authenticated using Google OAuth2
  if (req.isAuthenticated()) {
    // console.log('google login')
    req.session.profile = req.user;
    req.session.authenticated = true;
  }
  else if(req.session.authenticated) {
    // console.log('normal login')
  }
  else {
    // console.log('not logged in')
  }
  // TODO: Check your custom authentication method here and update req.session.profile accordingly
  next();
});


app.use(bodyParser.json()); // Express modules / packages
app.use(bodyParser.urlencoded({
  extended: true
})); // Express modules / packages
// #endregion

// #region Database Stuff


const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

db = client.db("ppsbathrooms");
dataColl = db.collection("data");
userColl = db.collection("users");

client.connect()
  .then(() => {
    console.error(chalk.green('connected to database'));
    updateExtensionData();
    // updateAllPeriods(); // update schedules on server start
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });

//updates bathroom data

const discordChannels = {
  'admin':'965728549728309269',
  'general':'934859916903067702',
  'info':'961690424924323991',
  'bot_testing':'968269586648662086'
}

async function updateExtensionData() {
  data = await db.collection('data').findOne({ _id: 'schoolData'});
  values = JSON.stringify(data.value)
  fs.writeFile('views/data.json', values, err => {
    if (err) {
      throw err
    }
  });
}

async function setBrData(school, value, request) {
  try {
    doc = await dataColl.findOne({ _id: 'schoolData' });
    doc = doc.value;

    chs = doc[0];
    fhs = doc[1];
    ihs = doc[2];

    switch(school) {
      case 'chs':
        chs = value;
        break;
      case 'fhs':
        fhs = value;
        break;
      case 'ihs':
        ihs = value;
        break;
    }

    newValue = [chs, fhs, ihs]
    numDiff = numDiffCharacters(newValue, doc)
    if(numDiff > 0) {
      dbEntry(request, 'bathrooms', value, school, numDiff)
    }
    await updateBrs(newValue);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function updateBrs(newValue) {
  brUpdated();
  try {
    await client.connect();
    await dataColl.updateOne({ _id: "schoolData" }, { $set: {value: newValue }}, {});
    updateExtensionData();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// #endregion

// #region Pages
async function getCurrentClass(req) {
  currentClass = -1;
  if(req.session.authenticated) {
    const user = await userColl.findOne({ _id: new ObjectId(req.session.profile._id) });
    const schedule = await dataColl.findOne({ schedule: user.school});
    currentPeriod = getCurrentPeriod(schedule)
    if(!isNaN(currentPeriod)) {
      currentClass = user.schedule[currentPeriod - 1]
      currentClass = currentClass ? currentClass : -1;
    }
  }
  return currentClass;
}

// #region Google auth
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    async function(req, _accessToken, _refreshToken, profile, done) {
      try {
        // Check if the user with the email already exists
        const existingUser = await userColl.findOne({
          email: profile.emails[0].value
        });

        if (existingUser) {
          return done(null, existingUser);
        } else {
          // user doesn't exist, create new account
          const highestKeyUser = await userColl.findOne({}, {
            sort: {
              key: -1
            }
          });
        
          let nextKey = '99999';

          if (highestKeyUser && highestKeyUser.key) {
            const currentKey = parseInt(highestKeyUser.key, 10);
            nextKey = (currentKey + 1).toString().padStart(5, '0');
          }

          const dt = dateTime();
          const joinTime = `${dt.date.year}/${dt.date.month}/${dt.date.day} ${dt.time.hours}:${dt.time.minutes}:${dt.time.seconds} ${dt.time.ampm}`
          const newUserInfo = {
            username: profile.given_name,
            name: profile.name,
            access: '2',
            key: nextKey,
            email: profile.email,
            emailVerified: true,
            schedule: ['', '', '', '', '', '', '', ''],
            joined: joinTime,
            school: "cleveland",
            br_prefs: {all: "true", female: "false", male: "false"},
          };

          try {
            await userColl.insertOne(newUserInfo);
            console.log(`${profile.displayName} created an account`);
          } catch (error) {
            console.error('Error creating new user:', error);
          }
          // Log the new user in
          return done(null, newUserInfo);
        }
      } catch (err) {
        console.error('Error during authentication:', err);
        return done(err);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//#endregion

// Bathrooms
app.get('/', async (req, res) => {
  try {
    accountData = {
      profile: req.session.profile ? req.session.profile : false,
      currentClass: await getCurrentClass(req)
    }
    const bathroomData = await dataColl.findOne({ _id: 'schoolData' })
    const dataToSendToClient = {
      brData: bathroomData.value,
      school: null,
      accountData: JSON.stringify(accountData)
    };
    pageVisited();
    res.render('html/home', { data: dataToSendToClient });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/cleveland', async (req, res) => {
  try {
    accountData = {
      loggedIn: req.session.authenticated ? true:false,
      currentClass: await getCurrentClass(req)
    }
    const bathroomData = await dataColl.findOne({ _id: 'schoolData' })
    const dataToSendToClient = {
      brData: bathroomData.value,
      school: 'chs',
      accountData: JSON.stringify(accountData)
    };
    pageVisited();
    res.render('html/home', { data: dataToSendToClient });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/franklin', async (req, res) => {
  try {
    accountData = {
      loggedIn: req.session.authenticated ? true:false,
      currentClass: await getCurrentClass(req)
    }
    const bathroomData = await dataColl.findOne({ _id: 'schoolData' })
    const dataToSendToClient = {
      brData: bathroomData.value,
      school: 'fhs',
      accountData: JSON.stringify(accountData)
    };
    pageVisited();
    res.render('html/home', { data: dataToSendToClient });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/ida', async (req, res) => {
  try {
    accountData = {
      loggedIn: req.session.authenticated ? true:false,
      currentClass: await getCurrentClass(req)
    }
    const bathroomData = await dataColl.findOne({ _id: 'schoolData' })
    const dataToSendToClient = {
      brData: bathroomData.value,
      school: 'ihs',
      accountData: JSON.stringify(accountData)
    };
    pageVisited();
    res.render('html/home', { data: dataToSendToClient });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/help', (req, res) => {
  res.render('html/help.html');
  pageVisited();
});

app.get('/about', (req, res) => {
  res.render('html/about.html');
  pageVisited();
});

app.get('/contact', (req, res) => {
  res.render('html/contact.html');
  pageVisited();
});

app.get('/privacy', (req, res) => {
  res.render('html/privacy.html');
  pageVisited();
});

app.get('/terms', (req, res) => {
  res.render('html/terms.html');
  pageVisited();
});

app.get('/schools', (req, res) => {
  res.render('html/schools.html');
  pageVisited();
});

app.get('/createAccount', (req, res) => {
  res.render('html/login/createAccount.html');
  pageVisited();
});

app.get('/login', (req, res) => {
  if(req.session.authenticated) {
    res.redirect('/account')
  }
  else {
  res.render('html/login/login.html');
  }
  pageVisited();
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile']})
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/account',
    failureRedirect: '/auth/failure'
  })
);


app.get('/auth/failure', (req, res) => {
  res.send('something went wrong')
});

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    
    req.session.authenticated = false;

    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

app.get('/verify/:email/:key', async (req,res) => {
  const email = req.params.email;
  const key = escapeRegExp(req.params.key);

  try {
    const user = await userColl.findOne({ emailVerificationKey: key });

    if (user) {
      if((user.email = email) && (user.emailVerificationKey = key)) {
        userColl.updateOne(
          { _id: user._id },
          { 
            $set: { emailVerified: true },
            $unset: { emailVerificationKey: "" }
          },
          function(err, result) {
            if (err) {
              console.log('Error updating user verification:', err);
              return;
            }
            else {
              console.log(`${user.username} verified`)
            }
          }
          );
          // bot.botSendMessage(discordChannels.bot_testing, `${user.username} created an account`, true, false);
        res.redirect('/login?verified=true');
      }
    } else {
      res.redirect('/');
    }

  } catch (err) {
    console.error(err);
  }
});

function getCurrentPeriod(periodData) {
  const currentTime = new Date();
  const schedule = periodData.value;
  for (const period in schedule) {
    const start = new Date(schedule[period].start);
    const end = new Date(schedule[period].end);

    if (currentTime >= start && currentTime <= end) {
      return period; 
    }
  }
  return -1;
}

function getCurrentDay(schedule) {
  let words = schedule.value.day_subtitle.split(' ');
  let adjustedWords = words.map(word => (word.length > 1 ? word.toLowerCase() : word));
  
  let adjustedDescription = adjustedWords.join(' ');
  
  if (isVowel(schedule.value.day_subtitle.charAt(0))) {
      return `Today is an ${adjustedDescription} day`;
  } else {
      return `Today is a ${adjustedDescription} day`;
  }
}

function getCurrentData(currentPeriod, user) {
  if(currentPeriod == -1) {
    return {currentClass:'No current class', classDescription:'No current class'}
  }
  else if ((user.schedule[Number(currentPeriod)-1] == undefined) && currentPeriod != 'Lunch') {
    return {currentClass:'Enter your schedule to use see current period', classDescription:'Enter your schedule to use see current period'}
  }
  else {
    return {
      currentClass:(currentPeriod != 'Lunch') ? user.schedule[Number(currentPeriod)-1] : 'Lunch',
      classDescription:(currentPeriod == 'Lunch') ? 'Your current class is Lunch' : 'Your current class is in room ' + user.schedule[currentPeriod -1]
    }
  }
}

function isVowel(char) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(char.toLowerCase()) !== -1;
}

app.get('/account', async (req, res) => {
  if(req.session.profile == undefined) {
    res.redirect('/login')
    return;
  }
  const userId = new ObjectId(req.session.profile._id);
  const user = await db.collection('users').findOne({ _id: userId });
  if((!req.session.authenticated && !req.isAuthenticated()) || !req.session.profile.emailVerified) {
    res.sendFile(__dirname + '/views/html/login/login.html');
    return;
  }
  if(!user) {
    console.log('no user')
    return;
  }
  
  req.session.profile.access = user.access;
  req.session.save();

  if (user.access < 0) {
    res.redirect('/logout')
    return;
  }

  else {
    if(req.session.profile.access == 2) {
      const accountJs = '<script>' + await readFile('login/inserts/account.js') + '</script>';
      const studentStyle = '<style>' + await readFile('login/studentStyle.css') + '</style>';
      const scheduleStyle = '<style>' + await readFile('login/inserts/schedule.css') + '</style>';
      const updateSchedule = await readFile('login/inserts/updateSchedule.html');
      const changePassword = await readFile('login/inserts/changePassword.html');

      const scheduleJs = '<script>' + await readFile('login/inserts/schedule.js') + '</script>';
      const passwordJs = '<script>' + await readFile('login/inserts/updatePassword.js') + '</script>';

      const objectId = new ObjectId(req.session.profile._id);
      const user = await userColl.findOne({ _id: objectId });
      const schedule = await dataColl.findOne({ schedule: user.school});
      let dropdownOptions = `
          <option value="cleveland"${user.school === 'cleveland' ? ' selected' : ''}>cleveland</option>
          <option value="franklin"${user.school === 'franklin' ? ' selected' : ''}>franklin</option>
          <option value="ibw"${user.school === 'ibw' ? ' selected' : ''}>wells</option>`;

      let brPrefsSelect = `
      <div id="br_prefs">
        <h2>select your prefered bathroom type/s</h2>
        <div class="flex_horizontal">
            <input type="checkbox" name="male" value="male" ${user.br_prefs.male == "true" ? 'checked': ''}>
            <label for="male">male</label><br>
        </div>
        <div class="flex_horizontal">
            <input type="checkbox" name="female" value="female" ${user.br_prefs.female == "true" ? 'checked': ''}>
            <label for="female">female</label><br>
        </div>
        <div class="flex_horizontal">
            <input type="checkbox" name="all" value="all" ${user.br_prefs.all == "true" ? 'checked': ''}>
            <label for="all">all gender</label><br>
        </div><br>
      </div>`

      currentPeriod = getCurrentPeriod(schedule);
    
      currentData = getCurrentData(currentPeriod, user)
      classDescription = currentData.classDescription;
      currentClass = currentData.currentClass;

      currentDay = getCurrentDay(schedule);

      fs.readFile('login/studentDash.html', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Internal server error');
        } else {
          const modifiedHTML = data
            .replace('{{username}}', user.username)

            .replace('{{accountJs}}', accountJs)
            
            .replace('{{passwordJs}}', passwordJs)
            .replace('{{scheduleJs}}', scheduleJs)

            .replace('{{studentStyle}}', studentStyle)
            .replace('{{scheduleStyle}}', scheduleStyle)
            
            
            .replace('{{day_subtitle}}', currentDay)
            .replace('{{current_class}}', classDescription)
            .replace('{{school_options}}', dropdownOptions)
            .replace('{{br_prefs}}', brPrefsSelect)
            
            .replace('{{update_schedule}}', updateSchedule)
            .replace('{{schedule}}', user.schedule)
            
            .replace('{{change_password}}', changePassword)
            
            .replace('{{email}}', user.email)
            
          res.send(modifiedHTML);
        }
      });
    } else {
// #region admin data
      const brData = await db.collection('data').findOne({ _id: 'schoolData'});

      const objectId = new ObjectId(req.session.profile._id);
      const user = await userColl.findOne({ _id: objectId });
      const schedule = await dataColl.findOne({ schedule: user.school});

      const updateSchedule = await readFile('login/inserts/updateSchedule.html');
      const changePassword = await readFile('login/inserts/changePassword.html');

      const scheduleJs = '<script>' + await readFile('login/inserts/schedule.js') + '</script>';
      const passwordJs = '<script>' + await readFile('login/inserts/updatePassword.js') + '</script>';

      const scheduleStyle = '<style>' + await readFile('login/inserts/schedule.css') + '</style>';

      const brUpdates = await db.collection('bathrooms').find({}).toArray();
      const formattedBrUpdates = brUpdates
        .reverse()
        .map(entry => `${entry.time} ${' | '} ${entry.school} ${entry.numChanged} ${' bathrooms updated'}`)
        .join('<br>');

      const feedback = await db.collection('feedback').find({}).toArray();
      const formattedFeedback = feedback
        .reverse()
        .map(entry => `${entry.time} ${' | '} ${entry.value}`)
        .join('<br>');

      const adminData = await db.collection('adminlogins').find({}).toArray();
      const formattedAdminData = adminData
        .filter(entry => entry.ip !== '127.0.0.1')
        .reverse()
        .map(entry => `${entry.time} ${entry.value ? `| ${entry.value}` : ''} ${' | '} ${entry.ip}`)
        .join('<br>');

      const users = await db.collection('users').find({}).toArray();
  // #endregion

      let dataToSend = {
        navItems: ['Logs', 'Schools', 'Dashboard', 'Account'],
        feedback: formattedFeedback,
        brUpdates: formattedBrUpdates,
        styleData: await readFile('login/adminStyle.css'),
        username: req.session.profile.username,
        userId: req.session.profile._id,
        schoolData: brData,
        schoolJs: await readFile('login/inserts/school.js'),
        schoolHtml: await readFile('login/inserts/schools.html'),
      };

      if (req.session.profile.access === '0') {
        dataToSend.navItems = ['Logs', 'Schools', 'Admin', 'Dashboard', 'Account']
        dataToSend.adminData = formattedAdminData;
        dataToSend.users = users;

        dataToSend.adminJs = await readFile('login/inserts/admin.js');
        dataToSend.adminHtml = await readFile('login/inserts/admin.html');
      }
      const currentPeriod = getCurrentPeriod(schedule)
      const currentData = getCurrentData(currentPeriod, user)
      const currentDay = getCurrentDay(schedule);

      let brPrefsSelect = `
      <div id="br_prefs">
        <h2>select your prefered bathroom type/s</h2>
        <div class="flex_horizontal">
            <input type="checkbox" name="male" value="male" ${user.br_prefs.male == "true" ? 'checked': ''}>
            <label for="male">male</label><br>
        </div>
        <div class="flex_horizontal">
            <input type="checkbox" name="female" value="female" ${user.br_prefs.female == "true" ? 'checked': ''}>
            <label for="female">female</label><br>
        </div>
        <div class="flex_horizontal">
            <input type="checkbox" name="all" value="all" ${user.br_prefs.all == "true" ? 'checked': ''}>
            <label for="all">all gender</label><br>
        </div><br>
      </div>`

      const moreData = {
        updateSchedule:updateSchedule,
        changePassword:changePassword,
        user:user,
        schedule:schedule,
        scheduleStyle:scheduleStyle,
        passwordJs:passwordJs,
        scheduleJs:scheduleJs,
        currentPeriod: currentPeriod,
        classDescription: currentData.classDescription,
        currentClass: currentData.currentClass,
        currentDay: currentDay,
        br_prefs: brPrefsSelect
      }
      
      fs.readFile('login/admindash.html', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Internal server error');
        } else {
          modifiedHtml = injectDataIntoHTML(data, dataToSend, moreData);
          
          res.send(modifiedHtml);
        }
      });
    }
  }
});

//admin info
app.get('/pageVisits', async (req, res) => {
  if (req.session.authenticated) {
    try {
      await client.connect();
      const db = client.db('ppsbathrooms');
      const collection = db.collection('pageVisits');

      const visits = await collection.find().toArray();

      res.send(visits);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.render('html/404.html');
  }
});

app.get('/logout', (req, res) => {
  req.session.authenticated = false;
  res.redirect('/login');
});

//404 keep at end of redirects
app.get('*', (req, res) => {
  res.status(404).render('html/404.html', {});
});

// #endregion

// #region Posts

app.post('/createAccount', async (req, res) => {
  const { username, email, password, school, brPrefs } = req.body;
  escapedUsername = escapeRegExp(username)
  escapedEmail = escapeRegExp(email)
  const existingUser = await userColl.findOne({ username: { $regex: new RegExp(`^${escapedUsername}$`, 'i') } })
  const existingEmail = await userColl.findOne({ email: { $regex: new RegExp(`^${escapedEmail}$`, 'i') } })
  const highestKeyUser = await userColl.findOne({}, { sort: { key: -1 } });
  let nextKey = '99999';

  if (highestKeyUser && highestKeyUser.key) {
    const currentKey = parseInt(highestKeyUser.key, 10);
    nextKey = (currentKey + 1).toString().padStart(5, '0');
  }

  verificationKey = crypto.randomBytes(64).toString('hex');



  if(existingUser) {
    res.json({ status: 0, error: `username '${username.toLowerCase()}' is taken`});
    return;
  }
  else if(existingEmail) {
    res.json({ status: 0, error: `email is taken`});
    return;
  }

  const _usernameValid = usernameValid(username);
  const _emailValid = emailValid(email);
  const _passwordValid = passwordValid(password);
  const _schoolValid = checkSchoolsValid(school);
  const _brPrefsValid = checkBrPrefsValid(JSON.stringify(brPrefs));

  if((_usernameValid.status === true) && (_passwordValid.status === true) && (_emailValid.status === true) && (_schoolValid) && (_brPrefsValid)) {
    const dt = dateTime();
    const joinTime = `${dt.date.year}/${dt.date.month}/${dt.date.day} ${dt.time.hours}:${dt.time.minutes}:${dt.time.seconds} ${dt.time.ampm}`

    const newUserInfo = {
      username: username,
      password: await hashPassword(password),
      access: '2',
      key: nextKey,
      email: email,
      emailVerified: false,
      emailVerificationKey: verificationKey,
      schedule: ['','','','','','','',''],
      joined: joinTime,
      school: school,
      br_prefs: brPrefs
    };

    try {
      await userColl.insertOne(newUserInfo);
      verifyEmail(escapedEmail, escapedUsername, verificationKey)

      console.log(`new user created '${username}'`);
      res.json({ status: 1});
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  }
  else {
    if(_usernameValid.status != true) {
      res.json(_usernameValid)
    }
    else if(_emailValid.status != true) {
      res.json(_emailValid)
    }
    else if(_passwordValid.status != true) {
      res.json(_passwordValid)
    }
    else if(_schoolValid != true) {
      res.json({ status: 0, error: 'school is not valid'});
    }
    else if(_brPrefsValid != true) {
      res.json({ status: 0, error: 'br prefs are not valid'});
    }
    else {
      res.json({status: 0, error: 'an error has occured, please try again'})
    }
  }
});

function usernameValid(username) {
  usernameHasText = (username != '')
  if(!usernameHasText) {
    return { status: 0, error: 'all input fields must be filled'};
  }

  else if (username.includes(' ')) {
    return {status: 0, error: 'username can\'t contain spaces'}
  }

  else if (username.replace(/\s/g, '').length < 5 || username.replace(/\s/g, '').length > 24) {
    return {status: 0, error: 'username is too short'}
  }

  else {
    return {status: true, error: ''};
  } 
}

function passwordValid(password) {
  passwordHasText = (password != '');
  
  if(!passwordHasText) {
    return { status: 0, error: 'all input fields must be filled'};
  }

  else if (password.includes(' ')) {
     return { status: 0, error: 'password can\'t contain spaces'};
  }

  if (password.length < 6) {
    return { status: 0, error: 'password is too short'};
  }

  else {
    return {status: true, error: ''};
  }
}

function emailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailHasText = (email != '');

  if(!emailHasText) {
    res.json({ status: 0, error: 'all input fields must be filled'});
  }

  else if (!emailRegex.test(email)) {
    res.json({ status: 0, error: 'enter a valid email address'});
  }
  else {
    return {status: true, error: ''};
  }
}

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    return hashedPassword;
  } catch (error) {
    console.error('Error occurred while hashing:', error);
    throw error;
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function unescapeRegExp(string) {
  return string.replace(/\\([.*+?^${}()|[\]\\\\])/g, '$1');
}


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const escapedUsername = escapeRegExp(username);
    const user = await userColl.findOne({ username: { $regex: new RegExp(`^${escapedUsername}$`, 'i') } });
    if (user) {
      if(user.username.toLowerCase() === username.toLowerCase()) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          if (user.emailVerified == false) {
            res.json({status: -1, error: 'email verification required'});
          }
          else if(user.access < 0) {
            res.json({status: -1, error: 'account blocked'});
          }
          else {
            req.session.authenticated = true;

            req.session.profile = {
              username: user.username,
              email: user.email,
              _id: new ObjectId(user._id),
              access: user.access,
              key: user.key,
              emailVerified: user.emailVerified,
              schedule: user.schedule,
              joined: user.joined,
              school: user.school,
              br_prefs: user.br_prefs
            }
            dbEntry(req, 'adminlogins', user.username);
            res.json({ status: 1});
          }
        } else {
            res.json({status: 0, error: 'authorization failed'});
        }
      }
      else {          
        res.json({status: 0, error: 'authorization failed'});
      }  
    }
    else {
          res.json({status: 0, error: 'authorization failed'});
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/updatePassword', async function(req, res) {
  if(req.session.authenticated) {
    if(req.body.passwordType == 'school' && hasAccess('updateSchoolPassword', req.session)) {
      school = req.body.school;
      currentPass = req.body.currentPass;
      newPass = req.body.newPass;
  
      actualPass = await db.collection('data').findOne({ _id: school + 'Pass'});
  
      if(currentPass == actualPass.password) {
        res.json({ isCorrect: true});
        await db.collection('data').updateOne(
          {"_id": school + 'Pass'},
          {$set : {'password': newPass}}
          );
      }
      else {
        res.json({ isCorrect: false});
      }
    }

    else if(req.body.passwordType = 'self' && hasAccess('updateSelfPassword', req.session)) {
      const objectId = new ObjectId(req.session.profile._id)
      
      const currentPass = req.body.currentPass;
      const newPass = req.body.newPass;
      const user = await userColl.findOne({ _id: objectId});
      
      const passwordMatch = await bcrypt.compare(currentPass, user.password);
  
      if(passwordMatch) {
        const hashedPass = await hashPassword(newPass)
        res.json({ isCorrect: true});
        await userColl.updateOne(
          {"_id": objectId},
          {$set : {'password': hashedPass}}
          );
      }
      else {
        res.json({ isCorrect: false});
      }
    }
  }
});

function checkBrPrefsValid(prefs) {
  const value = JSON.parse(prefs)
  const validKeys = ["male", "female", "all"];
  const validValues = ["true", "false"];
  const keys = Object.keys(value);

  const keysValid = keys.length === 3 && keys.every(key => validKeys.includes(key));
  const valuesValid = keys.every(key => validValues.includes(value[key]));

  return keysValid && valuesValid;
}

function checkSchoolsValid(school) {
  const schools = ['cleveland', 'franklin', 'ibw'];
  return schools.includes(school);
}

app.post('/updateSelf', async function(req, res) {
  if(req.session.authenticated && hasAccess('updateSelf', req.session)) {

    canUpdate = ['school', 'schedule', 'br_prefs'];
    toUpdate = req.body.toUpdate;
    newValue = req.body.newValue;

    if(toUpdate == 'school' && !checkSchoolsValid(newValue)) {
      console.log(chalk.red(req.session.profile.username + ' attempted to change their school to ' + newValue))
      return;
    }

    if(toUpdate == 'br_prefs' && !checkBrPrefsValid(JSON.stringify(newValue))) {
      console.log(chalk.red(req.session.profile.username + ' attempted to change their br prefs to ' + JSON.stringify(newValue)))
      return;
    }

    const objectId = new ObjectId(req.session.profile._id);
    const user = await userColl.findOne({ _id: objectId });

    if(canUpdate.includes(escapeRegExp(toUpdate))) {  
      if(user) {
        const updateQuery = { $set: { [toUpdate]: newValue } };
  
        await db.collection('users').updateOne({ _id: objectId }, updateQuery);
        console.log(chalk.white(`${user.username} ${toUpdate} changed to ${JSON.stringify(newValue)}`));
      }
      else {
        console.log(chalk.red('user not found'))
      }
    }
    else {
      console.log(chalk.red(user.username + ' tried to update ' + toUpdate + ' -> ' + newValue))
    }
  }
});

app.post('/updateUser', async function(req, res) {
  if (req.session.authenticated && hasAccess('updateUser', req.session)) {
    console.log('gwe')
    const id = req.body.id;
    const objectId = new ObjectId(id);
    const valueName = req.body.valueName;
    var newValue = req.body.newValue;

    const user = await db.collection('users').findOne({ _id: objectId }); 

    if(id === req.session.profile._id) {
      req.session.profile.access = newValue;
      req.session.save();
    }

    if (user) {
      const updateQuery = { $set: { [valueName]: newValue } };

      await db.collection('users').updateOne({ _id: objectId }, updateQuery);
      console.log(chalk.white(`${user.username} ${valueName} changed to ${newValue}`));
    } else {
      console.log(chalk.red('User not found'));
    }
  }
});

app.post('/bathroomUpdate', async function(req, res) {
  try {
    var values = req.body.values;
    var school = req.body.school;
    var providedPassword = req.body.confirmation;

    var schoolData = await db.collection('data').findOne({ _id: school + 'Pass' });

    if (!schoolData || !schoolData.password) {
      console.log("Invalid request or password not found for school: ", school);
    }

    var neededPassword = schoolData.password;

    if (req.session.authenticated && providedPassword === 'c2fRCdYotZ' && hasAccess('multiBathroomUpdate', req.session)) {
      res.json({ isCorrect: true });
      setBrData(school, values, req);
    } else {
      if (neededPassword && providedPassword.toLowerCase() === neededPassword.toLowerCase()) {
        values = values.toString().replace(/[\n\r\s]/g, '');
        res.json({ isCorrect: true });
        setBrData(school, values, req);
      } else {
        res.json({ isCorrect: false, error: "Incorrect password" });
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
});


app.post('/sendFeedback', function(req, res) {
  dbEntry(req, 'feedback', req.body.feedback)
});

function injectDataIntoHTML(htmlContent, data, moreData) {
  const defaultDir = 'Logs'
  let adminLogins;
  let navbar = '';
  let allNavItems = '';
  let allNavItemsFull = '';
  let userInfo = '';
  const totalNavItems = data.navItems.length;

  data.navItems.forEach((str, index) => {
    const navItems = '#' + str.toLowerCase() + (index !== totalNavItems - 1 ? ', ' : '');
    const navItemsFull = '#navbar' + str + (index !== totalNavItems - 1 ? ',' : '');

    allNavItems += navItems;
    allNavItemsFull += navItemsFull;
  });

  schoolJsInsert = data.schoolJs ? data.schoolJs : '';
  schoolsInsert = data.schoolHtml ? data.schoolHtml : '';

  adminJsInsert = data.adminJs ? '<script>' + data.adminJs + '</script>' : '';
  adminInsert = data.adminHtml ? data.adminHtml : '';

  let navbarJs = 
  `dir = '` + defaultDir + `'
      function hideAllPannels() {
        $('` + allNavItems + `').hide();
        $('` + allNavItemsFull + `').removeClass("selected");
      }`;

  data.navItems.forEach((str) => {
    let htmlClass = '';
    if(str == defaultDir) {
      htmlClass = 'class="selected"'
    }
    const htmlCode = `
        <button id="navbar${str}" ` + htmlClass + `>
            <img id="icon16" src="style/icons/${str.toLowerCase()}.svg">
            <p>${str}</p>
        </button>
    `;

    const navbarJsInsert = `
      $('#navbar${str}').click(function (e) {
          if (dir != '${str}') {
              dir = '${str}';
              hideAllPannels();
              $('#navbar${str}').addClass("selected");
              $('#${str.toLowerCase()}').fadeIn(50);
          }
      });
    `;
    navbar += htmlCode;
    navbarJs += navbarJsInsert;
  });

  if (data.users) {
    data.users.forEach((user) => {
      userInsert = `
                <div class="user">
                    <div class="userTop">
                        <p class="adminUsername" id="userUsername${user._id}">${user.username}</p>
                        <div style="display: flex; justify-content: center;">
                          <h4>access</h4>
                          <select name="access" class="userAccess" id="access${user._id}">
                              <option value="0" ${user.access==0 ? ' selected' : '' }>owner</option>
                              <option value="1" ${user.access==1 ? ' selected' : '' }>admin</option>
                              <option value="2" ${user.access==2 ? ' selected' : '' }>student</option>
                              <option value="-1" ${user.access==-1 ? ' selected' : '' }>blocked</option>
                          </select>
                        </div>
                        <h4>user id</h4>
                        <p id="userId${user._id}">${user._id}</p>
                        <div>
                          <h4>key</h4>
                          <p id="userKey${user._id}">#${user.key}</p>
                        </div>
                        <button id="togglePerms${user._id}" class="clearButton">more</button>
                    </div>
                    <div id="editPerms${user._id}" class="editPerms">` +
                      // <div class="changeUserPass" id="changePass${user._id}">
                      //   <div class="textInputContainer">
                      //     <input type="text" placeholder="password"></input>
                      //   </div>
                      //   <button class="clearButton smallerButton">CHANGE PASSWORD</button>
                      // </div>
                      `<div>
                        <div style="display:flex;align-items:center;margin-bottom:10px">
                          <p style="margin-bottom:0px;margin-right: 10px;">email : ${user.email + ' '}</p>
                          <img id="verificationImg" ${user.emailVerified ? 'src="/style/icons/check.svg" title="email verified"' : 'src="/style/icons/x.svg" title="email not verified"'}></img>
                        </div>
                        <p>school : ${user.school}</p>
                        <p>schedule : ${(user.schedule == ",,,,,,,") ? 'no schedule' : user.schedule}</p>   
                        <p id="idFull">id : ${user._id}</p>                     
                      </div>
                    </div>
                </div>
      `;
      userInfo += userInsert;
    });
  }

  chsData = data.schoolData.value[0]
  fhsData = data.schoolData.value[1]
  ihsData = data.schoolData.value[2]
  
  if(data.adminData) {
    adminLogins = 
      `<h3>admin logins</h3>
      <div class="txtDisplay">
          ` + data.adminData + `
      </div><br>`
  } else {
    adminLogins = '';
  }

  const modifiedHTML = htmlContent
    .replace('{{logs}}',
      `<div id="logsPannel">
          <div id="leftColumn">
              <div>
                  <h3 style="display: inline-block">bathroom updates</h3>
              </div>
              <div class="txtDisplay">
                  ` + data.brUpdates + `
              </div><br>
              ` + adminLogins + `
          </div>
          <div id="feedbackPannel">
              <h3>feedback</h3>
              <div class="txtDisplay">
                  ` + data.feedback + `
              </div>
          </div>
      </div>`
    )
    
    .replace('{{style}}', '<style>' + data.styleData + '</style>')
    .replace('{{username}}', data.username)
    .replace('{{admin}}', adminInsert)
    .replace('{{id}}', data.userId)
    .replace('{{userList}}', userInfo)
    .replace('{{adminJs}}', adminJsInsert)
    .replace('{{userData}}', JSON.stringify(data.users))
    .replace('{{navbar}}', navbar)
    .replace('{{navbarJs}}', '<script>' + navbarJs + '</script>')
    .replace('{{schoolJs}}', '<script>' + schoolJsInsert + '</script>')

    .replace('{{passwordJs}}', moreData.passwordJs)
    .replace('{{scheduleJs}}', moreData.scheduleJs)

    .replace('{{schools}}', schoolsInsert)

    .replace('{{scheduleStyle}}', moreData.scheduleStyle)

    .replace('{{update_schedule}}', moreData.updateSchedule)
    .replace('{{schedule}}', moreData.user.schedule)

    .replace('{{change_password}}', moreData.changePassword)

    .replace('{{email}}', moreData.user.email)
    
    
    .replace('{{day_subtitle}}', moreData.currentDay)
    .replace('{{current_class}}', moreData.classDescription)

    .replace('{{br_prefs}}', moreData.br_prefs)
    
    .replace('{{school_options}}', 
     `<option value="cleveland"${moreData.user.school === 'cleveland' ? ' selected' : ''}>cleveland</option>
      <option value="franklin"${moreData.user.school === 'franklin' ? ' selected' : ''}>franklin</option>
      <option value="ibw"${moreData.user.school === 'ibw' ? ' selected' : ''}>wells</option>`)

    .replace('{{brData}}', 
    `<div style="display: none">
      <p id="chsData">${chsData}</p>
      <p id="fhsData">${fhsData}</p>
      <p id="ihsData">${ihsData}</p>
    </div>`)
  return modifiedHTML;
}

function hasAccess(name, session) {
  access = session.profile.access;
  if(session.profile.emailVerified) {
    // post request access levels
    const owner = ['updateSelf', 'updateUser', 'updateSchoolPassword', 'updateSelfPassword', 'multiBathroomUpdate'];
    const admin = ['updateSelf', 'updateSchoolPassword', 'updateSelfPassword', 'multiBathroomUpdate'];
    const student = ['updateSelf', 'updateSelfPassword'];
  
    let userAccess;
    switch (Number(access)) {
      case 0:
        userAccess = owner;
        break;
      case 1:
        userAccess = admin;
        break;
      case 2:
        userAccess = student;
        break;
    }
    allowed = userAccess.includes(name)
    return allowed;
  }
  else {
    return false;
  }
}

async function dbEntry(request, collectionName, value, school, numChanged) {
    try {
        await client.connect();
        const collection = db.collection(collectionName);
        const dt = dateTime();
        const reqTime = `${dt.date.year}/${dt.date.month}/${dt.date.day} ${dt.time.hours}:${dt.time.minutes}:${dt.time.seconds} ${dt.time.ampm}`
        const dbentry = {
            time: reqTime,
            ip: request.headers['x-forwarded-for'] || request.socket.remoteAddress
        };
        if (school) {
            dbentry.school = school;
        }
        if(value) {
          dbentry.value = value;
        }     
        if(numChanged) {
          dbentry.numChanged = numChanged;
        }     
        await collection.insertOne(dbentry);
    } catch (err) {
        console.error('Error: ', err);
    }
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function pageVisited() {
  try {
    await client.connect();
    const collection = db.collection('pageVisits');
    dt = dateTime();
    const reqDate = `${dt.date.year}/${dt.date.month}/${dt.date.day}`;
    const filter = { date: reqDate};

    const existingDocument = await collection.findOne(filter);

    if (existingDocument) {
      // If the document exists, update the 'visits' field by incrementing it
      await collection.updateOne(filter, { $inc: { visits: 1 } });
    } else {
      // If the document doesn't exist, insert a new one with 'visits' set to 1
      await collection.insertOne({
        date: reqDate,
        visits: 1
      });
    }
  } catch (err) {
    console.error('Error: ', err);
  }
}

async function brUpdated() {
  try {
    await client.connect();
    await dataColl.updateOne (
      { _id: 'bathroomUpdates' },
      { $inc: { value: 1 } }
    );
  } catch (err) {
    console.error('Error: ', err);
  }
}
// #endregion

// #region Other Nonsense
function numDiffCharacters(arr1, arr2) {
  let differentCharacters = 0;

  for (let i = 0; i < arr1.length; i++) {
      const str1 = arr1[i];
      const str2 = arr2[i];

      for (let j = 0; j < Math.min(str1.length, str2.length); j++) {
          if (str1[j] !== str2[j]) {
              differentCharacters++;
          }
      }

      differentCharacters += Math.abs(str1.length - str2.length);
  }
  return differentCharacters;
}

app.route('/reqtypes')
  .get(function(req, res) {
    res.send('Get');
  })
  .post(function(req, res) {
    res.send('Post');
  })
  .put(function(req, res) {
    res.send('Put');
  });

const PORT = process.env.PORT || 42069;
// thing that works but nobody knows how PLZ DONT TOUCH PLZZZZ
// i touched it... sorry :(
app.listen(PORT, '0.0.0.0', () => {
  console.log(`server started on port ${PORT}`);
});

// #endregion