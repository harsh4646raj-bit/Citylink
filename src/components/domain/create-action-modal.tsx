"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Flame, Users, ShoppingBag, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateActionModal({ open, onOpenChange }: CreateActionModalProps) {
  const router = useRouter();

  const actions = [
    { label: "Post", type: "post", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Group Deal", type: "group-deal", icon: Flame, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Community", type: "community", icon: Users, color: "text-teal-500", bg: "bg-teal-50" },
    { label: "Marketplace", type: "marketplace", icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Event", type: "event", icon: Calendar, color: "text-pink-500", bg: "bg-pink-50" },
  ];

  const handleActionClick = (type: string) => {
    onOpenChange(false);
    router.push(`/create?type=${type}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="p-2 border-b border-gray-100 mb-2">
        <DialogTitle className="text-center text-lg font-bold text-gray-900">
          Create Opportunity
        </DialogTitle>
      </DialogHeader>
      <div className="p-2 grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => handleActionClick(action.type)}
            className="flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl hover:bg-gray-50 transition-colors active:scale-95 text-left"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xs",
                action.bg,
                action.color
              )}
            >
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </Dialog>
  );
}
