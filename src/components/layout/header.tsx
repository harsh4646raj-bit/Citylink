"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Bell, Search, MapPin, Send, Home, Compass, PlusSquare, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { CitySwitcherDialog } from "@/components/domain/city-switcher-dialog";
import { CreateActionModal } from "@/components/domain/create-action-modal";
import { AuthModal } from "@/components/domain/auth-modal";
import { useCity } from "@/context/city-context";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { activeCity } = useCity();
  const { profile, isAuthenticated } = useAuth();

  const [isCityModalOpen, setIsCityModalOpen] = React.useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const handleCreateClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setIsCreateModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 transition-all">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 lg:px-6">
          {/* Left: Brand */}
          <div className="flex-1 flex justify-start items-center">
            <Link href="/" className="flex items-center group shrink-0">
              <span className="font-bold text-xl leading-none text-foreground flex items-center">
                Citylink
                <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block ml-0.5" />
              </span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-gray-50 p-1 rounded-full border border-gray-200 ml-6">
              <Link
                href="/"
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                  pathname === "/"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Feed
              </Link>
              <Link
                href="/discover"
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                  pathname === "/discover"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Discover
              </Link>
              <Link
                href="/messages"
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                  pathname === "/messages"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Messages
              </Link>
            </nav>
          </div>

          {/* Center: City Selector */}
          <div className="flex justify-center items-center">
            <button
              onClick={() => setIsCityModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-foreground transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Change city"
            >
              <MapPin className="h-4 w-4 text-foreground shrink-0" />
              <span className="max-w-[100px] truncate">{activeCity?.name || 'Select City'}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <Link href="/discover" className="text-foreground hover:text-foreground/80">
              <Search className="h-6 w-6" />
            </Link>

            {isAuthenticated ? (
              <>
                <div className="relative cursor-pointer text-foreground hover:text-foreground/80">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border border-white">
                    3
                  </span>
                </div>
                
                <Link href="/messages" className="text-foreground hover:text-foreground/80">
                  <Send className="h-6 w-6" />
                </Link>

                <div className="hidden lg:block ml-2 cursor-pointer">
                  <Avatar
                    fallbackText={profile?.full_name || profile?.name || "User"}
                    size="sm"
                    className="h-8 w-8 ring-2 ring-transparent hover:ring-gray-200 transition-all"
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="h-8 text-xs font-bold rounded-full px-3">
                    Log in
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <CitySwitcherDialog
        open={isCityModalOpen}
        onOpenChange={setIsCityModalOpen}
      />

      <CreateActionModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      <AuthModal
        open={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        title="Sign in to Citylink"
        description="Log in or create a free account to interact with your city."
      />
    </>
  );
}
