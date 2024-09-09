let isCelsius = true;
let isDaytime;
document.getElementById('temp-switch').addEventListener('change', function () {
    // Toggle between Celsius and Fahrenheit
    isCelsius = !isCelsius;

    // Update switch label
    const switchLabels = document.querySelectorAll('.slider span');
    switchLabels.forEach(label => {
        label.style.display = label.classList.contains(isCelsius ? 'label-celsius' : 'label-fahrenheit') ? 'block' : 'none';
    });

    // Convert current temperature and update the display
    convertTemperatures();
});

function convertTemperatures() {
    // Convert current weather temperature
    const currentTempElement = document.querySelector('#current-weather h1');
    const currentTemp = parseFloat(currentTempElement.textContent);

    if (isCelsius) {
        // Convert from Fahrenheit to Celsius
        const celsiusTemp = ((currentTemp - 32) * 5) / 9;
        currentTempElement.innerHTML = `${celsiusTemp.toFixed(1)} <sup>°C</sup>`;
    } else {
        // Convert from Celsius to Fahrenheit
        const fahrenheitTemp = (currentTemp * 9) / 5 + 32;
        currentTempElement.innerHTML = `${fahrenheitTemp.toFixed(1)} <sup>°F</sup>`;
    }

    // Convert forecast temperatures
    const forecastTemps = document.querySelectorAll('#forecast .forecast-day p:nth-child(3)');
    forecastTemps.forEach(tempElement => {
        const temp = parseFloat(tempElement.textContent);

        if (isCelsius) {
            const celsiusTemp = ((temp - 32) * 5) / 9;
            tempElement.textContent = `${celsiusTemp.toFixed(1)}°C`;
        } else {
            const fahrenheitTemp = (temp * 9) / 5 + 32;
            tempElement.textContent = `${fahrenheitTemp.toFixed(1)}°F`;
        }
    });
}

// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    const switchLabels = document.querySelectorAll('.slider span');
    switchLabels.forEach(label => {
        label.style.display = label.classList.contains(isCelsius ? 'label-fahrenheit' : 'label-celsius') ? 'none' : 'block';
        label.style.color = 'black';
    });
});







document.addEventListener('DOMContentLoaded', function() {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Fetch the weather data for the current location
            fetchWeatherData(null, lat, lon);
            fetchForecastData(null, lat, lon);

            // Fetch and display the location name
            fetchLocationName(lat, lon);

            // Set background based on time of day
            setBackgroundBasedOnTime();
        }, () => {
            alert('Could not get your location. Please enter a city manually.');
            // Set background based on time of day
            setBackgroundBasedOnTime();
        });
    } else {
        alert('Geolocation is not supported by your browser. Please enter a city manually.');
        // Set background based on time of day
        setBackgroundBasedOnTime();
    }
});




function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    const sevenDayForecast = forecastList.slice(0, 5);

    forecastDiv.innerHTML = '';

    sevenDayForecast.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        forecastDiv.innerHTML += `
            <div class="forecast-day">
                <p><strong>${date.toLocaleDateString()}</strong></p>
                <hr>
                <p>${forecast.main.temp}°C</p>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].main} icon">
                <p>${forecast.weather[0].description}</p>
            </div>
        `;
    });
}

function setBackgroundBasedOnTime(timezoneOffset) {
    const now = new Date();
    const localTime = new Date(now.getTime() + timezoneOffset * 1000);
    const hour = localTime.getUTCHours();
    if (hour >= 6 && hour < 18){
        isDaytime="True"
    }
    else{
        isDaytime="False"
    }
    const body = document.body;

    const existingVideo = document.getElementById('background-video');
    if (existingVideo) {
        existingVideo.remove();
    }

    let videoSrc;
    let textColor;

    if (hour >= 6 && hour < 18) {
         
        // Daytime background video
        videoSrc = 'https://cdn.pixabay.com/video/2019/06/26/24746-344986280_large.mp4';
        document.querySelector('header').style.backgroundColor = '#33599a';
        document.getElementById('current-weather1').style.backgroundColor = '#33599a'; 
        document.getElementById('search-btn').style.backgroundColor = '#1f478b';
        document.getElementById('forecast').style.backgroundColor = '#6887bc';  
        document.getElementById('extra').style.backgroundColor = '#6887bc'; 
        document.getElementById('forecast').style.color = 'black';
        textColor = 'black';

        // Apply hover effects
        const colorElements = document.querySelectorAll('.color');
        colorElements.forEach(function(el) {
            el.style.color = textColor;
            el.addEventListener('mouseenter', function() {
                el.style.color = 'white';  // Text color on hover
            });
            el.addEventListener('mouseleave', function() {
                el.style.color = 'black';  // Revert color when hover ends
            });
        });

        let elements = document.querySelectorAll('.ex-div');
        elements.forEach(function(element) {
            element.style.backgroundColor = '#5b8ce0';  // Set background color
            element.style.color = 'black';

            // Add hover effect for 'ex-div'
            element.addEventListener('mouseenter', function() {
                element.style.backgroundColor = '#4f7cbf';  // On hover background
                element.style.color = 'white';             // On hover text color
            });

            element.addEventListener('mouseleave', function() {
                element.style.backgroundColor = '#5b8ce0';  // Revert background on leave
                element.style.color = 'black';              // Revert text color on leave
            });
        });


         



    } else {
        // Nighttime background video
        videoSrc = 'https://videos.pexels.com/video-files/13001843/13001843-hd_1920_1080_30fps.mp4';
        textColor = 'white';

        document.querySelector('header').style.backgroundColor = '#086790';
        document.getElementById('current-weather1').style.backgroundColor = '#0d75cb82'; 
        document.getElementById('search-btn').style.backgroundColor = '#1d62e2ea';
        document.getElementById('forecast').style.backgroundColor = 'rgba(143, 221, 255, 0.921)';  
        document.getElementById('extra').style.backgroundColor = 'rgba(92, 203, 254, 0.841)'; 
        document.getElementById('forecast').style.color = 'rgb(9, 101, 126)';

        // Apply hover effects
        const colorElements = document.querySelectorAll('.color');
        colorElements.forEach(function(el) {
            el.style.color = textColor;
            el.addEventListener('mouseenter', function() {
                el.style.color = 'black';  // Text color on hover
            });
            el.addEventListener('mouseleave', function() {
                el.style.color = 'white';  // Revert color when hover ends
            });
        });

        let elements = document.querySelectorAll('.ex-div');
        elements.forEach(function(element) {
            element.style.backgroundColor = 'rgba(83, 135, 223, 0.508)';  // Set background color
            element.style.color = 'white';

            // Add hover effect for 'ex-div'
            element.addEventListener('mouseenter', function() {
                element.style.backgroundColor = 'rgba(30, 69, 135, 0.508)';  // On hover background
                element.style.color = 'black';             // On hover text color
            });

            element.addEventListener('mouseleave', function() {
                element.style.backgroundColor = 'rgba(83, 135, 223, 0.508)';  // Revert background on leave
                element.style.color = 'white';              // Revert text color on leave
            });
        });
    }

    // Video background logic
    const videoElement = document.createElement('video');
    videoElement.id = 'background-video';
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.src = videoSrc;
    videoElement.style.position = 'fixed';
    videoElement.style.top = '0';
    videoElement.style.left = '0';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'cover';
    videoElement.style.zIndex = '-1';

    body.appendChild(videoElement);

}



function applyHoverEffect(element, isDaytime) {
    console.log(isDaytime)
    // Set initial styles
    element.style.backgroundColor = isDaytime ? '#5b8ce0' : 'rgba(83, 135, 223, 0.508)';
    element.style.color = isDaytime=="True" ? 'black' : 'white';
    console.log(element.style.color)

    // Add hover effect for day or night
    element.addEventListener('mouseenter', function() {
        element.style.backgroundColor = isDaytime=="True"  ? '#4f7cbf' : 'rgba(30, 69, 135, 0.508)';  // On hover background
        element.style.color = isDaytime=="True"  ? 'white' : 'black';                                  // On hover text color
    });

    element.addEventListener('mouseleave', function() {
        element.style.backgroundColor = isDaytime=="True"  ? '#5b8ce0' : 'rgba(83, 135, 223, 0.508)';  // Revert background
        element.style.color = isDaytime=="True"  ? 'black' : 'white';                                  // Revert text color
    });
}






document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
        fetchForecastData(city);
    }
});


async function fetchWeatherData(city, lat = null, lon = null) {
    const apiKey = 'a89fee4e8304fdb8230088bc61b6fe4b'; // Your API key
    let apiUrl;

    if (city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    } else if (lat && lon) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    } else {
        return; // If neither city nor coordinates are provided, exit the function
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayCurrentWeather(data);

        // Fetch Air Quality data after getting lat/lon from weather data
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        
        // Set background based on the searched city's local time
        setBackgroundBasedOnTime(data.timezone);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Could not retrieve weather data. Please check the city name and try again.');
    }
}


async function fetchForecastData(city, lat = null, lon = null) {
    const apiKey = 'a89fee4e8304fdb8230088bc61b6fe4b'; // Your API key
    let apiUrl;

    if (city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    } else if (lat && lon) {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    } else {
        return; // If neither city nor coordinates are provided, exit the function
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        alert('Could not retrieve forecast data. Please check the city name and try again.');
    }
}

async function fetchLocationName(lat, lon) {
    const apiKey = 'a89fee4e8304fdb8230088bc61b6fe4b'; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        const locationName = data.name;
        document.getElementById('loc').textContent = locationName;
    } catch (error) {
        console.error('Error fetching location name:', error);
        document.getElementById('loc').textContent = 'Location not found';
    }
}




function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    
    // Get the time zone offset in seconds and convert it to milliseconds
    const timezoneOffset = data.timezone * 1000;
    
    // Get the local time in the city by applying the timezone offset
    const localTime = new Date(new Date().getTime() + timezoneOffset);
    
    // Format the local time using the time zone name (if available)
    const options = {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
        timeZoneOffset: data.timezone,
    };
    
    const formatter = new Intl.DateTimeFormat([], options);
    const formattedTime = formatter.format(localTime);
    
    // Display sunrise and sunset times in local time
    const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Update the HTML to display current weather and local day/time
    currentWeatherDiv.innerHTML = `
        <h2 class="color" >Current Weather in ${data.name}</h2>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" class="weather-icon" alt="${data.weather[0].main} icon">
        <h1 class="color">${data.main.temp} <sup>°C</sup></h1>
        <p class="color">${data.weather[0].description}</p>
        <p class="color">${formattedTime}</p> <!-- Displaying the day and local time -->
    `;

    // Update extra details section with additional information
    const extraDiv = document.getElementById('extra');
    const uvIndex = data.uv; // Assuming UV index is part of the data
    const uvRisk = getUvRiskLevel(uvIndex);

    extraDiv.innerHTML = `

        <div class="ex-div">
            <p class="pera"><b>Humidity</b></p><hr class="ex-hr">
            <p class="pera">${data.main.humidity}%</p>
            <p class="pera">${getHumidityLevel(data.main.humidity)}</p>
        </div>
        <div class="ex-div">
            <p class="pera"><b>Condition</b></p><hr class="ex-hr">
            <p class="pera">${data.weather[0].description}</p>
            <p></p>
        </div>
        <div class="ex-div">
            <p class="pera"><b>Wind</b></p><hr class="ex-hr">
            <p class="pera siz">${data.wind.speed} m/s</p>
            <p></p>
        </div>
        <div class="ex-div">
            <p class="pera"><b>Visibility</b></p><hr class="ex-hr">
            <p class="pera siz">${data.visibility / 1000} km</p>
            <p class="pera">${getVisibilityStatus(data.visibility)}</p>
        </div>
        <div class="ex-div">
            <p class="pera"><b>UV Index</b></p><hr class="ex-hr">
            <p class="pera"> ${uvRisk}</p>
            <p></p>
        </div>
    `;
}


async function fetchAirQualityData(lat, lon) {
    const apiKey = 'a89fee4e8304fdb8230088bc61b6fe4b'; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Air Quality data not found');
        }
        const data = await response.json();
        displayAirQuality(data.list[0].main.aqi);
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        alert('Could not retrieve air quality data.');
    }
}

function displayAirQuality(aqi) {
    const airQualityDiv = document.createElement('div');
    airQualityDiv.classList.add('ex-div');

    let aqiDescription = '';
    switch (aqi) {
        case 1:
            aqiDescription = 'Good';
            break;
        case 2:
            aqiDescription = 'Fair';
            break;
        case 3:
            aqiDescription = 'Moderate';
            break;
        case 4:
            aqiDescription = 'Poor';
            break;
        case 5:
            aqiDescription = 'Very Poor';
            break;
        default:
            aqiDescription = 'Unknown';
    }

    airQualityDiv.innerHTML = `
        <p class="pera"><b>Air Quality Index</b></p><hr class="ex-hr">
        <p class="pera">${aqiDescription}</p>
        <p class="pera">Level: ${aqi}</p>
    `;

    // Append to the extra details section
    const extraDiv = document.getElementById('extra');
    extraDiv.appendChild(airQualityDiv);

    // // Determine if it's daytime
    // const now = new Date();
    // const hour = now.getUTCHours();  // Adjust based on timezone if needed
    // const isDaytime = hour >= 6 && hour < 18;
    // console.log(isDaytime)

    applyHoverEffect(airQualityDiv, isDaytime);
}








function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    
    const sevenDayForecast = forecastList.slice(0, 7);

    forecastDiv.innerHTML = '';

    sevenDayForecast.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        
        forecastDiv.innerHTML += `
            <div class="forecast-day">
                <p><strong>${date.toLocaleDateString()}</strong></p>
                <hr>
                <p>${forecast.main.temp}°C</p>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].main} icon">
                <p>${forecast.weather[0].description}</p>
            </div>
        `;
    });
}





// Utility function to get UV risk level based on UV Index
function getUvRiskLevel(uvIndex) {
    if (uvIndex <= 2) {
        return 'Low';
    } else if (uvIndex <= 5) {
        return 'Moderate';
    } else if (uvIndex <= 7) {
        return 'High';
    } else if (uvIndex <= 10) {
        return 'Very High';
    } else {
        return 'Extreme';
    }
}

// Utility functions to describe other factors like humidity, visibility, etc.
function getHumidityLevel(humidity) {
    if (humidity < 30) {
        return 'Low';
    } else if (humidity < 60) {
        return 'Moderate';
    } else {
        return 'High';
    }
}

function getVisibilityStatus(visibility) {
    if (visibility > 10000) {
        return 'Clear';
    } else if (visibility > 5000) {
        return 'Light Mist';
    } else if (visibility > 1000) {
        return 'Mist';
    } else {
        return 'Fog';
    }
}

function getSunStatus(sunrise, sunset) {
    const now = new Date();
    if (now.getTime() > sunrise && now.getTime() < sunset) {
        return 'Sun is Rising';
    } else {
        return 'Sun is Setting';
    }
}



