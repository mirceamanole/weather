const submit = document.querySelector('form');
const weatherInfoCity = document.querySelector('.weather-info-city');
const weatherInfoDescription = document.querySelector('.weather-info-description')
const weatherInfoDate = document.querySelector('.weather-info-date');
const weatherInfoTime = document.querySelector('.weather-info-time');
const weatherInfoTemperature = document.querySelector(".weather-info-temperature");
const weatherInfoDay = document.querySelector(".weather-info-day");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");


function firstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function showDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let today = new Date();
    return today.getDate() + " " + monthNames[today.getMonth() + 1] + " " + today.getFullYear();
}

function showHour() {
    let today = new Date();
    if (today.getMinutes() < 10) {
        return today.getHours() + ":" + ("0" + today.getMinutes());
    } else return today.getHours() + ":" + today.getMinutes();
}

function showDay(x) {
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date();
    if (today.getDay() + x > 6) {
        return dayName[(today.getDay() + x) - 7];
    } else
        return dayName[today.getDay() + x];
}

submit.addEventListener('submit', function (e) {
    e.preventDefault();
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('search').value}&appid=7a7c24c4b936f4f7d0752eb60bb920dc`;
    document.getElementById('search').value = '';
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            weatherInfoCity.innerText = data.name;
            weatherInfoDescription.innerText = firstLetter(data.weather[0].description);
            weatherInfoDay.innerText = showDay(0);
            weatherInfoDate.innerText = showDate();
            weatherInfoTime.innerText = showHour();
            weatherInfoTemperature.innerText = (data.main.temp - 273.15).toFixed(0) + '°C';
            feelsLike.innerText = (data.main.feels_like - 273.15).toFixed(0) + '°C';
            humidity.innerText = data.main.humidity + '%';
            windSpeed.innerText = data.wind.speed + "km/h";
        })
    const api2 = `https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('search').value}&appid=7a7c24c4b936f4f7d0752eb60bb920dc`;
    fetch(api2)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById('day-plus-one').innerText = showDay(1);
            document.getElementById('day-plus-two').innerText = showDay(2);
            document.getElementById('day-plus-three').innerText = showDay(3);
            document.getElementById('day-plus-four').innerText = showDay(4);
            document.getElementById('day-plus-five').innerText = showDay(5);
            document.getElementById('temp-plus-one').innerText = (data.list[7].main.temp - 273.15).toFixed(0) + '°C';
            document.getElementById('temp-plus-two').innerText = (data.list[15].main.temp - 273.15).toFixed(0) + '°C';
            document.getElementById('temp-plus-three').innerText = (data.list[23].main.temp - 273.15).toFixed(0) + '°C';
            document.getElementById('temp-plus-four').innerText = (data.list[31].main.temp - 273.15).toFixed(0) + '°C';
            document.getElementById('temp-plus-five').innerText = (data.list[39].main.temp - 273.15).toFixed(0) + '°C';
        })
})

window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7a7c24c4b936f4f7d0752eb60bb920dc`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    weatherInfoCity.innerText = data.name;
                    weatherInfoDescription.innerText = firstLetter(data.weather[0].description);
                    weatherInfoDay.innerText = showDay(0);
                    weatherInfoDate.innerText = showDate();
                    weatherInfoTime.innerText = showHour();
                    weatherInfoTemperature.innerText = (data.main.temp - 273.15).toFixed(0) + '°C';
                    feelsLike.innerText = (data.main.feels_like - 273.15).toFixed(0) + '°C';
                    humidity.innerText = data.main.humidity + '%';
                    windSpeed.innerText = data.wind.speed + "km/h";

                })
            const api2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=7a7c24c4b936f4f7d0752eb60bb920dc`;
            fetch(api2)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    document.getElementById('day-plus-one').innerText = showDay(1);
                    document.getElementById('day-plus-two').innerText = showDay(2);
                    document.getElementById('day-plus-three').innerText = showDay(3);
                    document.getElementById('day-plus-four').innerText = showDay(4);
                    document.getElementById('day-plus-five').innerText = showDay(5);
                    document.getElementById('temp-plus-one').innerText = (data.list[7].main.temp - 273.15).toFixed(0) + '°C';
                    document.getElementById('temp-plus-two').innerText = (data.list[15].main.temp - 273.15).toFixed(0) + '°C';
                    document.getElementById('temp-plus-three').innerText = (data.list[23].main.temp - 273.15).toFixed(0) + '°C';
                    document.getElementById('temp-plus-four').innerText = (data.list[31].main.temp - 273.15).toFixed(0) + '°C';
                    document.getElementById('temp-plus-five').innerText = (data.list[39].main.temp - 273.15).toFixed(0) + '°C';
                })
        });

    }
});