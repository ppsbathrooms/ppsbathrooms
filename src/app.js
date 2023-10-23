const express = require('express');
const path = require('path');


//Imports the express library
const bodyParser = require('body-parser');

const fs = require('fs');

const app = express(); // Creates an app for your servers client

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json()); // Express modules / packages
app.use(bodyParser.urlencoded({
  extended: true
})); // Express modules / packages

app.use(express.static('views')); // load the files that are in the views directory

var chsdata = fs.readFileSync('chsdata.txt', 'utf8');

app.get('/', (req, res) => {
  res.render('html/schools.html');
});

//cleveland
app.get('/cleveland', (req, res) => {
  var dataToSendToClient = {
    brData: chsdata
  };
  res.render('html/chs.html', dataToSendToClient);
});

//franklin
app.get('/franklin', (req, res) => {
  var dataToSendToClient = {
    brData: chsdata
  };
  res.render('html/fhs.html', dataToSendToClient);
});

//ida
app.get('/ida', (req, res) => {
  var dataToSendToClient = {
    brData: chsdata
  };
  res.render('html/ihs.html', dataToSendToClient);
});

//schools
app.get('/schools', (req, res) => {
  res.render('html/schools.html');
});

//404 keep at end of redirects
app.get('*', (req, res) => {
  res.render('html/404.html', {});
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

// set up listener on port 5500
const listener = app.listen(5500, function() {
  console.log('listening on port ' + listener.address().port);
});