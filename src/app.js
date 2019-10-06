const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup handlebars engins and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

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
  	message: 'This is some helpful text.',
  	name: 'Mohamed'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
  	return res.send({
  	  error: 'No address is provided!'
  	});
  }

  geocode(req.query.address, (error, {location, latitude, longitude}) => {
  	if (error) {
  	  return res.send({ error });
  	}

  	forecast(latitude, longitude, (error, forecastData) => {
  	  if (error) {
  	  	return res.send({ error });
  	  }

  	  res.send({
  	  	location,
  	  	forecast: forecastData,
  	  	address: req.query.address
  	  });
  	});
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
  	return res.send({
  	  error: 'No search term is provided!'
  	});
  }

  console.log(req.query);
  res.send({
  	products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
  	title: '404',
  	message: 'Help article not found',
  	name: 'Mohamed'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
  	title: 'Error',
  	message: 'Page not found',
  	name: 'Mohamed'
  });
});

app.listen('3000', () => {
  console.log('Server is up on port 3000!');
});