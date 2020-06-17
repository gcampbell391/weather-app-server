require('dotenv').config();
const request = require('postman-request');

const geocode = (address, callback) => {
    const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${GEOCODE_API_KEY}&limit=1`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to location services...Please check your connection and try again.", undefined)
        } else if (body.message === 'Not Found') {
            callback("Unable to find location. Please try again.", undefined)
        }
        else if (body.features.length === 0) {
            callback("Unable to find location. Please try again.", undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            )
        }
    });
}

module.exports = geocode