"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCity } from "@/context/city-context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapPin, Sparkles, Users, ShoppingBag, Calendar, FileText, CheckCircle2 } from "lucide-react";

function CreateFormContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get("type") || "group-deal";

  const { activeCity } = useCity();
  const [activeTab, setActiveTab] = useState(typeParam);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeParam) {
      setActiveTab(typeParam);
    }
  }, [typeParam]);

  const tabs = [
    { id: "group-deal", label: "Group Deal", icon: Sparkles },
    { id: "post", label: "Feed Post", icon: FileText },
    { id: "community", label: "Community", icon: Users },
    { id: "marketplace", label: "Listing", icon: ShoppingBag },
    { id: "event", label: "Event", icon: Calendar },
  ];

  if (submitted) {
    return (
      <div className="bg-white min-h-screen pt-12 px-4 flex flex-col items-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Successfully Created!</h2>
        <p className="text-gray-500 text-center mb-8 max-w-sm">
          Your new opportunity is now published and visible to neighbors in {activeCity.name}.
        </p>
        <Button onClick={() => setSubmitted(false)} className="w-full sm:w-auto px-8">
          Create Another
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 pt-4 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Create Opportunity</h1>
          <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg inline-flex">
            <MapPin className="w-4 h-4 mr-1.5 text-primary" />
            Publishing to City: <span className="font-semibold text-gray-900 ml-1">{activeCity.name}</span>
          </div>
        </div>

        {/* Type Selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-150 whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <Card className="border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">
              {activeTab === "group-deal" && "New Group Deal Demand"}
              {activeTab === "post" && "Share with City Feed"}
              {activeTab === "community" && "New Local Community"}
              {activeTab === "marketplace" && "Sell in City Marketplace"}
              {activeTab === "event" && "Organize Local Event"}
            </CardTitle>
            <CardDescription>
              {activeTab === "group-deal" && "Rally your neighbors to get bulk pricing on household services."}
              {activeTab === "post" && "Post an update, question, recommendation, or news."}
              {activeTab === "community" && "Create a dedicated space for your neighborhood, society, or interest."}
              {activeTab === "marketplace" && "List second-hand items for local pickup."}
              {activeTab === "event" && "Host a meetup, tournament, or society gathering."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                {activeTab === "post" ? "Headline / Topic" : "Title"}
              </label>
              <Input
                placeholder={
                  activeTab === "group-deal"
                    ? "e.g., Deep Carpet Cleaning Group Booking"
                    : activeTab === "post"
                    ? "e.g., Kalambagh Chowk evening road update"
                    : activeTab === "marketplace"
                    ? "e.g., Teakwood Study Desk with Bookshelf"
                    : activeTab === "event"
                    ? "e.g., MIT Muzaffarpur Alumni Hackathon"
                    : "e.g., Mithanpura Residents Welfare Society"
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Locality / Neighborhood</label>
              <Input placeholder="e.g., Mithanpura, Kalambagh, Brahmpura" />
            </div>

            {activeTab === "group-deal" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Target Participants</label>
                  <Input type="number" defaultValue="8" min="2" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Target Price (₹)</label>
                  <Input type="number" placeholder="799" />
                </div>
              </div>
            )}

            {activeTab === "marketplace" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Price (₹)</label>
                  <Input type="number" placeholder="3200" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Condition</label>
                  <Input placeholder="Like New, Good" />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Description & Details</label>
              <textarea
                rows={4}
                className="w-full p-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Provide details about what you're organizing, selling, or discussing..."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setSubmitted(true)} className="w-full bg-primary text-white h-11 font-bold rounded-xl">
              Publish to {activeCity.name}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="bg-white min-h-screen pt-12 text-center text-gray-400">Loading...</div>}>
      <CreateFormContent />
    </Suspense>
  );
}
