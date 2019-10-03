const path = require('path');
const express = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');

app.get('', (req, res) => {
  res.render('index', {
  	title: 'Weather',
  	name: 'Mohamed'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
  	title: 'About Me',
  	name: 'Mohamed'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
  	title: 'Help',
  	message: 'This is some helpful text.'
  });
});

app.get('/weather', (req, res) => {
  res.send({
  	location: 'Alexandria',
  	forecast: 'It is sunny'
  });
});

app.listen('3000', () => {
  console.log('Server is up on port 3000!');
});