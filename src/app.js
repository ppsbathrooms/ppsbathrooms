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

const test = [1,0,1,1,1,0,0,1,1,0,0,0,0,0];
app.get('/', (req, res) => {
  var dataToSendToClient = {
    brData: test
  };
  res.render('html/index.html', dataToSendToClient);
});

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

// Thing that no one knows how it works but is important
const listener = app.listen(process.env.PORT, function() {
  console.log('listening on port ' + listener.address().port);
});