const axios = require('axios').default;
const geocode = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&appid=75bda96607dd3728af0506d61332e86b`;
    axios.get(url)
        .then((res) => {
            callback(undefined, {
                latitude: res.data.coord.lat,
                longitude: res.data.coord.lon,
                location: res.data.name
            });
        })
        .catch((err) => {
            callback("Unable to connect to location services!", undefined);
        });
}

module.exports = geocode;