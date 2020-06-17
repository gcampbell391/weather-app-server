//research path some more! 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//define paths for Express config
const publicDirectoryPath = express.static(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(publicDirectoryPath)

//the order of the app.get routes matters... * will return everything else
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gene Campbell III'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gene Campbell III'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gene Campbell III',
        message: 'Please contact the developer if you have experienced an issue with the application while using it.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Gene Campbell III',
        message: 'Help article not found.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address.' })
    }
    const address = req.query.address
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error: 'Cant find location...' })
        }
        else {
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error: 'Unable to connect with weather service...' })
                }
                res.send({
                    location,
                    forecastData
                })
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Gene Campbell III',
        message: 'Page not found.'
    })
})

//first arg in params is port, second arg is callback 
app.listen(3000, () => {
    console.log('Server is running on port 3000...')
})