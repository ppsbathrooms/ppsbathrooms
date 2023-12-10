// #region Imports & Setup
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const fs = require('fs');

if (process.env.URI) {
  uri = process.env.URI;
}
else {
  const configData = fs.readFileSync('../config.json', 'utf-8');
  const config = JSON.parse(configData);
  uri = config.uri;
}

const app = express(); // creates app for server's client
const chalk = require('chalk'); // console colors
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.json()); // Express modules / packages
app.use(bodyParser.urlencoded({
  extended: true
})); // Express modules / packages

secretKey = crypto.randomBytes(64).toString('hex');
app.use(session({ secret: secretKey, resave: true, saveUninitialized: true }));
app.use(express.static('views')); // load the files that are in the views directory
// #endregion

// #region Database Stuff


const client = new MongoClient(uri, {
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
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });

//updates bathroom data

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
// Bathrooms
app.get('/', async (req, res) => {
  try {
    doc = await dataColl.findOne({ _id: 'schoolData' });
    doc = doc.value;

    const dataToSendToClient = {
      brData: doc,
      school: null
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
    doc = await dataColl.findOne({ _id: 'schoolData' });
    doc = doc.value;

    const dataToSendToClient = {
      brData: doc,
      school: 'chs'
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
    doc = await dataColl.findOne({ _id: 'schoolData' });
    doc = doc.value;
    
    const dataToSendToClient = {
      brData: doc,
      school: 'fhs'
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
    doc = await dataColl.findOne({ _id: 'schoolData' });
    doc = doc.value;
    
    const dataToSendToClient = {
      brData: doc,
      school: 'ihs'
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

app.get('/account', async (req, res) => {
  const userId = ObjectId(req.session._id);
  const user = await db.collection('users').findOne({ _id: userId });
  
  if(!req.session.authenticated) {
    res.sendFile(__dirname + '/views/html/login/login.html');
    return;
  }
  if(!user) {
    console.log('no user')
    return;
  }
  
  req.session.userAccess = user.access;
  req.session.save();

  if (user.access < 0) {
    res.redirect('/admin/logout')
    return;
  }

  else {
    if(req.session.userAccess == 2) {
      res.render('html/login/studentDash.html')
    } else {
// #region admin data
      const brData = await db.collection('data').findOne({ _id: 'schoolData'});

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
        navItems: ['Logs', 'Schools', 'Dashboard'],
        feedback: formattedFeedback,
        brUpdates: formattedBrUpdates,
        styleData: await readFile('admin/adminStyle.css'),
        username: req.session.username,
        userId: req.session._id,
        schoolData: brData,
        schoolJs: await readFile('admin/inserts/school.js'),
        schoolHtml: await readFile('admin/inserts/schools.html'),
      };
      if (req.session.userAccess === '0') {
        dataToSend.navItems = ['Logs', 'Schools', 'Admin', 'Dashboard']
        dataToSend.adminData = formattedAdminData;
        dataToSend.users = users;

        dataToSend.adminJs = await readFile('admin/inserts/admin.js');
        dataToSend.adminHtml = await readFile('admin/inserts/admin.html');
      }
      
      fs.readFile('admin/admindash.html', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Internal server error');
        } else {
          const modifiedHTML = injectDataIntoHTML(data, dataToSend);

          res.send(modifiedHTML);
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
  const { username, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const existingUser = await userColl.findOne({ username: { $regex: new RegExp(username, 'i') } });
  const existingEmail = await userColl.findOne({ email: { $regex: new RegExp(email, 'i') } });
  const highestKeyUser = await userColl.findOne({}, { sort: { key: -1 } });
  let nextKey = '99999';

  if (highestKeyUser && highestKeyUser.key) {
    const currentKey = parseInt(highestKeyUser.key, 10);
    nextKey = (currentKey + 1).toString().padStart(5, '0');
  }

  const newUserInfo = {
    username: username,
    password: await hashPassword(password),
    access: '2',
    key: nextKey,
    email: email
  };
  
  usernameHasText = (username != '') 
  passwordHasText = (password != '') 
  
  if((username == '') || (password == '') || (email == '')) {
    res.json({ status: -1, error: 'all input fields must be filled'});
  }
  else if (usernameHasText && username.includes(' ')) {
    res.json({ status: -1, error: 'username can\'t have spaces'});
  }
  else if (username.replace(/\s/g, '').length < 5 || username.replace(/\s/g, '').length > 24) {
    res.json({ status: -1, error: 'username is too short'});
  }
  else if (!emailRegex.test(email)) {
    res.json({ status: -1, error: 'enter a valid email address'});
  }
  else if (password.length < 6) {
    res.json({ status: -1, error: 'password is too short'});
  }
  else if(existingUser) {
    res.json({ status: 0, error: `username '${username.toLowerCase()}' is taken`});
  }
  else if(existingEmail) {
    res.json({ status: 0, error: `email is taken`});
  }
  else {
    try {
      await userColl.insertOne(newUserInfo);
      console.log(`new user created '${username}'`);
      res.json({ status: 1});
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  }
});

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    return hashedPassword;
  } catch (error) {
    console.error('Error occurred while hashing:', error);
    throw error;
  }
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userColl.findOne({ username: { $regex: new RegExp(username, 'i') } });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        if(user.access < 0) {
          res.json({status: -1});
        }
        else {
          req.session.authenticated = true;
          req.session.userAccess = user.access;
          req.session._id = user._id;
          req.session.username = user.username;
          dbEntry(req, 'adminlogins', user.username);
          res.json({ status: 1});
        }
      } else {
        res.json({ status: 0});
      }
    } else {
        res.json({ status: 0});
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//recieve post request, send update
app.post('/updatePassword', async function(req, res) {
  if(req.session.authenticated && hasAccess('updatePassword', req.session.userAccess)) {
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
        console.log(chalk.white(`${school} password changed: ${currentPass} => ${newPass}`))
    }
    else {
      res.json({ isCorrect: false});
    }
  }
});

app.post('/updateUser', async function(req, res) {
  if (req.session.authenticated && hasAccess('updateUser', req.session.userAccess)) {
    const id = req.body.id;
    const objectId = ObjectId(id);
    const valueName = req.body.valueName;
    var newValue = req.body.newValue;

    const user = await db.collection('users').findOne({ _id: objectId }); 

    if(id === req.session._id) {
      req.session.userAccess = newValue;
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

    if (req.session.authenticated && providedPassword === 'c2fRCdYotZ' && hasAccess('multiBathroomUpdate', req.session.userAccess)) {
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

function injectDataIntoHTML(htmlContent, data) {
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
                          <h3>access</h3>
                          <select name="access" class="userAccess" id="access${user._id}">
                              <option value="0" ${user.access==0 ? ' selected' : '' }>owner</option>
                              <option value="1" ${user.access==1 ? ' selected' : '' }>admin</option>
                              <option value="2" ${user.access==2 ? ' selected' : '' }>student</option>
                              <option value="-1" ${user.access==-1 ? ' selected' : '' }>blocked</option>
                          </select>
                        </div>
                        <h3>user id</h3>
                        <p id="userId${user._id}">${user._id}</p>
                        <div>
                          <h3>key</h3>
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
                        <p>email : ${user.email}</p>                      
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
    .replace('{{schools}}', schoolsInsert)
    .replace('{{brData}}', 
    `<div style="display: none">
      <p id="chsData">${chsData}</p>
      <p id="fhsData">${fhsData}</p>
      <p id="ihsData">${ihsData}</p>
    </div>`)
  return modifiedHTML;
}

function hasAccess(name, access) {
  // post request access levels
  const owner = ['updateUser', 'updatePassword', 'multiBathroomUpdate'];
  const admin = ['updatePassword', 'multiBathroomUpdate'];
  const student = [];

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

async function dbEntry(request, collectionName, value, school, numChanged) {
    try {
        await client.connect();
        const collection = db.collection(collectionName);
        const dbentry = {
            time: dateTime(),
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
    const currentdate = new Date();
    const pst = new Date(currentdate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));

    const month = pst.getMonth() + 1;
    const day = pst.getDate();
    const year = pst.getFullYear();
    const date = `${year}-${month}-${day}`;

    await client.connect();
    const collection = db.collection('pageVisits');
    const filter = { date: date };

    const existingDocument = await collection.findOne(filter);

    if (existingDocument) {
      // If the document exists, update the 'visits' field by incrementing it
      await collection.updateOne(filter, { $inc: { visits: 1 } });
    } else {
      // If the document doesn't exist, insert a new one with 'visits' set to 1
      await collection.insertOne({
        date: date,
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
// Writes text to a file
async function writeToFile(filename, newText, includeDate, other) {
  filename = 'txt/' + filename;
  fs.readFile(filename + '.txt', function(err, buf) {
    var previousText = String(buf);
    date = includeDate ? dateTime() : '';

    var txt = date + " | " + String(newText) + '\n' + previousText;

    fs.writeFile(filename + '.txt', txt, err => {
      if (err) throw err;
    });
  });
}


// Gets the current datetime
function dateTime() {
    var currentdate = new Date();
    var pst = new Date(currentdate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));

    var month = pst.getMonth() + 1;
    var day = pst.getDate();
    var year = pst.getFullYear().toString().slice(-2);
    var hours = pst.getHours();
    var minutes = pst.getMinutes();
    var seconds = pst.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // handle midnight (12 AM)

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var formattedDate = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ' ' + ampm;
    return formattedDate;
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