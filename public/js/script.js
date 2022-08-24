//// Tried but failed
// const fetchWeather = (address) => {
//     fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
//         response.json().then((data) => {
//             if(data.error) {
//                 return data.error;
//             } else {
//                 return data;
//             }
//         })
//     });
// }

// const address = document.querySelector('.form');
// const searchElement = document.querySelector('#address');

// address.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const location = searchElement.value;
//     console.log(fetchWeather(location));
// });


const address = document.querySelector('.form');
const searchElement = document.querySelector('#address');
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')

message1.textContent = '';
message2.textContent = '';

address.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value;
    message1.textContent = "Loading..."
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message1.textContent = data.error;
            } else {
                console.log(data)
               message1.textContent = data.location;
               message2.textContent = `
                The weather is ${data.weather[0].description}
               `
            }
        })
    });
});