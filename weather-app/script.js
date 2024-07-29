document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherInfo = document.getElementById('weather-info');

    const fetchWeather = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    };

    const displayWeather = (data) => {
        if (data.cod === 200) {
            cityName.textContent = data.name;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            conditions.textContent = `Conditions: ${data.weather[0].description}`;
            weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            weatherInfo.style.display = 'block';
        } else {
            alert('City not found');
        }
    };

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city !== '') {
            fetchWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
});
