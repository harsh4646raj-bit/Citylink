"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/onboarding");

  if (isAuthRoute) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white">
        <header className="py-4 px-6 border-b border-gray-100 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <span className="font-bold tracking-tight text-lg text-foreground">
              Citylink
            </span>
          </a>
        </header>
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="w-full max-w-md mx-auto">
            {children}
          </div>
        </main>
        <footer className="py-4 px-6 text-center text-xs text-muted-foreground border-t border-gray-100">
          © {new Date().getFullYear()} Citylink. City-Based Social Opportunity Platform.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="container max-w-screen-2xl flex-1 flex justify-center lg:px-6">
        <SidebarNav />
        <main className="flex-1 w-full lg:max-w-2xl min-w-0 pb-20 lg:pb-8 px-0 lg:px-6 animate-fade-in">
          {children}
        </main>
        <RightSidebar />
      </div>
      <BottomNav />
    </div>
  );
}
