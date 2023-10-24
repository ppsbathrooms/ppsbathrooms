const express = require('express');
const path = require('path');


//Imports the express library
const bodyParser = require('body-parser');

const fs = require('fs');

const app = express(); // Creates an app for your servers client
const chalk = require('chalk'); //easy console colors
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json()); // Express modules / packages
app.use(bodyParser.urlencoded({
  extended: true
})); // Express modules / packages

app.use(express.static('views')); // load the files that are in the views directory


//database stuff

var Datastore = require('nedb');
var db = new Datastore({ filename: 'brData.db' });

db.loadDatabase(function (error) {   
  if (error) {
      console.log(chalk.red('FATAL: local database could not be loaded. Caused by: ' + error));
      throw error;
    }
    console.log(chalk.green('INFO: local database loaded successfully.'))
});


// use this stuff to set data inside of database
// var schools = [];

// var chs = {
//   name: 'chs',
//   value: '1,1,1,1,1,1,1,1,1,1,1,1,1,1'
// };

// var fhs = {
//   name: 'fhs',
//   value: '0,0,0,0,0'
// };

// var ihs = {
//   name: 'ihs',
//   value: '0,0,0,0,0,0,0,0,0,0,0,0,0,0'
// };

// schools.push(chs, fhs, ihs);

// db.insert(schools, function(err, docs) {
//     docs.forEach(function(d) {
//         console.log('Saved school:', d.name);
//         console.log('value:', d.value);
//     });
// });




// var chsdata = fs.readFileSync('chsdata.txt', 'utf8');

app.get('/', (req, res) => {
  res.render('html/schools.html');
});

//cleveland
app.get('/cleveland', (req, res) => {
  db.findOne({ name: 'chs' }, function(err, doc) {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      var dataToSendToClient = {
        brData: doc.value
      }
      res.render('html/chs', { data: dataToSendToClient });
    }
  });
});



//franklin
app.get('/franklin', (req, res) => {
  db.findOne({ name: 'fhs' }, function(err, doc) {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      var dataToSendToClient = {
        brData: doc.value
      }
      res.render('html/fhs', { data: dataToSendToClient });
    }
  });
});

//ida
app.get('/ida', (req, res) => {
  db.findOne({ name: 'ihs' }, function(err, doc) {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      var dataToSendToClient = {
        brData: doc.value
      }
      res.render('html/ihs', { data: dataToSendToClient });
    }
  });
});

//schools
app.get('/schools', (req, res) => {
  res.render('html/schools.html');
});

//404 keep at end of redirects
app.get('*', (req, res) => {
  res.status(404).render('html/404.html', {});
});


app
  .route('/reqtypes')
  .get(function(req, res) {
    res.send('Get');
  })
  .post(function(req, res) {
    res.send('Post');
  })
  .put(function(req, res) {
    res.send('Put');
  });

// Very useful, used all the time
app.get('/multiple/paths', (req, res) => {
  // exist
});

// set up listener on port 42069
const listener = app.listen(42069, function() {
  console.log('listening on port ' + listener.address().port);
});