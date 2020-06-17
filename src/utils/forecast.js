require('dotenv').config();
const request = require('postman-request');

const forecast = (long, lat, callback) => {
    const API_KEY = process.env.WEATHER_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${long}&units=f`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service at the moment..', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        }
        else {
            callback(undefined, {
                description: `${body.current.weather_descriptions[0]}. The current temp is ${body.current.temperature} degrees out, but it feels like ${body.current.feelslike} degrees. There is a ${body.current.precip}% chance of rain.`,
                forecast_icon: body.current.weather_icons[0]
            })
        }
    });
}


module.exports = forecast