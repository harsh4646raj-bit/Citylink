"use client";

import * as React from "react";
import { useCity } from "@/context/city-context";
import { CityService } from "@/services/city-service";
import { MapPin, Flame } from "lucide-react";

export function LocationContextBar() {
  const { activeCity, selectedLocality, setSelectedLocality } = useCity();

  const localities = React.useMemo(() => {
    return CityService.getLocalitiesForCity(activeCity.slug);
  }, [activeCity.slug]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-extrabold shrink-0 pr-1 select-none">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="hidden xs:inline">Areas in {activeCity.name}:</span>
          <span className="xs:hidden">Areas:</span>
        </div>

        {localities.map((locality, index) => {
          const isSelected = selectedLocality === locality;
          const isAll = locality === "All Localities";
          return (
            <button
              key={locality}
              type="button"
              onClick={() => setSelectedLocality(locality)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 shrink-0 select-none active:scale-95 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-2xs font-extrabold"
                  : "bg-muted/70 text-foreground/80 hover:text-foreground hover:bg-muted border border-border/50"
              }`}
            >
              {isAll && <Flame className={`h-3 w-3 ${isSelected ? "text-amber-300" : "text-accent"}`} />}
              <span>{locality}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
