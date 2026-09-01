"use client";

import React, { useState } from "react";
import { useCity } from "@/context/city-context";
import { CityService } from "@/services/city-service";
import { MarketplaceCard } from "@/components/domain/marketplace-card";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketplacePage() {
  const { activeCity } = useCity();
  const [query, setQuery] = useState("");
  const content = CityService.getCityContent(activeCity.id);

  const filteredItems = content.marketplace.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.localityName.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white min-h-screen pb-20 pt-4 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-1.5">
            <ShoppingBag className="w-6 h-6 text-purple-500" />
            Marketplace
          </h1>
          <p className="text-sm text-gray-500">Buy and sell second-hand goods in {activeCity.name}</p>
        </div>
        <Link href="/create?type=marketplace">
          <Button size="sm" className="rounded-xl flex items-center gap-1">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Sell Item</span>
          </Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          placeholder={`Search ${activeCity.name} marketplace...`}
          className="pl-9 h-11 bg-gray-50 border-gray-100 rounded-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MarketplaceCard key={item.id} item={item} />
          ))
        ) : (
          <div className="col-span-2 text-center py-16 text-sm text-gray-500">
            No marketplace items matching &ldquo;{query}&rdquo; in {activeCity.name}.
          </div>
        )}
      </div>
    </div>
  );
}
