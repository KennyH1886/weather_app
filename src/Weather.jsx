import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Weather.css';

const search_icon = '/assets/search.png';
const clear_icon = '/assets/clear.png';
const cloud_icon = '/assets/cloud.png';
const rain_icon = '/assets/rain.png';
const snow_icon = '/assets/snow.png';
const wind_icon = '/assets/wind.png';
const humidity_icon = '/assets/humidity.png';

const allIcons = {
    // Clear sky
    "01d": clear_icon,
    "01n": clear_icon,
    // Few clouds
    "02d": cloud_icon,
    "02n": cloud_icon,
    // Scattered clouds
    "03d": cloud_icon,
    "03n": cloud_icon,
    // Broken clouds
    "04d": cloud_icon,
    "04n": cloud_icon,
    // Shower rain
    "09d": rain_icon,
    "09n": rain_icon,
    // Rain
    "10d": rain_icon,
    "10n": rain_icon,
    // Thunderstorm
    "11d": rain_icon,
    "11n": rain_icon,
    // Snow
    "13d": snow_icon,
    "13n": snow_icon,
    // Mist, smoke, haze, fog
    "50d": cloud_icon,
    "50n": cloud_icon,
    // Additional conditions
    // Dust, sand, ash
    "51d": cloud_icon,
    "51n": cloud_icon,
    // Squalls
    "52d": rain_icon,
    "52n": rain_icon,
    // Tornado
    "53d": cloud_icon,
    "53n": cloud_icon,
};

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const [isCelsius, setIsCelsius] = useState(true);

    const convertToFahrenheit = (celsius) => {
        return Math.floor((celsius * 9) / 5 + 32);
    };

    const search = useCallback(async (city) => {
        if (city === '') {
            alert('Enter City Name');
            return;
        }
        try {
            const apiKey = '20d23e9b577294e5bc4f5cf5f9515d79';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            setWeatherData(false);
            console.error('Error in fetching weather data', error);
        }
    }, []);

    useEffect(() => {
        search('New York');
    }, [search]);

    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Search" />
                <img
                    src={search_icon}
                    alt="search"
                    onClick={() => search(inputRef.current.value)}
                />
            </div>
            {weatherData ? (
                <>
                    <img
                        src={weatherData.icon}
                        alt="weather icon"
                        className="weather-icon"
                    />
                    <p className="temperature">
                        {isCelsius
                            ? weatherData.temperature
                            : convertToFahrenheit(weatherData.temperature)}
                        °{isCelsius ? 'C' : 'F'}
                        <button
                            className="toggle-btn"
                            onClick={() => setIsCelsius(!isCelsius)}
                        >
                            Switch to °{isCelsius ? 'F' : 'C'}
                        </button>
                    </p>
                    <p className="location">{weatherData.location}</p>
                    <div className="weather-details">
                        <div className="col">
                            <img src={humidity_icon} alt="humidity" />
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="wind" />
                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Weather;
