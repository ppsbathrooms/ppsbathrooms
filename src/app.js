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


const app = express(); // Creates an app for your servers client
const chalk = require('chalk'); // Easy console colors
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { MongoClient, ServerApiVersion } = require('mongodb');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

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

client.connect()
  .then(() => {
    console.error(chalk.green('connected to database'));
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });

//updates bathroom data

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
    dbEntry(request, 'bathrooms', value, school, numDiffCharacters(newValue, doc))
    await updateBrs(newValue);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(chalk.gray(school, 'set to', value));
}



async function updateBrs(newValue) {
  brUpdated();
  try {
    await client.connect();
    await dataColl.updateOne({ _id: "schoolData" }, { $set: {value: newValue }}, {});
    // await client.close();
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


app.get('/admin', (req, res) => {
  if(!req.session.authenticated) {
    res.sendFile(__dirname + '/views/html/admin/login.html');
  }
  else {
    res.sendFile(__dirname + '/admindash.html');
  }
});



//admin info

app.get('/feedback', async (req, res) => {
  if (req.session.authenticated) {
    try {
      await client.connect();
      const db = client.db('ppsbathrooms');
      const collection = db.collection('feedback');

      const feedbackEntries = await collection.find().toArray();

      res.send(feedbackEntries);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.render('html/404.html');
  }
});

app.get('/bathroomUpdate', async (req, res) => {
  if (req.session.authenticated) {
    try {
      await client.connect();
      const db = client.db('ppsbathrooms');
      const collection = db.collection('data');
      const bathroomUpdate = await collection.findOne({ _id: 'bathroomUpdates' });

      res.send(bathroomUpdate);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.render('html/404.html');
  }
});

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

app.get('/brupdates', async (req, res) => {
  if (req.session.authenticated) {
    try {
      await client.connect();
      const collection = db.collection('bathrooms');

      const bathroomUpdates = await collection.find().toArray();

      res.send(bathroomUpdates);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.render('html/404.html');
  }
});

app.get('/logins', async (req, res) => {
  if (req.session.authenticated) {
    try {
      await client.connect();
      const db = client.db('ppsbathrooms');
      const collection = db.collection('adminlogins');

      const logins = await collection.find().toArray();

      res.send(logins);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.render('html/404.html');
  }
});

app.get('/admin/logout', (req, res) => {
  req.session.authenticated = false;
  res.redirect('/admin');
});

//404 keep at end of redirects
app.get('*', (req, res) => {
  res.status(404).render('html/404.html', {});
});

// #endregion

// #region Posts

app.post('/admin', async (req, res) => {
  const { username, password } = req.body;
  try {
      doc = await dataColl.findOne({ username: username });
      if (username && bcrypt.compareSync(password, doc.password)) {
        req.session.authenticated = true;
        dbEntry(req, 'adminlogins', false, false)
        res.redirect('/admin');
      } else {
        console.log(chalk.red('wrong login'))
        res.redirect('/admin');
      }
    }catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


//recieve post request, send update
app.post('/bathroomUpdate', function(req, res) {
  var values = req.body.values;
  var school = req.body.school;
  var providedPassword = req.body.confirmation;
  neededPassword = getPassword(school);

  if (providedPassword.toLowerCase() === neededPassword) {
    values = values.toString();
    values = values.replace(/[\n\r]/g, '');
    values = values.replace(/\s/g, '');

    res.json({ isCorrect: true});
    setBrData(school, values, req);
  } else {
    console.log(chalk.red("Wrong pass for " + school + ": '", providedPassword, "'"));
    res.json({ isCorrect: false});
  }
});


app.post('/sendFeedback', function(req, res) {
  console.log(chalk.gray("feedback submitted: " + req.body.feedback));
  dbEntry(req, 'feedback', req.body.feedback)
});

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

useEnvironmentVariables = process.env.CHSPASS != undefined;

chsPass = process.env.CHSPASS;
fhsPass = process.env.FHSPASS;
ihsPass = process.env.IHSPASS;

// Yoinks the password for a school (if you're viewing the public GitHub page plz dont steal)
// haha suckers you cant steal them any more
function getPassword(school) {
  if(useEnvironmentVariables) {
    switch(school) {
      case 'chs':
        password = chsPass;
        break;
      case 'fhs': 
        password = fhsPass;
        break;
      case 'ihs':
        password = ihsPass;
        break;
    }
  } 
  else {
    switch(school) {
      case 'chs':
        password = 'pass';
        break;
      case 'fhs': 
        password = 'franklinpass'
        break;
      case 'ihs':
        password = 'idapass'
        break;
    }
  }

  return password;
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

// Very very useful, used all the time
app.get('/multiple/paths', (req, res) => {
  // exist good
});

const PORT = process.env.PORT || 42069;
// thing that works but nobody knows how PLZ DONT TOUCH PLZZZZ
// i touched it... sorry :(
app.listen(PORT, '0.0.0.0', () => {
  console.log(`server started on port ${PORT}`);
});

// #endregion