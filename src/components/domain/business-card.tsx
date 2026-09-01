"use client";

import * as React from "react";
import { Star, MapPin, ShieldCheck, Phone, ArrowRight, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    category: string;
    description: string;
    address: string;
    phone: string;
    is_verified: boolean;
    rating: number;
    localityName: string;
    reviewsCount: number;
    isOpenNow: boolean;
    priceRange: string;
  };
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4 mb-3">
        {/* Logo/Icon Placeholder */}
        <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
          <Building2 className="h-6 w-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-foreground leading-tight truncate">
                  {business.name}
                </h3>
                {business.is_verified && (
                  <ShieldCheck className="h-4 w-4 text-secondary shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <span>{business.category}</span>
                <span>·</span>
                <span className="font-semibold text-foreground">{business.priceRange}</span>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs font-bold">
                <span>{business.rating.toFixed(1)}</span>
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              </div>
              <span className="text-[10px] text-muted-foreground mt-0.5">{business.reviewsCount} reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
        <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
        <span className="truncate">{business.localityName}</span>
        <span>·</span>
        {business.isOpenNow ? (
          <span className="text-emerald-600 font-medium">Open Now</span>
        ) : (
          <span className="text-gray-500 font-medium">Closed</span>
        )}
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {business.description}
      </p>

      {/* Footer / Action */}
      <div className="pt-3 border-t border-gray-50 flex items-center justify-between gap-3 mt-auto">
        <button className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-50 text-foreground hover:bg-gray-100 transition-colors">
          <Phone className="h-4 w-4" />
        </button>
        
        <button className="flex-1 flex items-center justify-center gap-1.5 h-9 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition-colors">
          View Profile <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
