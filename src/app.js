const express = require('express');

const app = express();

app.get('', (req, res) => {
  res.send('<h1>Hello world!</h1>');
});

app.get('/help', (req, res) => {
  res.send([
    {
      name: 'Mohamed',
      age: 25
    },
    {
      name: 'Ahmed',
      age: 27
    }
  ]);
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
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