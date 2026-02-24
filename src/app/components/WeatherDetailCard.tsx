import React from "react";

type IconType = "humidity" | "wind" | "tempMin" | "tempMax";

interface WeatherDetailCardProps {
  iconType: IconType;
  label: string;
  value: string | number;
  bgColor: string;
}

const ICONS: Record<IconType, React.ReactElement> = {
  humidity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-300">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  wind: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-300">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  tempMin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-cyan-300">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  ),
  tempMax: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-orange-300">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  ),
};

export default function WeatherDetailCard({ iconType, label, value, bgColor }: WeatherDetailCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-2.5 md:p-3 border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className={`w-6 h-6 md:w-7 md:h-7 rounded-lg ${bgColor} flex items-center justify-center`}>
          {ICONS[iconType]}
        </div>
        <div className="text-slate-300 text-xs font-medium">{label}</div>
      </div>
      <div className="text-lg md:text-xl font-semibold text-white">{value}</div>
    </div>
  );
}
