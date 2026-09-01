"use client";

import React from "react";
import { useCity } from "@/context/city-context";
import { Bell, Flame, Users, CheckCircle2, MessageCircle } from "lucide-react";

export default function NotificationsPage() {
  const { activeCity } = useCity();

  const notifications = [
    {
      id: "notif-1",
      icon: Flame,
      iconBg: "bg-amber-100 text-amber-600",
      title: "Group Deal threshold reached!",
      description: "Apartment Sofa & Deep Carpet Cleaning has 9 participants and is now confirmed.",
      time: "2h ago",
      unread: true,
    },
    {
      id: "notif-2",
      icon: Users,
      iconBg: "bg-teal-100 text-teal-600",
      title: "New announcement in MIT Muzaffarpur",
      description: "Priya Ranjan posted about the upcoming Smart City Hackathon.",
      time: "4h ago",
      unread: true,
    },
    {
      id: "notif-3",
      icon: MessageCircle,
      iconBg: "bg-blue-100 text-blue-600",
      title: "Direct message from SparkleClean Pro",
      description: "Vendor confirmed arrival time for Thursday morning slot.",
      time: "1d ago",
      unread: false,
    },
    {
      id: "notif-4",
      icon: CheckCircle2,
      iconBg: "bg-green-100 text-green-600",
      title: `Welcome to ${activeCity.name}!`,
      description: "Your local city feed and neighborhood hub is ready.",
      time: "2d ago",
      unread: false,
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 pt-4 px-4 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bell className="w-6 h-6 text-primary" />
          Notifications
        </h1>
        <p className="text-sm text-gray-500">Updates and alerts for {activeCity.name}</p>
      </div>

      <div className="space-y-2">
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border transition-colors flex items-start gap-3.5 ${
                notif.unread
                  ? "bg-primary/5 border-primary/20"
                  : "bg-white border-gray-100 hover:bg-gray-50"
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${notif.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{notif.title}</h3>
                  <span className="text-[11px] text-gray-400 shrink-0">{notif.time}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{notif.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
