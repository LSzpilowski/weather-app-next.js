"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "pinned-cities";
const MAX_PINS = 6;

export function usePinnedCities() {
  const [pinnedCities, setPinnedCities] = useState<string[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPinnedCities(JSON.parse(stored));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const persist = (cities: string[]) => {
    setPinnedCities(cities);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
    } catch {
      // ignore
    }
  };

  const pinCity = useCallback(
    (city: string) => {
      const normalized = city.trim();
      if (!normalized) return;
      if (pinnedCities.map((c) => c.toLowerCase()).includes(normalized.toLowerCase())) return;
      if (pinnedCities.length >= MAX_PINS) return;
      persist([...pinnedCities, normalized]);
    },
    [pinnedCities]
  );

  const unpinCity = useCallback(
    (city: string) => {
      persist(pinnedCities.filter((c) => c.toLowerCase() !== city.toLowerCase()));
    },
    [pinnedCities]
  );

  const isPinned = useCallback(
    (city: string) => pinnedCities.map((c) => c.toLowerCase()).includes(city.toLowerCase()),
    [pinnedCities]
  );

  return { pinnedCities, pinCity, unpinCity, isPinned, maxPins: MAX_PINS };
}
