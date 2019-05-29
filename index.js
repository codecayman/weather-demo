const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
require('dotenv').config();

const apiKey = process.env.WEATHER_APIKEY;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  let obj = {
      weather: null,
      error: null
  };
  res.render('index', obj);
});

app.post('/', function (req, res) {

  let city = req.body.city;
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;
  console.log(url);

  request(url, function (err, response, body) {
    let obj = {};
    if(err){
        obj = {
            weather: null, 
            error: 'Error, please try again'
        }
        res.render('index', );
    } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
            obj = {
                    weather: null,
                    error: 'Oops, something went wrong. Please try again. '
            };
            res.render('index', obj);
        } else {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            obj = {
                weather: weatherText,
                error: null
        };
        res.render('index', obj);
      }
    }
  });
})

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port ' + process.env.PORT);
});
