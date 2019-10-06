const request = require('request');

const forecast = (latitude, longitude, callback) => {
  url = `https://api.darksky.net/forecast/069a64a72d369e5f25b3cd5151a4042f/${latitude},${longitude}?units=si`;
  request({ url, json: true }, (error, {body: forecastData}) => {
  	if (error) {
  	  callback('Unable to connect to weather service!', undefined);
  	} else if (forecastData.error) {
  	  callback('Unable to find weather data for this location!', undefined);
  	} else {
  	  const temperature = forecastData.currently.temperature;
  	  const precipProbability = forecastData.currently.precipProbability;
  	  const summary = forecastData.daily.data[0].summary;
  	  callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
  	}
  });
};

module.exports = forecast;