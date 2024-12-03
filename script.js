// script.js
document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const apiKey = 'ac23d6fdb839ff300223b52adf15eb85'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;

    document.getElementById('cityName').innerText = `Weather in ${cityName}`;
    document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
    document.getElementById('description').innerText = `Condition: ${description}`;
    document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
}