"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IDayForecast } from "../hooks/useWeather";

interface PinnedCityWeather {
  city: string;
  temperature: number;
  icon: string;
  description: string;
  daily: IDayForecast[];
}

interface PinnedCityCardProps {
  city: string;
  isMock?: boolean;
  onSelect: (city: string) => void;
  onUnpin: (city: string) => void;
  isActive: boolean;
}

const MOCK_ICON = "https://ssl.gstatic.com/onebox/weather/64/sunny.png";

export default function PinnedCityCard({ city, isMock = false, onSelect, onUnpin, isActive }: PinnedCityCardProps) {
  const [weather, setWeather] = useState<PinnedCityWeather | null>(null);
  const [loading, setLoading] = useState(!isMock);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isMock) return;

    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://api.shecodes.io/weather/v1/forecast?query=${encodeURIComponent(city)}&key=${apiKey}&units=metric`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const today = data.daily?.[0];
        if (!today) throw new Error("No data");
        setWeather({
          city: data.city,
          temperature: Math.round(today.temperature.day),
          icon: today.condition.icon_url,
          description: today.condition.description,
          daily: data.daily.slice(1, 6).map((d: {
            time: number;
            temperature: { minimum: number; maximum: number; humidity: number };
            condition: { icon_url: string; description: string };
            wind: { speed: number };
          }) => ({
            date: new Date(d.time * 1000),
            tempMin: Math.round(d.temperature.minimum),
            tempMax: Math.round(d.temperature.maximum),
            icon: d.condition.icon_url,
            description: d.condition.description,
            humidity: d.temperature.humidity,
            wind: Math.round(d.wind.speed),
          })),
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [city, isMock]);

  if (isMock) {
    return (
      <div className="relative bg-white/3 border border-white/8 border-dashed rounded-xl p-3 opacity-50">
        <div className="flex items-center gap-2">
          <Image
            src={MOCK_ICON}
            alt="Sunny"
            width={36}
            height={36}
            className="w-9 h-9 flex-shrink-0 opacity-60"
            unoptimized
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-white/60 truncate">City</div>
            <div className="text-xs text-slate-500 truncate">Sunny</div>
          </div>
          <div className="text-xl font-light text-white/40 flex-shrink-0">21°</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative group bg-white/5 backdrop-blur-sm border rounded-xl p-3 transition-all cursor-pointer ${
        isActive
          ? "border-blue-400/60 bg-blue-500/10 shadow-lg shadow-blue-500/10"
          : "border-white/10 hover:border-white/25 hover:bg-white/8"
      }`}
      onClick={() => onSelect(city)}
      role="button"
      tabIndex={0}
      aria-label={`View weather for ${city}`}
      onKeyDown={(e) => e.key === "Enter" && onSelect(city)}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onUnpin(city); }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded-full bg-white/10 hover:bg-red-500/60 flex items-center justify-center cursor-pointer"
        aria-label={`Unpin ${city}`}
      >
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {loading && (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <span className="text-sm text-slate-400 truncate">{city}</span>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <span className="text-sm text-slate-400 truncate">{city}</span>
        </div>
      )}

      {weather && !loading && (
        <div className="flex items-center gap-2">
          <Image
            src={weather.icon}
            alt={weather.description}
            width={40}
            height={40}
            className="w-9 h-9 flex-shrink-0 drop-shadow"
            unoptimized
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-white truncate">{weather.city}</div>
            <div className="text-xs text-slate-400 capitalize truncate">{weather.description}</div>
          </div>
          <div className="text-xl font-light text-white flex-shrink-0">{weather.temperature}°</div>
        </div>
      )}
    </div>
  );
}
