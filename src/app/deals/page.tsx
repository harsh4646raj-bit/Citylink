"use client";

import React, { useState } from "react";
import { useCity } from "@/context/city-context";
import { CityService } from "@/services/city-service";
import { GroupDealCard } from "@/components/domain/group-deal-card";
import { Input } from "@/components/ui/input";
import { Search, Flame, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DealsPage() {
  const { activeCity } = useCity();
  const [query, setQuery] = useState("");
  const content = CityService.getCityContent(activeCity.id);

  const filteredDeals = content.groupDeals.filter((deal) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      deal.title.toLowerCase().includes(q) ||
      deal.description.toLowerCase().includes(q) ||
      deal.localityName.toLowerCase().includes(q) ||
      deal.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white min-h-screen pb-20 pt-4 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-1.5">
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500/20" />
            Group Deals
          </h1>
          <p className="text-sm text-gray-500">Collective demand discounts in {activeCity.name}</p>
        </div>
        <Link href="/create?type=group-deal">
          <Button size="sm" className="rounded-xl flex items-center gap-1">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Start Deal</span>
          </Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          placeholder={`Search ${activeCity.name} deals...`}
          className="pl-9 h-11 bg-gray-50 border-gray-100 rounded-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <GroupDealCard key={deal.id} deal={deal} />
          ))
        ) : (
          <div className="text-center py-16 text-sm text-gray-500">
            No group deals matching &ldquo;{query}&rdquo; in {activeCity.name}.
          </div>
        )}
      </div>
    </div>
  );
}
