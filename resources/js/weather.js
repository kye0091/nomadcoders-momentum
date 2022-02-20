const city = document.querySelector('#weather span:first-child');
const weather = document.querySelector('#weather span:last-child');

const API_KEY = '9182c63cc1b9cc0942c3594e653733ba';

function onGeoAllow(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

    fetch(url).then((reponse) => reponse.json()).then((data) => {
        city.innerText = data.name;
        weather.innerText = `, ${data.weather[0].main} (${data.main.temp}˚)`;
    });
}

function onGeoError() {
    weather.innerText = `Can't find you. No weather for you :(`;
}

navigator.geolocation.getCurrentPosition(onGeoAllow, onGeoError);
