"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { CreateActionModal } from "@/components/domain/create-action-modal";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 block lg:hidden bg-white border-t border-gray-100 pb-safe">
        <div className="flex h-14 items-center justify-between px-4 max-w-md mx-auto">
          {/* Home */}
          <Link href="/" className={cn("flex flex-col items-center justify-center w-12", pathname === "/" ? "text-foreground" : "text-gray-400")}>
            <Home className={cn("h-6 w-6", pathname === "/" ? "fill-current" : "")} />
            <span className="text-[10px] mt-0.5">Home</span>
          </Link>
          
          {/* Discover */}
          <Link href="/discover" className={cn("flex flex-col items-center justify-center w-12", pathname === "/discover" ? "text-foreground" : "text-gray-400")}>
            <Search className="h-6 w-6" />
            <span className="text-[10px] mt-0.5">Discover</span>
          </Link>
          
          {/* Create */}
          <button onClick={() => setIsCreateModalOpen(true)} className="flex flex-col items-center justify-center w-12 focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center -mt-3 shadow-sm">
              <Plus className="h-7 w-7" />
            </div>
            <span className="text-[10px] mt-0.5 text-gray-400">Create</span>
          </button>
          
          {/* Messages */}
          <Link href="/messages" className={cn("flex flex-col items-center justify-center w-12 relative", pathname === "/messages" ? "text-foreground" : "text-gray-400")}>
            <div className="relative">
              <MessageCircle className={cn("h-6 w-6", pathname === "/messages" ? "fill-current" : "")} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border border-white">
                2
              </span>
            </div>
            <span className="text-[10px] mt-0.5">Messages</span>
          </Link>
          
          {/* Profile */}
          <Link href="/profile" className={cn("flex flex-col items-center justify-center w-12", pathname === "/profile" ? "text-foreground" : "text-gray-400")}>
            <User className={cn("h-6 w-6", pathname === "/profile" ? "fill-current" : "")} />
            <span className="text-[10px] mt-0.5">Profile</span>
          </Link>
        </div>
      </nav>

      <CreateActionModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </>
  );
}
