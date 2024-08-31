import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'e67358d183a127bb1c2efe621d05ab3a'; // Вставьте ваш API ключ

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError('Город не найден');
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      getWeather();
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите название города"
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Получить погоду
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="weather-icon"
          />
          <p className="weather-description">{weatherData.weather[0].description}</p>
          <p>Температура: {weatherData.main.temp}°C</p>
          <p>Влажность: {weatherData.main.humidity}%</p>
          <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
