const path = require('path');
const express = require('express');
var hbs = require('hbs');
const geoCode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const partialPath = path.join(__dirname, '..', 'templates', 'partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'Ehab Reda'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me.',
        name: "Ehab Reda"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This message is for rendering.",
        title: 'Help',
        name: "Ehab Reda"
    })
})

app.get('/Weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, result) => {
            if(error) {
                return res.send({error})
            }
            res.json({
                long: result.longitude,
                lat: result.latitude,
                location: result.location,
                weather: result.weather
            })
        })
    })
  
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('errors/404', {
        title: '404 Not Found',
        name: "Ehab Reda",
        errorMessage: "Help Page Not Found!",
    })
})

app.get('*', (req, res) => {
    res.render('errors/404', {
        title: '404 Not Found',
        errorMessage: "Page Not Found",
        name: "Ehab Reda"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})