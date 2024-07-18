import React from "react";
import FormattedDate from "./FormattedDate";

function DisplayWeather({ searchCity, updateCity, showLocation, weatherData }) {
  const forecasts = [1, 2, 3, 4, 5];

  return (
    <div className="w-11/12 md:w-3/5 shadow-lg rounded-lg p-5 md:p-10 bg-[#000000] text-slate-100">
      <div className="flex flex-col items-center justify-between gap-10 w-full">
          <form
            className="mt-0 max-h-9 w-full flex flex-row justify-center items-center"
            onSubmit={searchCity}
          >
            <input
              type="text"
              placeholder="Search city"
              autoComplete="off"
              onChange={updateCity}
              className="rounded border-none h-8 md:h-9 w-2/3 md:w-1/3 p-1 mr-1 bg-[#292929] text-white hover:bg-[#444242]"
            />
            <input
              type="submit"
              className="border rounded-md border-black py-1.5 md:py-1 px-1 md:px-2 m-1 hover:cursor-pointer bg-[#292929] text-sm md:text-lg md:font-bold hover:bg-[#444242]"
              value="Search"
            />
             <button
            className="border rounded-md border-black py-1.5 md:py-1 px-1 md:px-2 m-1 hover:cursor-pointer bg-[#292929] text-sm md:text-lg md:font-bold hover:bg-[#444242]"
            onClick={showLocation}
          >
            Current
          </button>
          </form>
        <div className="flex flex-col md:flex-row justify-around w-full items-center">
          <div className="text-3xl flex flex-row justify-evenly items-center w-full md:w-2/3 lg:text-5xl font-semibold p-0 m-0">{weatherData.city}
          <div className="flex flex-row items-center ">
            <img src={weatherData.icon0} alt="Alt"></img>
            <div className="md:text-2xl lg:text-6xl font-light flex flex-row">
              {weatherData.temperature}
              <div className="text-xl">°C</div>
            </div>
          </div>
          </div>
          <div className="flex flex-row md:flex-col justify-evenly items-center w-full md:w-1/3">
            <div className="md:text-sm lg:text-lg">
              <FormattedDate date={weatherData.date} dayOnly={false}/>
              <div className="capitalize">{weatherData.description}</div>
            </div>
            <div className="md:text-sm lg:text-lg">
              <div className="">Humidity: {weatherData.humidity}%</div>
              <div className="">Wind: {weatherData.wind}km/h</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          {forecasts.map((forecast, index) => {
            return (
              <div key={index} className="flex flex-row w-full justify-evenly ">
                <ul className=" text-center list-none">
                  <li>
                  <FormattedDate date={weatherData[`date${forecast}`]} dayOnly={true}/>
                  </li>
                  <li>
                    <img
                      className=""
                      src={weatherData[`icon${forecast}`]}
                      alt={`Forecast no.${forecast}`}
                    ></img>
                  </li>
                  <li>
                    <div className="">{weatherData[`temp${forecast}min`]}°</div>{" "}
                    <div className=" font-bold">
                      {weatherData[`temp${forecast}max`]}°
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DisplayWeather;
