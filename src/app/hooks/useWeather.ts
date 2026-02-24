import { useState, useEffect, useRef } from "react";

export interface IDayForecast {
  date: Date;
  tempMin: number;
  tempMax: number;
  icon: string;
  description: string;
  humidity: number;
  wind: number;
}

export interface IWeatherData {
  ready: boolean;
  city: string;
  temperature: number;
  icon: string;
  description: string;
  humidity: number;
  wind: number;
  date: Date;
  tempMin: number;
  tempMax: number;
  daily: IDayForecast[];
}

interface IApiDaily {
  time: number;
  temperature: {
    day: number;
    minimum: number;
    maximum: number;
    humidity: number;
  };
  condition: {
    icon_url: string;
    description: string;
  };
  wind: {
    speed: number;
  };
}

interface IApiResponse {
  city: string;
  daily: IApiDaily[];
}

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const DEFAULT_CITY = process.env.NEXT_PUBLIC_DEFAULT_CITY || "Wrocław";

// Simple in-memory cache keyed by city name (10 min TTL)
const CACHE_TTL = 10 * 60 * 1000;
const weatherCache = new Map<string, { data: IWeatherData; ts: number }>();

export function parseWeatherResponse(json: IApiResponse): IWeatherData {
  const { daily, city } = json;

  if (!daily || daily.length < 6) {
    throw new Error("Invalid weather data received");
  }

  const today = daily[0];
  const forecastDays = daily.slice(1, 6);

  return {
    ready: true,
    city,
    temperature: Math.round(today.temperature.day),
    icon: today.condition.icon_url,
    description: today.condition.description,
    humidity: today.temperature.humidity,
    wind: Math.round(today.wind.speed),
    date: new Date(today.time * 1000),
    tempMin: Math.round(today.temperature.minimum),
    tempMax: Math.round(today.temperature.maximum),
    daily: forecastDays.map((d) => ({
      date: new Date(d.time * 1000),
      tempMin: Math.round(d.temperature.minimum),
      tempMax: Math.round(d.temperature.maximum),
      icon: d.condition.icon_url,
      description: d.condition.description,
      humidity: d.temperature.humidity,
      wind: Math.round(d.wind.speed),
    })),
  };
}

async function fetchWeather(cityQuery: string): Promise<IWeatherData> {
  const cacheKey = cityQuery.toLowerCase().trim();
  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  const url = `https://api.shecodes.io/weather/v1/forecast?query=${encodeURIComponent(cityQuery)}&key=${WEATHER_API_KEY}&units=metric`;
  const res = await fetch(url, { next: { revalidate: 600 } } as RequestInit);

  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`);
  }

  const json: IApiResponse = await res.json();
  const data = parseWeatherResponse(json);
  weatherCache.set(cacheKey, { data, ts: Date.now() });
  return data;
}

export function useWeather() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState<Partial<IWeatherData>>({ ready: false });
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [clickedDayIndex, setClickedDayIndex] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadDefaultCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDefaultCity = async () => {
    try {
      const ipRes = await fetch("https://ipapi.co/json/");
      const ipData = await ipRes.json();
      const detectedCity: string = ipData.city || DEFAULT_CITY;
      const data = await fetchWeather(detectedCity);
      setWeatherData(data);
    } catch {
      try {
        const data = await fetchWeather(DEFAULT_CITY);
        setWeatherData(data);
      } catch {
        setError("Failed to load weather data. Please try again.");
      }
    } finally {
      setIsInitialLoading(false);
    }
  };

  const updateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setCityInput(value);
    }, 300);
    setCityInput(value);
  };

  const searchCity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = cityInput.trim();
    if (!trimmed || trimmed.length < 2) {
      setError("Please enter at least 2 characters");
      return;
    }

    setError(null);
    setIsSearching(true);
    setClickedDayIndex(null);

    try {
      const data = await fetchWeather(trimmed);
      setWeatherData(data);
    } catch {
      setError(`City "${trimmed}" not found. Please try another city.`);
    } finally {
      setIsSearching(false);
    }
  };

  const showLocation = async () => {
    setError(null);
    setIsGeolocating(true);
    setClickedDayIndex(null);

    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      const city: string | undefined = data.city;

      if (!city) throw new Error("Could not determine your location");

      const weatherResult = await fetchWeather(city);
      setWeatherData(weatherResult);
      setCityInput("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to detect your location.";
      setError(msg + " Please search for your city manually.");
    } finally {
      setIsGeolocating(false);
    }
  };

  const clearError = () => setError(null);

  const searchCityByName = async (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;

    setError(null);
    setIsSearching(true);
    setClickedDayIndex(null);
    setCityInput(trimmed);

    try {
      const data = await fetchWeather(trimmed);
      setWeatherData(data);
    } catch {
      setError(`City "${trimmed}" not found. Please try another city.`);
    } finally {
      setIsSearching(false);
    }
  };

  return {
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
  };
}