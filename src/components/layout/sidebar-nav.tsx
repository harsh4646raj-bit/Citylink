"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Users,
  Flame,
  ShoppingBag,
  MessageCircle,
  Bell,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Feed", href: "/", icon: Home },
    { label: "Discover", href: "/discover", icon: Compass },
    { label: "Group Deals", href: "/deals", icon: Flame },
    { label: "Communities", href: "/communities", icon: Users },
    { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { label: "Messages", href: "/messages", icon: MessageCircle },
    { label: "Notifications", href: "/notifications", icon: Bell },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="hidden lg:flex flex-col w-64 border-r border-gray-100 min-h-screen p-4 bg-white shrink-0">
      <div className="mb-6 px-3">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-2xl font-black tracking-tight text-foreground">
            Citylink
          </span>
          <span className="h-2 w-2 rounded-full bg-accent inline-block" />
        </Link>
      </div>

      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs font-bold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
