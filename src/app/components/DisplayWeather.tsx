"use client";

import React from "react";
import SearchForm from "./SearchForm";
import ErrorMessage from "./ErrorMessage";
import CurrentWeather from "./CurrentWeather";
import WeatherDetailCard from "./WeatherDetailCard";
import ForecastCard from "./ForecastCard";
import PinnedCityCard from "./PinnedCityCard";
import { IWeatherData } from "../hooks/useWeather";

interface IDisplayWeather {
  searchCity: (event: React.FormEvent<HTMLFormElement>) => void;
  updateCity: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearCity: () => void;
  showLocation: () => void;
  cityInput: string;
  weatherData: IWeatherData;
  error: string | null;
  isSearching: boolean;
  isGeolocating: boolean;
  clickedDayIndex: number | null;
  setClickedDayIndex: (index: number | null) => void;
  clearError: () => void;
  pinnedCities: string[];
  pinCity: (city: string) => void;
  unpinCity: (city: string) => void;
  isPinned: (city: string) => boolean;
  maxPins: number;
  onSelectPinnedCity: (city: string) => void;
}

function DisplayWeather({
  searchCity,
  updateCity,
  clearCity,
  showLocation,
  cityInput,
  weatherData,
  error,
  isSearching,
  isGeolocating,
  clickedDayIndex,
  setClickedDayIndex,
  clearError,
  pinnedCities,
  pinCity,
  unpinCity,
  isPinned,
  maxPins,
  onSelectPinnedCity,
}: IDisplayWeather) {
  const selectedDay =
    clickedDayIndex !== null ? weatherData.daily[clickedDayIndex] : null;

  const currentData = selectedDay
    ? {
        temperature: Math.round((selectedDay.tempMax + selectedDay.tempMin) / 2),
        tempMin: selectedDay.tempMin,
        tempMax: selectedDay.tempMax,
        icon: selectedDay.icon,
        description: selectedDay.description,
        humidity: selectedDay.humidity,
        wind: selectedDay.wind,
        date: selectedDay.date,
      }
    : {
        temperature: weatherData.temperature,
        tempMin: weatherData.tempMin,
        tempMax: weatherData.tempMax,
        icon: weatherData.icon,
        description: weatherData.description,
        humidity: weatherData.humidity,
        wind: weatherData.wind,
        date: weatherData.date,
      };

  const MOCK_CITY = "__mock__";
  const showMock = pinnedCities.length === 0;
  const displayedPins = showMock ? [MOCK_CITY] : pinnedCities;

  return (
    <div className="flex-1 flex flex-col w-full md:overflow-hidden">
      <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-xl shadow-2xl border-y-0 md:border border-white/10 md:overflow-hidden min-h-screen pt-24">
      <div className="fixed top-0 z-100 left-0 right-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-3 md:p-4 border-b border-white/10">
          <SearchForm
            searchCity={searchCity}
            updateCity={updateCity}
            clearCity={clearCity}
            showLocation={showLocation}
            cityInput={cityInput}
            isSearching={isSearching}
            isGeolocating={isGeolocating}
            cityName={weatherData.city}
            isPinned={isPinned(weatherData.city)}
            pinDisabled={!isPinned(weatherData.city) && pinnedCities.length >= maxPins}
            maxPins={maxPins}
            onPinToggle={() =>
              isPinned(weatherData.city)
                ? unpinCity(weatherData.city)
                : pinCity(weatherData.city)
            }
          />
          {error && <ErrorMessage error={error} onClear={clearError} />}
        </div>
        <div className="flex-1 flex flex-col p-3 md:p-4 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 mb-4 md:mb-10">
            <CurrentWeather
              city={weatherData.city}
              date={currentData.date}
              temperature={currentData.temperature}
              icon={currentData.icon}
              description={currentData.description}
              isForecastDay={clickedDayIndex !== null}
            />

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <WeatherDetailCard
                iconType="humidity"
                label="Humidity"
                value={`${currentData.humidity}%`}
                bgColor="bg-blue-500/20"
              />
              <WeatherDetailCard
                iconType="wind"
                label="Wind"
                value={`${currentData.wind} km/h`}
                bgColor="bg-emerald-500/20"
              />
              <WeatherDetailCard
                iconType="tempMin"
                label="Min Temp"
                value={`${currentData.tempMin}°`}
                bgColor="bg-cyan-500/20"
              />
              <WeatherDetailCard
                iconType="tempMax"
                label="Max Temp"
                value={`${currentData.tempMax}°`}
                bgColor="bg-orange-500/20"
              />
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-4 md:gap-10">
          <div>
            <h2 className="text-sm md:text-base font-bold text-white mb-2 flex items-center gap-1.5">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              5-Day Forecast
            </h2>
            <div className="md:grid md:grid-cols-5 md:gap-3 lg:gap-4 flex md:flex-none overflow-x-auto gap-3 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50 -mx-4 px-4 md:mx-0 md:px-0">
              {weatherData.daily.map((forecast, idx) => {
                const isClicked = clickedDayIndex === idx;
                const isDimmed = clickedDayIndex !== null && clickedDayIndex !== idx;

                return (
                  <ForecastCard
                    key={idx}
                    date={forecast.date}
                    icon={forecast.icon}
                    description={forecast.description}
                    tempMax={forecast.tempMax}
                    tempMin={forecast.tempMin}
                    index={idx}
                    isClicked={isClicked}
                    isDimmed={isDimmed}
                    onClick={() => {
                      setClickedDayIndex(clickedDayIndex === idx ? null : idx);
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex-1 min-h-0 bg-white/3 border border-white/8 rounded-xl px-3 py-3 flex flex-col">
            <div className="flex items-center gap-1.5 mb-2">
              <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Pinned cities
                {!showMock && (
                  <span className="ml-1.5 text-xs font-normal text-slate-500 normal-case tracking-normal">
                    {pinnedCities.length}/{maxPins}
                  </span>
                )}
              </h2>
            </div>
            <div className="flex-1 min-h-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 content-start">
              {displayedPins.map((city) => (
                <PinnedCityCard
                  key={city}
                  city={city}
                  isMock={city === MOCK_CITY}
                  onSelect={onSelectPinnedCity}
                  onUnpin={unpinCity}
                  isActive={!showMock && weatherData.city.toLowerCase() === city.toLowerCase()}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayWeather;
