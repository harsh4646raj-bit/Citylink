"use client";

import * as React from "react";
import { MapPin, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

export interface MarketplaceCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    conditionText: string;
    localityName: string;
    sellerName: string;
  };
}

export function MarketplaceCard({ item }: MarketplaceCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group">
      {/* Large Image Placeholder */}
      <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium text-sm">
          Item Image
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-white/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide">
            {item.category}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide">
            {item.conditionText}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Price */}
        <div className="text-2xl font-black text-foreground tracking-tight mb-1">
          {formatCurrency(item.price)}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold leading-snug line-clamp-2 text-foreground mb-1.5 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-3">
          <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          <span className="truncate">{item.localityName}</span>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-auto border-t border-gray-50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="h-6 w-6 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-[10px] font-bold text-gray-500">
              {item.sellerName.charAt(0)}
            </div>
            <span className="text-xs text-muted-foreground font-medium truncate">
              {item.sellerName}
            </span>
          </div>

          <button className="flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors">
            <ShoppingBag className="h-3.5 w-3.5" /> Inquire
          </button>
        </div>
      </div>
    </div>
  );
}
