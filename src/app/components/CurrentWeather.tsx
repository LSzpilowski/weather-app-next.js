"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface CurrentWeatherProps {
  city: string;
  date: Date;
  temperature: number;
  icon: string;
  description: string;
  isForecastDay?: boolean;
}

export default function CurrentWeather({
  city,
  date,
  temperature,
  icon,
  description,
  isForecastDay = false,
}: CurrentWeatherProps) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [liveTime, setLiveTime] = useState("");

  useEffect(() => {
    if (isForecastDay) return;

    const tick = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setLiveTime(`${h}:${m}`);
    };

    tick();
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, [isForecastDay]);

  const dayName = days[date.getDay()];
  const formattedDate = isForecastDay
    ? dayName
    : liveTime
    ? `${days[new Date().getDay()]}, ${liveTime}`
    : `${dayName}`;

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-0.5 leading-tight">
          {city}
        </h1>
        <div className="text-slate-300 text-xs md:text-sm">
          {formattedDate}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Image
          src={icon}
          alt={`${description} weather icon`}
          width={80}
          height={80}
          priority
          className="w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl"
          unoptimized
        />
        <div>
          <div className="text-5xl md:text-6xl font-light text-white mb-0.5">{temperature}°</div>
          <div className="text-base md:text-lg capitalize text-slate-300 font-medium">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
