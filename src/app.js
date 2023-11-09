// #region Imports & Setup

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const fs = require('fs');

const app = express(); // Creates an app for your servers client
const chalk = require('chalk'); // Easy console colors
const bcrypt = require('bcrypt');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json()); // Express modules / packages
app.use(bodyParser.urlencoded({
  extended: true
})); // Express modules / packages

app.use(session({ secret: 'DHPVOGY1rSZ3r43lNtOwZ7trSMvURlPtpN0T6jm1RCsxxSfBtJPSa0kGZXB3dlvO', resave: true, saveUninitialized: true }));
app.use(express.static('views')); // load the files that are in the views directory

// #endregion

// #region Database Stuff
var Datastore = require('nedb');
var db = new Datastore({ filename: 'db.db' });

db.loadDatabase(function (error) {   
  if (error) {
      console.log(chalk.red('FATAL: local database could not be loaded. Caused by: ' + error));
      throw error;
    }
    console.log(chalk.green('local database loaded successfully'))
});

//updates bathroom data
function setBrData(school, value) {
  db.findOne({ name: 'bathrooms' }, function(err, doc) {
    v = doc.value;

    chs = v[0];
    fhs = v[1];
    ihs = v[2];

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

    db.update(
      { _id: 'schoolData'}, 
      { $set: { value: newValue} },
      {},
      db.loadDatabase()
    );
  });
  console.log(chalk.gray(school, 'set to', value));
}

// #endregion

// #region Pages

// Bathrooms
app.get('/', (req, res) => {
  db.findOne({ name: 'bathrooms' }, function(err, doc) {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      var dataToSendToClient = {
        brData: doc.value,
        school: null
      }
      res.render('html/home', { data: dataToSendToClient });
    }
  });
});

app.get('/cleveland', (req, res) => {
  db.findOne({ name: 'bathrooms' }, function(err, doc) {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      var dataToSendToClient = {
        brData: doc.value,
        school: 'chs'
      }
      res.render('html/home', { data: dataToSendToClient });
    }
  });
});

app.get('/franklin', (req, res) => {
  db.findOne({ name: 'bathrooms' }, function(err, doc) {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      var dataToSendToClient = {
        brData: doc.value,
        school: 'fhs'
      }
      res.render('html/home', { data: dataToSendToClient });
    }
  });
});

app.get('/ida', (req, res) => {
  db.findOne({ name: 'bathrooms' }, function(err, doc) {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      var dataToSendToClient = {
        brData: doc.value,
        school: 'ihs'
      }
      res.render('html/home', { data: dataToSendToClient });
    }
  });
});

app.get('/help', (req, res) => {
  res.render('html/help.html');
});

app.get('/contact', (req, res) => {
  res.render('html/contact.html');
});

app.get('/privacy', (req, res) => {
  res.render('html/privacy.html');
});

app.get('/terms', (req, res) => {
  res.render('html/terms.html');
});

app.get('/schools', (req, res) => {
  res.render('html/schools.html');
});


app.get('/admin', (req, res) => {
  if(!req.session.authenticated) {
    res.sendFile(__dirname + '/views/html/admin/login.html');
  }
  else {
    res.sendFile(__dirname + '/dashboard.html');
  }
});


app.post('/admin', async (req, res) => {
  const { username, password } = req.body;

  db.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log('err');
      throw err;
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.authenticated = true;
      res.redirect('/admin');
    } else {
      console.log(chalk.red('wrong login'))
      res.redirect('/admin');
    }
  });
});

app.get('/admin/dashboard', (req, res) => {
  if (req.session.authenticated) {
    res.sendFile(__dirname + '/dashboard.html');
  } else {
    res.redirect('/admin');
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
    setBrData(school, values);

  } else {
    console.log(chalk.red("Wrong pass for " + school + ": '", providedPassword, "'"));
    res.json({ isCorrect: false});
  }
});

app.post('/sendFeedback', function(req, res) {
console.log(chalk.gray("feedback submitted: " + req.body.feedback));
submitFeedback(req.body.feedback);
});

// #endregion

// #region Other Nonsense


function submitFeedback(feedback) {
  fs.readFile('feedback.txt', function(err, buf) {
    var text = String(buf);
    writetofile(text, 'feedback', dateTime() + " | " + feedback);
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
return (new Date().getMonth()+1)  + "/" 
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
}

// Writes text to a file
async function writetofile(txtFileContents, file, read) {
  var newText = txtFileContents + '\n' + read;

  fs.writeFile(file + '.txt', newText, err => {
    if (err) throw err;
  });
};

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