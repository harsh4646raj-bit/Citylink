"use client";

import * as React from "react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCity } from "@/context/city-context";
import { City } from "@/types/database";
import { MapPin, Search, Check, Building2, Compass, History } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CitySwitcherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCityId?: string;
  onSelectCity?: (city: City) => void;
}

export function CitySwitcherDialog({
  open,
  onOpenChange,
  selectedCityId,
  onSelectCity,
}: CitySwitcherDialogProps) {
  const { activeCity, cities, recentCities, setActiveCity } = useCity();
  const [searchQuery, setSearchQuery] = React.useState("");

  const currentActiveId = selectedCityId || activeCity.id;

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (city: City) => {
    setActiveCity(city);
    if (onSelectCity) {
      onSelectCity(city);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2.5 text-primary font-extrabold mb-1">
          <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Compass className="h-5 w-5" />
          </div>
          <DialogTitle>Switch City</DialogTitle>
        </div>
        <DialogDescription>
          Switch your browsing context instantly. Discover deals, communities, and updates across any supported city.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2">
        {/* Search input */}
        <div className="relative">
          <Input
            placeholder="Search city or state (e.g. Muzaffarpur, Patna)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
            autoFocus
          />
        </div>

        {/* Recent Cities Quick Chips */}
        {recentCities.length > 0 && searchQuery === "" && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-muted-foreground px-1">
              <History className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Recent Cities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentCities.map((recent) => (
                <button
                  key={recent.id}
                  onClick={() => handleSelect(recent)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-muted/60 hover:bg-muted text-foreground border border-border/60 transition-all active:scale-95"
                >
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>{recent.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Supported Cities List */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1 no-scrollbar">
          <div className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground px-1">
            Supported Cities
          </div>
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const isSelected = city.id === currentActiveId;
              return (
                <button
                  key={city.id}
                  onClick={() => handleSelect(city)}
                  className={cn(
                    "w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-150 active:scale-[0.99]",
                    isSelected
                      ? "border-primary bg-primary/8 text-primary font-bold shadow-2xs"
                      : "border-border/70 hover:bg-muted/50 hover:border-border text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted text-muted-foreground"
                      )}
                    >
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold flex items-center gap-2">
                        <span>{city.name}</span>
                        {city.slug === "muzaffarpur" && (
                          <Badge variant="secondary" className="text-[10px] py-0 px-2 font-bold">
                            Pilot City
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">{city.state}, India</div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                      <span>Current</span>
                    </div>
                  )}
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-sm text-muted-foreground space-y-2">
              <Building2 className="h-10 w-10 mx-auto text-muted-foreground/40" />
              <p className="font-medium">No matching city found. Expanding to more cities soon.</p>
            </div>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl w-full sm:w-auto font-semibold">
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
