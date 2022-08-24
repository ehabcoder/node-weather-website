const axios = require('axios').default;

const forecast = (long, lat, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${long}&appid=75bda96607dd3728af0506d61332e86b`;
    axios.get(url)
        .then((res) => {
            callback(undefined, {
                latitude: res.data.coord.lat,
                longitude: res.data.coord.lon,
                location: res.data.sys.country,
                weather: res.data.weather
            });
        })
        .catch((err) => {
            callback("Unable to connect to location services!", undefined);
        });
}

module.exports = forecast;