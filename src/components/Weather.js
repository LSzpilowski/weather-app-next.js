import React, { useState } from "react";
import axios from "axios";
import DisplayWeather from "./DisplayWeather";

export default function Weather() {
  let [city, setCity] = useState("");

  function updateCity(event) {
    setCity(event.target.value);
  }

  function searchCity(event) {
    event.preventDefault();

    let apiKey = `40fe6b5at4b35a738783f3e891e2281o`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data1) => {
        console.log(data1);
      })
      .catch((error) => console.log(error));

    axios.get(apiUrl).then(displayData);
  }

  const [weatherData, setWeatherData] = useState({ ready: false });

  function displayData(response) {
    const daily = response.data.daily;
    let weatherData = {
      ready: true,
      city: response.data.city,
      temperature: Math.round(daily[0].temperature.day),
      icon0: daily[0].condition.icon_url,
      description: daily[0].condition.description,
      humidity: daily[0].temperature.humidity,
      wind: Math.round(daily[0].wind.speed),
      date: new Date(daily[0].time * 1000),
    };
    daily.slice(1, 6).forEach((day, index) => {
      weatherData[`date${index + 1}`] = new Date(day.time * 1000);
      weatherData[`temp${index + 1}min`] = Math.round(day.temperature.minimum);
      weatherData[`temp${index + 1}max`] = Math.round(day.temperature.maximum);
      weatherData[`icon${index + 1}`] = day.condition.icon_url;
    });

    setWeatherData(weatherData);
  }

  function currentLocation(response) {
    console.log(response.date1);
    let cityName = response[0].name;
    let apiKey = `40fe6b5at4b35a738783f3e891e2281o`;
    console.log(cityName);
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data1) => {
        console.log(data1);
      })
      .catch((error) => console.log(error));

    axios.get(apiUrl).then(displayData);
  }

  function showLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    let apiKey = `a2fda9cdff27d3e5c19188e4f4fe1069`;
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then(currentLocation)
      .catch((error) => console.log(error));
  }

  if (weatherData.ready) {
    return (
      <DisplayWeather
        searchCity={searchCity}
        updateCity={updateCity}
        showLocation={showLocation}
        weatherData={weatherData}
      />
    );
  } else {
    let city = "Wrocław";
    let apiKey = `40fe6b5at4b35a738783f3e891e2281o`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayData);

    return <div className="loading text-center text-5xl my-40">Loading...</div>;
  }
}
