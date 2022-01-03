const axios = require('axios');
// import axios from 'axios';

const getWeather = (url, cb) => {
   axios
      .get(url)
      .then((response) => {
         // automatically parses json
         const tmp = Math.round(response.data.main.temp - 273.15);
         cb(
            `temp: ${tmp}, Weather: ${response.data.weather[0].description}, Humidity: ${response.data.main.humidity}, Clouds: ${response.data.clouds.all}, Country: ${response.data.sys.country}`
         );
      })
      .catch((err) => {
         if (err.response) {
            cb(`${err.response.data.cod}, ${err.response.data.message}`);
         } else {
            cb(err.message);
         }
      });
};

module.exports = getWeather;
