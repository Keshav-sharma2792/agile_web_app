document.addEventListener('DOMContentLoaded', function () {
  // Add event listener to the button
  document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

  // Add event listener for "Enter" key press
  document.getElementById('cityInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      getWeather();
    }
  });

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

    // Update weather details
    document.getElementById('cityName').innerText = `Weather in ${cityName}`;
    document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
    document.getElementById('description').innerText = `Condition: ${description}`;
    document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;

    // Change the background image based on weather conditions
    const weatherCondition = data.weather[0].main.toLowerCase(); // Get main weather condition

    // Map weather conditions to background images
    let backgroundImage;
    switch (weatherCondition) {
      case 'clear':
        backgroundImage = "url('images/clear_sky.jpg')";
        break;
      case 'clouds':
        backgroundImage = "url('images/cloudy.jpg')";
        break;
      case 'rain':
        backgroundImage = "url('images/rainy.jpg')";
        break;
      case 'snow':
        backgroundImage = "url('images/snowy.jpg')";
        break;
      case 'thunderstorm':
        backgroundImage = "url('images/thunderstorm.jpg')";
        break;
      default:
        backgroundImage = "url('images/default_weather.jpg')"; // Default background
    }

    // Apply the background image
    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }
});
