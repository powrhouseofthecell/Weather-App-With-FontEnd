const path = require('path');
const express = require('express');
const getWeather = require('./utils/open-weather');
// import weather from './utils/open-weather.js';
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
// Default path is in the views folder
const viewsPath = path.join(__dirname, '../templates/views');
// const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'ejs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather',
      name: 'Zuhaib Nazir',
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About Me',
      name: 'Zuhaib Nazir',
   });
});

app.get('/help', (req, res) => {
   res.render('help', {
      helpText: 'This is some helpful text.',
      title: 'Help',
      name: 'Zuhaib Nazir',
   });
});

app.get('/weather', (req, res) => {
   const cityName = req.query.address;
   if (!cityName) {
      return res.send({
         error: 'Enter an address',
      });
   }
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`;
   getWeather(url, (data) => {
      const des = `${data.weather[0].description}`;
      const humidity = `${data.main.humidity}`;
      const clouds = `${data.clouds.all}`;
      const country = `${data.sys.country}`;
      const tmp = `${Math.round(data.main.temp - 273.15)}°C `;
      res.send({
         des,
         humidity,
         clouds,
         country,
         tmp,
      });
   });
});

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: '404',
      name: 'Zuhaib Nazir',
      errorMessage: 'Help article not found.',
   });
});

app.get('*', (req, res) => {
   res.render('404', {
      title: '404',
      name: 'Zuhaib Nazir',
      errorMessage: 'Page not found.',
   });
});

app.listen(port, () => {
   console.log('Server is up on port ' + port);
});
