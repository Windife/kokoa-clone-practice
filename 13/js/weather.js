const API_KEY = "0bc5906cee78c317978013e68978b492";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(date => {
        const weather = document.querySelector(".weather-weather");
        const city = document.querySelector(".weather-city");
        const temp = document.querySelector(".weather-temp");        
        weather.innerText = date.weather[0].description;
        city.innerText = date.name;
        temp.innerText = `${date.main.temp}°C`;
    })
}

function onGeoError() {
    alert("위치 정보를 받을 수 없습니다.")
    alert("위치 정보 접근 권한을 허용해 주세요. 권한이 없어 제한된 내용만 표시 됩니다.")
    const weather = document.querySelector(".weather")
    weather.classList.add("hidden");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
