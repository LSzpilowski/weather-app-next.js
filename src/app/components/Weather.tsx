"use client"

import React from "react";
import dynamic from "next/dynamic";
import DisplayWeather from "./DisplayWeather";
import { useWeather, IWeatherData } from "../hooks/useWeather";
import { usePinnedCities } from "../hooks/usePinnedCities";
import paperplaneAnimation from "../animations/loading_paperplane.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function Weather() {
  const {
    cityInput,
    weatherData,
    error,
    isInitialLoading,
    isSearching,
    isGeolocating,
    clickedDayIndex,
    setClickedDayIndex,
    updateCity,
    searchCity,
    searchCityByName,
    showLocation,
    clearError,
  } = useWeather();

  const { pinnedCities, pinCity, unpinCity, isPinned, maxPins } = usePinnedCities();

  if (isInitialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh gap-2">
        <Lottie
          animationData={paperplaneAnimation}
          loop
          className="w-64 h-48"
        />
        <div className="text-lg text-white/70 font-light tracking-wide">Loading weather data...</div>
      </div>
    );
  }

  if (weatherData.ready) {
    return (
      <div className="flex-1 flex flex-col md:block w-full">
      <DisplayWeather
        searchCity={searchCity}
        updateCity={updateCity}
        clearCity={() => updateCity({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
        showLocation={showLocation}
        cityInput={cityInput}
        weatherData={weatherData as IWeatherData}
        error={error}
        isSearching={isSearching}
        isGeolocating={isGeolocating}
        clickedDayIndex={clickedDayIndex}
        setClickedDayIndex={setClickedDayIndex}
        clearError={clearError}
        pinnedCities={pinnedCities}
        pinCity={pinCity}
        unpinCity={unpinCity}
        isPinned={isPinned}
        maxPins={maxPins}
        onSelectPinnedCity={searchCityByName}
      />
      </div>
    );
  }

  return null;
}

export default Weather;