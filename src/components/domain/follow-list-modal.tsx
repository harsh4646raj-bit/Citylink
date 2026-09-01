"use client";

import * as React from "react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Profile } from "@/types/database";
import { Users, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface FollowListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  users: Profile[];
}

export function FollowListModal({
  open,
  onOpenChange,
  title,
  users,
}: FollowListModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2.5 text-primary font-extrabold mb-1">
          <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Users className="h-5 w-5" />
          </div>
          <DialogTitle>{title}</DialogTitle>
        </div>
        <DialogDescription>
          Connected residents in your local network.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2 py-2 max-h-72 overflow-y-auto pr-1 no-scrollbar">
        {users.length > 0 ? (
          users.map((u) => {
            const displayName = u.full_name || u.name;
            return (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-2xl border border-border/80 bg-card hover:bg-muted/40 transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-3 truncate">
                  <Avatar fallbackText={displayName} size="sm" className="ring-1 ring-border/60" />
                  <div className="truncate">
                    <div className="text-xs font-extrabold text-foreground flex items-center gap-1">
                      <span className="truncate">{displayName}</span>
                      {u.is_verified && (
                        <ShieldCheck className="h-3.5 w-3.5 text-secondary shrink-0" />
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      @{u.username}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/u/${u.username}`}
                  onClick={() => onOpenChange(false)}
                  className="shrink-0"
                >
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-bold rounded-xl hover:text-primary">
                    View <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-xs text-muted-foreground font-medium">
            No connections found in this list.
          </div>
        )}
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl font-semibold">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
