const api = {
    key: "dbe178a3d1ca1d90deb6531ccdf57b7b",
    base: "https://api.openweathermap.org/data/2.5/"
}
// check if browser support geolocation:
// if ('geolocation' in navigator) {
//     navigator.geolocation.getCurrentPosition(setPosition, showError);
// } else {
//     alert("your Browser doesn't support Geolocation");
// }
// Set users position:
// function setPosition(position){
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;
//     getWeather(latitude, longitude);
// }
// get weather by location:
// function getWeather(latitude, longitude) {
//     fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&APPID=${api.key}`)
//         .then(weather => {
//             return weather.json();
//         }).then(displayResults);
// }



const searchBox = document.querySelector('.search-box');
searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
    }
}

const touchZone = document.getElementById("search");
touchZone.addEventListener("touchstart", forClick);

function forClick() {
    getResults(searchBox.value);
}
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    // let icon = document.querySelector('#icon');
    // icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#176;c</span>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let highLow = document.querySelector('.high-low');
    highLow.innerText = `Min temp.- ${weather.main.temp_min}°c / Max temp.- ${weather.main.temp_max}°c`
}
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}