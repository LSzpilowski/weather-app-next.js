import React, {useState} from "react";
import axios from "axios";
import './Weather.css'
import FormattedDate from "./FormattedDate";

export default function Weather() {

let [city, setCity] = useState("");

function updateCity(event) {
  setCity(event.target.value);
}

function searchCity (event) {
event.preventDefault();

let apiKey = `40fe6b5at4b35a738783f3e891e2281o`;
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayData);

}


const [weatherData, setWeatherData] = useState({ ready: false});

  function displayData(response) {

setWeatherData({
  ready: true,
  temperature: Math.round(response.data.daily[0].temperature.day),
  icon0: response.data.daily[0].condition.icon_url,
  description: response.data.daily[0].condition.description,
  humidity: response.data.daily[0].temperature.humidity,
  wind: Math.round(response.data.daily[0].wind.speed),
  date: new Date(response.data.daily[0].time * 1000),


  temp1min: Math.round(response.data.daily[1].temperature.minimum),
  temp2min: Math.round(response.data.daily[2].temperature.minimum),
  temp3min: Math.round(response.data.daily[3].temperature.minimum),
  temp4min: Math.round(response.data.daily[4].temperature.minimum),
  temp5min: Math.round(response.data.daily[5].temperature.minimum),

  temp1max: Math.round(response.data.daily[1].temperature.maximum),
  temp2max: Math.round(response.data.daily[2].temperature.maximum),
  temp3max: Math.round(response.data.daily[3].temperature.maximum),
  temp4max: Math.round(response.data.daily[4].temperature.maximum),
  temp5max: Math.round(response.data.daily[5].temperature.maximum),

  icon1: response.data.daily[1].condition.icon_url,
  icon2: response.data.daily[2].condition.icon_url,
  icon3: response.data.daily[3].condition.icon_url,
  icon4: response.data.daily[4].condition.icon_url,
  icon5: response.data.daily[5].condition.icon_url,
});


}

if (weatherData.ready) {
  return (
      <div className="weather-container">
        <div>
    <div className="deliverCity">
      <form className="customForm" onSubmit={searchCity}>
        <input type="text" placeholder="Search city" autoComplete='off' onChange={updateCity}/>
        <input type="submit" className="btn btn-primary" value="Search" />
      </form>
      <button className="btn btn-success customButton">Current</button>
    </div>
    <div className="weather-summary">
      <div className="row weather-summary-header">
      <div className="col-sm-6">
        <div className="cityName">
          {city}
        </div>
        </div>
        <div className="col-sm-6">
        <div className="calendarAndDescription">
          <div className="currentDate">
            <FormattedDate date={weatherData.date} />
            </div>
          <div className="weatherDescription">{weatherData.description}</div>
        </div>
        </div>
          </div>
          
          <div className="row weather-summary-footer">
          <div className="col-sm-6 left-section">
            <span className="weatherIcon">
              <img src={weatherData.icon0} alt=""></img>
            </span>
            <span className="mainTemp">{weatherData.temperature}</span>
            <span className="tempSign">°C</span>
          </div>
          <div className="col-sm-6 right-section">
          <div className="weather-detail__text">Humidity: {weatherData.humidity}%</div>
          <div className="weather-detail__text">Wind: {weatherData.wind}km/h</div>
          </div>
          </div>
      </div>
      
    <div className="row forecast">
      <div className="col-sm-2">
        <ul className="customPadding">
          <li>Fri</li>
          <li><img className="forecastIcon" src={weatherData.icon1} alt=""></img></li>
          <li>
          <span className="minTemp">{weatherData.temp1min}°</span>{" "}
          <span className="maxTemp">{weatherData.temp1max}°</span>
          </li>
        </ul>
      </div>
    <div className="col-sm-2">
        <ul className="customPadding">
          <li>Fri</li>
          <li><img className="forecastIcon" src={weatherData.icon2} alt=""></img></li>
          <li>
        <span className="minTemp">{weatherData.temp2min}°</span>{" "}
          <span className="maxTemp">{weatherData.temp2max}°</span>
          </li>
        </ul>
      </div>
      <div className="col-sm-2">
        <ul className="customPadding">
          <li>Fri</li>
          <li><img className="forecastIcon" src={weatherData.icon3} alt=""></img></li>
          <li>
          <span className="minTemp">{weatherData.temp3min}°</span>{" "}
          <span className="maxTemp">{weatherData.temp3max}°</span>
          </li>
        </ul>
      </div>
      <div className="col-sm-2">
        <ul className="customPadding">
          <li>Fri</li>
          <li><img className="forecastIcon" src={weatherData.icon4} alt=""></img></li>
          <li>
          <span className="minTemp">{weatherData.temp4min}°</span>{" "}
          <span className="maxTemp">{weatherData.temp4max}°</span>
          </li>
        </ul>
      </div>
      <div className="col-sm-2">
        <ul className="customPadding">
          <li>Fri</li>
          <li><img className="forecastIcon" src={weatherData.icon5} alt=""></img></li>
          <li>
          <span className="minTemp">{weatherData.temp5min}°</span>{" "}
          <span className="maxTemp">{weatherData.temp5max}°</span>
          </li>
        </ul>
      </div>
    </div>
    </div>
    </div>
  );

 } else {
  let city = "Wrocław";
  let apiKey = `40fe6b5at4b35a738783f3e891e2281o`;
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayData);

return (
  <div className="loading">
    Loading...
  </div>
)
 }

}