import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
const search_icon = '/assets/search.png';
const clear_icon = '/assets/clear.png';
const cloud_icon = '/assets/cloud.png';
const drizzle_icon = '/assets/dizzle.png';
const rain_icon = '/assets/rain.png';
const snow_icon = '/assets/snow.png';
const wind_icon = '/assets/wind.png';
const humidity_icon = '/assets/humidity.png';


const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData ] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": drizzle_icon,
        "04d": drizzle_icon,
        "04n": rain_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": rain_icon,  // Add this for thunderstorm (day)
        "11n": rain_icon,  // Add this for thunderstorm (night)
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": cloud_icon, // Add this for mist (day)
        "50n": cloud_icon  // Add this for mist (night)
    };

    const search = async(city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            // Hardcode your API key here for testing purposes
            const apiKey = "20d23e9b577294e5bc4f5cf5f9515d79";  // Replace with your actual API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            
            const response = await fetch(url);
            const data = await response.json();
    
            if (!response.ok) {
                alert(data.message);
                return;
            }
    
            console.log(data);
            console.log("Icon code:", data.weather[0].icon);  // Log icon code to check
    
            const icon = allIcons[data.weather[0].icon] || clear_icon;  // Fallback to clear_icon if no match
            
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed, 
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data", error);
        }
    }

    useEffect(() => { search("New York") }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? <>
                <img src={weatherData.icon} alt="weather icon" className='weather-icon'/>
                <p className='temperature'>{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.location}</p>
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
            </> : <></>}
        </div>
    )
}

export default Weather;
