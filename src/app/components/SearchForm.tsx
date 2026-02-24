import React from "react";

interface SearchFormProps {
  searchCity: (event: React.FormEvent<HTMLFormElement>) => void;
  updateCity: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearCity: () => void;
  showLocation: () => void;
  cityInput: string;
  isSearching: boolean;
  isGeolocating: boolean;
  cityName: string;
  isPinned: boolean;
  pinDisabled: boolean;
  maxPins: number;
  onPinToggle: () => void;
}

export default function SearchForm({
  searchCity,
  updateCity,
  clearCity,
  showLocation,
  cityInput,
  isSearching,
  isGeolocating,
  cityName,
  isPinned,
  pinDisabled,
  maxPins,
  onPinToggle,
}: SearchFormProps) {
  return (
    <form className="w-full flex flex-col gap-2" onSubmit={searchCity}>
      <div className="flex items-center gap-2">
        <div className="flex-1 relative min-w-0">
          <input
            id="city-search"
            name="city"
            type="text"
            autoComplete="off"
            placeholder="Search for a city..."
            value={cityInput}
            onChange={updateCity}
            className="w-full pl-4 pr-9 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm text-sm"
            aria-label="City name"
          />
          {cityInput ? (
            <button
              type="button"
              onClick={clearCity}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <svg
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>

        <button
          type="submit"
          disabled={isSearching}
          className="flex-shrink-0 px-3 md:px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer text-sm"
          aria-label="Search for city weather"
        >
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
          <span className="hidden sm:inline">{isSearching ? "Searching..." : "Search"}</span>
        </button>

        <div className="relative group/location flex-shrink-0">
          <button
            type="button"
            onClick={showLocation}
            disabled={isGeolocating}
            className="px-3 md:px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer text-sm"
            aria-label="Use my location"
          >
            {isGeolocating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
            <span className="hidden md:inline">{isGeolocating ? "Locating..." : "My location"}</span>
          </button>
          <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 opacity-0 group-hover/location:opacity-100 transition-opacity duration-200 z-50">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-slate-900/95" />
            <div className="bg-slate-900/95 border border-white/10 rounded-xl p-3 text-xs text-slate-300 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <svg className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-white">IP-based geolocation</span>
              </div>
              <p className="leading-relaxed text-slate-400">Detects your city via your IP address. Accuracy: <span className="text-purple-300 font-medium">city-level (~1–50 km)</span>. No GPS or browser permissions needed.</p>
            </div>
          </div>
        </div>

        <div className="relative group/pin flex-shrink-0">
          <button
            type="button"
            onClick={onPinToggle}
            disabled={pinDisabled}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isPinned
                ? "bg-blue-500/20 border-blue-400/50 text-blue-300 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300"
                : "bg-white/5 border-white/15 text-slate-300 hover:bg-blue-500/15 hover:border-blue-400/40 hover:text-blue-200"
            }`}
            aria-label={isPinned ? `Unpin ${cityName}` : `Pin ${cityName}`}
            aria-pressed={isPinned}
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill={isPinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="hidden sm:inline">{isPinned ? "Pinned" : "Pin"}</span>
          </button>
          {pinDisabled && (
            <div className="pointer-events-none absolute top-full right-0 mt-2 w-40 z-50">
              <div className="bg-slate-800 border border-white/15 rounded-lg p-2 text-xs text-slate-300 text-center shadow-xl">
                Max {maxPins} cities pinned
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
