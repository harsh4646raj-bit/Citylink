"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [selectedThread, setSelectedThread] = useState<string | null>(null);

  const threads = [
    {
      id: "t-1",
      sender: "SparkleClean Pro Muzaffarpur",
      avatar: "",
      preview: "Thursday 10:00 AM confirmed for Mithanpura Society. All 9 flats on schedule.",
      time: "10:45 AM",
      unread: true,
      verified: true,
    },
    {
      id: "t-2",
      sender: "Amit Kumar",
      avatar: "",
      preview: "Are you still looking for 2 more people for the AC repair deal?",
      time: "Yesterday",
      unread: false,
      verified: false,
    },
    {
      id: "t-3",
      sender: "Mithanpura Football Group",
      avatar: "",
      preview: "Match this Sunday at 6AM. Who is in?",
      time: "Tuesday",
      unread: false,
      verified: false,
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 pt-4">
      <div className="px-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages & Channels</h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none transition-shadow"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {threads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => setSelectedThread(thread.id)}
            className={cn(
              "flex items-start gap-3 px-4 py-3 text-left transition-colors active:bg-gray-50 border-b border-gray-50 last:border-0",
              thread.unread ? "bg-white" : "bg-white/60"
            )}
          >
            <Avatar className="w-12 h-12 flex-shrink-0 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500 font-semibold text-lg">
                {thread.sender.charAt(0)}
              </span>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <span className={cn(
                  "font-semibold truncate pr-2 text-sm",
                  thread.unread ? "text-gray-900" : "text-gray-700"
                )}>
                  {thread.sender}
                </span>
                <span className={cn(
                  "text-xs flex-shrink-0",
                  thread.unread ? "text-primary font-medium" : "text-gray-400"
                )}>
                  {thread.time}
                </span>
              </div>
              
              <p className={cn(
                "text-sm line-clamp-2 pr-4 leading-snug",
                thread.unread ? "text-gray-900 font-medium" : "text-gray-500"
              )}>
                {thread.preview}
              </p>
            </div>
            
            {thread.unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 mt-2" />
            )}
          </button>
        ))}
      </div>
      
      {threads.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center text-gray-500">
          <MessageCircle className="w-12 h-12 mb-3 text-gray-300" />
          <p>No messages yet</p>
        </div>
      )}
    </div>
  );
}
