"use client"
import React from "react"
import { cn } from "@/lib/utils"

export function RightSidebar() {
  return (
    <aside className="hidden xl:block w-80 min-h-screen p-6 border-l border-gray-100 bg-white">
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Trending in Muzaffarpur</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Group Deal • Trending</p>
              <p className="text-sm font-medium text-gray-900">Organic Mangoes Bulk Order</p>
              <p className="text-xs text-gray-500">120 joined</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Event • Trending</p>
              <p className="text-sm font-medium text-gray-900">Weekend Tech Meetup</p>
              <p className="text-xs text-gray-500">45 attending</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Suggested Communities</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Muzaffarpur Coders</p>
                <p className="text-xs text-gray-500">1.2k members</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Local Farmers Market</p>
                <p className="text-xs text-gray-500">850 members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
