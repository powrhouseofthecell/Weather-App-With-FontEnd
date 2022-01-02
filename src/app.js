const path = require('path');
const express = require('express');
const ejs = require('ejs');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
// Default path is in the views folder
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'ejs');
app.set('views', viewsPath);
// hbs.registerPartials(partialsPath);

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
   res.send({
      forecast: 'It is not snowing',
      location: 'Kashmir',
   });
});

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: '404',
      name: 'Andrew Mead',
      errorMessage: 'Help article not found.',
   });
});

app.get('*', (req, res) => {
   res.render('404', {
      title: '404',
      name: 'Andrew Mead',
      errorMessage: 'Page not found.',
   });
});

app.listen(3000, () => {
   console.log('Server is up on port 3000.');
});
