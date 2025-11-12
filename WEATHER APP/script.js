// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {

    const API_ID = '122ada729d9211c0d40b3905018e5c20'; // Your API key

    // Get all elements we need to interact with
    const card = document.getElementById('weather-card');
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const loader = document.getElementById('loader');
    const weatherInfo = document.getElementById('weather-info');
    
    const weatherIcon = document.getElementById('weather-icon');
    const cityNameEl = document.getElementById('city-name');
    const temperatureEl = document.getElementById('temperature');
    const descriptionEl = document.getElementById('description');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('wind-speed');

    // --- Theme Toggle Functionality Removed ---

    // Main function to fetch and display weather
    async function getWeather(city) {
        loader.style.display = 'block';
        weatherInfo.style.display = 'none';
        card.classList.remove('error-shake'); 

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_ID}`);
            
            const result = await response.json();

            if (result.cod === "404") {
                throw new Error('City Not Found');
            }
            if (!response.ok) {
                throw new Error(result.message || 'An error occurred');
            }
            
            weatherIcon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
            weatherIcon.style.display = 'block'; 
            weatherIcon.alt = result.weather[0].description;

            cityNameEl.textContent = result.name;
            temperatureEl.textContent = Math.round(result.main.temp) + '°C';
            descriptionEl.textContent = result.weather[0].description;
            humidityEl.textContent = result.main.humidity + '%';
            windSpeedEl.textContent = result.wind.speed + ' km/h';

        } catch (error) {
            console.error(error); 
            
            card.classList.add('error-shake'); 
            weatherIcon.style.display = 'none'; 
            
            cityNameEl.textContent = error.message; 
            
            temperatureEl.textContent = '--';
            descriptionEl.textContent = 'Please try again';
            humidityEl.textContent = '--';
            windSpeedEl.textContent = '--';
        } finally {
            loader.style.display = 'none';
            weatherInfo.style.display = 'block';
        }
    }

    // Function to set up search listeners
    function setupSearch() {
        searchBtn.addEventListener('click', () => {
            const city = cityInput.value;
            if (city) {
                getWeather(city);
            }
        });

        cityInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const city = cityInput.value;
                if (city) {
                    getWeather(city);
                }
            }
        });
    }

    // --- Initialize the App ---
    
    // Set up the search listeners
    setupSearch(); 
    
    // Fetch weather for a default city on page load
    getWeather('Coimbatore'); 
});