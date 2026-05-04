const inpt = document.querySelector('#city-input');
const search = document.querySelector('#search');
const error = document.querySelector('.error');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const city = document.querySelector('.city');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');

async function checkWeather(cityName) {
    const apiKey = "c54b2b9608454ccfd483a626cd868bbc";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    try {
        const res = await fetch(url);
        const wData = await res.json();
        if (wData.cod === 404){
            error.innerHTML = "City not found!";
            return
        }
        temp.innerHTML = `${Math.round(wData.main.temp)}°C`;
        desc.innerHTML = `${wData.weather[0].description}`;
        if (wData.sys.country === 'IL'){
            wData.sys.country = '(Occupied) PS';
        }
        city.innerHTML = `${wData.name}, ${wData.sys.country}`;
        humidity.innerHTML = `${wData.main.humidity}%`;
        wind.innerHTML = `${(wData.wind.speed * 3.6).toFixed(2)} km/h`;
        error.innerHTML = "";
    }
    catch (err) {
        error.innerHTML = "Something went wrong..."
    }
}


search.addEventListener('click', () => {
    checkWeather(inpt.value);
});

inpt.addEventListener('keydown', () => {
    checkWeather(inpt.value);
});