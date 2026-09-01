"use client";

import * as React from "react";
import { City } from "@/types/database";
import { MOCK_CITIES } from "@/constants/mock-data";
import { CityService } from "@/services/city-service";

interface CityContextType {
  activeCity: City;
  cities: City[];
  recentCities: City[];
  isLoading: boolean;
  selectedLocality: string;
  setActiveCity: (city: City) => void;
  switchCityBySlug: (slug: string) => Promise<boolean>;
  setSelectedLocality: (locality: string) => void;
  syncUserHomeCity: (homeCityId: string) => void;
}

const CityContext = React.createContext<CityContextType | undefined>(undefined);

const STORAGE_KEY_ACTIVE_CITY = "citylink_active_city_slug";
const STORAGE_KEY_RECENT_CITIES = "citylink_recent_cities";

export function CityProvider({
  children,
  initialCitySlug = "muzaffarpur",
}: {
  children: React.ReactNode;
  initialCitySlug?: string;
}) {
  const defaultCity = MOCK_CITIES.find((c) => c.slug === initialCitySlug) || MOCK_CITIES[0];

  const [activeCity, setActiveCityState] = React.useState<City>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSlug = localStorage.getItem(STORAGE_KEY_ACTIVE_CITY);
        if (savedSlug) {
          const found = MOCK_CITIES.find((c) => c.slug.toLowerCase() === savedSlug.toLowerCase());
          if (found) return found;
        }
      } catch {
        // Storage unavailable
      }
    }
    return defaultCity;
  });

  const [cities, setCities] = React.useState<City[]>(MOCK_CITIES);
  const [recentCities, setRecentCities] = React.useState<City[]>([]);
  const [selectedLocality, setSelectedLocality] = React.useState<string>("All Localities");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Initialize from localStorage and fetch cities on mount
  React.useEffect(() => {
    const loadCityState = async () => {
      setIsLoading(true);
      try {
        const fetchedCities = await CityService.getActiveCities();
        if (fetchedCities.length > 0) {
          setCities(fetchedCities);
        }

        // Restore active city from localStorage if available
        const savedSlug = localStorage.getItem(STORAGE_KEY_ACTIVE_CITY);
        if (savedSlug) {
          const matched = fetchedCities.find((c) => c.slug.toLowerCase() === savedSlug.toLowerCase());
          if (matched) {
            setActiveCityState(matched);
            document.cookie = `citylink_active_city_slug=${matched.slug}; path=/; max-age=31536000; SameSite=Lax`;
          }
        }

        // Restore recent cities
        const savedRecentJson = localStorage.getItem(STORAGE_KEY_RECENT_CITIES);
        if (savedRecentJson) {
          const recentSlugs: string[] = JSON.parse(savedRecentJson);
          const matchedRecent = recentSlugs
            .map((slug) => fetchedCities.find((c) => c.slug === slug))
            .filter((c): c is City => Boolean(c));
          setRecentCities(matchedRecent);
        }
      } catch {
        // Fallback to defaults
      } finally {
        setIsLoading(false);
      }
    };

    loadCityState();
  }, []);

  const setActiveCity = React.useCallback((city: City) => {
    setActiveCityState(city);
    setSelectedLocality("All Localities");

    // Persist active city
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_CITY, city.slug);
      document.cookie = `citylink_active_city_slug=${city.slug}; path=/; max-age=31536000; SameSite=Lax`;

      // Update recent cities history (up to 3 recent cities excluding current)
      setRecentCities((prev) => {
        const filtered = prev.filter((c) => c.id !== city.id);
        const updated = [city, ...filtered].slice(0, 3);
        localStorage.setItem(
          STORAGE_KEY_RECENT_CITIES,
          JSON.stringify(updated.map((c) => c.slug))
        );
        return updated;
      });
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  const switchCityBySlug = React.useCallback(
    async (slug: string): Promise<boolean> => {
      const city = await CityService.getCityBySlug(slug);
      if (city) {
        setActiveCity(city);
        return true;
      }
      return false;
    },
    [setActiveCity]
  );

  const syncUserHomeCity = React.useCallback(
    (homeCityId: string) => {
      try {
        const savedSlug = localStorage.getItem(STORAGE_KEY_ACTIVE_CITY);
        // Only fall back to home_city_id if user has no explicit browsing preference saved
        if (!savedSlug && homeCityId) {
          const matched = cities.find((c) => c.id === homeCityId);
          if (matched) {
            setActiveCityState(matched);
          }
        }
      } catch {
        // Storage unavailable
      }
    },
    [cities]
  );

  const value = React.useMemo(
    () => ({
      activeCity,
      cities,
      recentCities,
      isLoading,
      selectedLocality,
      setActiveCity,
      switchCityBySlug,
      setSelectedLocality,
      syncUserHomeCity,
    }),
    [activeCity, cities, recentCities, isLoading, selectedLocality, setActiveCity, switchCityBySlug, syncUserHomeCity]
  );

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export function useCity() {
  const context = React.useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}
