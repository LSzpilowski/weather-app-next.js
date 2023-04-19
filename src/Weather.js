import React, {useState} from "react";
import axios from "axios";

export default function Weather(props) {

let [city, setCity] = useState("");

  function displayData(response) {
    setCity(response.data.name)
  }


let apiKey = `6c67dd4f6367691a6d362d7c08b9b5e5`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}`;
axios.get(apiUrl).then(displayData);


  return (
    <div>
      <p>Hello from Weather</p>
      We're currently in {city}
    </div>
  )
}