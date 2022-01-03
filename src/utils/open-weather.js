const axios = require('axios');
// import axios from 'axios';

const getWeather = (url, cb) => {
   axios
      .get(url)
      .then((response) => {
         // automatically parses json
         cb(response.data);
      })
      .catch((err) => {
         if (err.response) {
            cb({
               errCod: err.response.data.cod,
               errMsg: err.response.data.message,
            });
         } else {
            cb(err.message);
         }
      });
};

module.exports = getWeather;
