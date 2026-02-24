import Image from "next/image";
import FormattedDate from "./FormattedDate";

interface ForecastCardProps {
  date: Date;
  icon: string;
  description: string;
  tempMax: number;
  tempMin: number;
  index: number;
  isClicked: boolean;
  isDimmed: boolean;
  onClick: () => void;
}

export default function ForecastCard({
  date,
  icon,
  description,
  tempMax,
  tempMin,
  index,
  isClicked,
  isDimmed,
  onClick,
}: ForecastCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Select day ${index + 1} forecast`}
      aria-pressed={isClicked}
      className={`bg-white/5 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 transition-all cursor-pointer group snap-center flex-shrink-0 w-[calc(50%-0.375rem)] md:w-auto hover:border-white/20 text-left ${
        isDimmed ? "opacity-30" : "opacity-100"
      } ${!isClicked ? "hover:opacity-80" : "hover:border-white/30"}`}
    >
      <div className="text-center space-y-1">
        <div className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
          <FormattedDate date={date} dayOnly={true} />
        </div>
        <Image
          className="w-10 h-10 md:w-12 md:h-12 mx-auto drop-shadow-lg"
          src={icon}
          alt={description}
          width={48}
          height={48}
          unoptimized
        />
        <div className="space-y-0.5">
          <div className="text-sm md:text-base font-bold text-white">{tempMax}°</div>
          <div className="text-xs text-slate-400">{tempMin}°</div>
        </div>
      </div>
    </button>
  );
}
