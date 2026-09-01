"use client";

import * as React from "react";
import { Users, Clock, MapPin, MoreHorizontal, Flame, AlertCircle } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { GroupDealService } from "@/services/group-deal-service";
import { useOptionalAuth } from "@/context/auth-context";

export interface GroupDealCardProps {
  deal: {
    id: string;
    title: string;
    serviceName: string;
    localityName: string;
    description: string;
    category?: string;
    organizerName: string;
    vendorName?: string;
    min_participants: number;
    max_participants: number;
    current_participants: number;
    original_price: number;
    discounted_price: number;
    deadline: string;
    status: string;
  };
  onJoin?: (dealId: string) => void;
  variant?: "default" | "compact" | "spotlight";
}

export function GroupDealCard({ deal, onJoin, variant = "default" }: GroupDealCardProps) {
  const auth = useOptionalAuth();
  const user = auth?.user;
  const [joined, setJoined] = React.useState(false);
  const [participantCount, setParticipantCount] = React.useState(deal.current_participants);
  const [isJoining, setIsJoining] = React.useState(false);
  const [joinError, setJoinError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user?.id) {
      GroupDealService.hasUserJoined(deal.id, user.id).then((isJoined) => {
        if (isJoined) setJoined(true);
      });
    }
  }, [deal.id, user?.id]);

  const percentageToMin = Math.min(100, Math.round((participantCount / deal.min_participants) * 100));
  const isThresholdMet = participantCount >= deal.min_participants;
  
  const savingsAmount = deal.original_price - deal.discounted_price;
  const savingsPercent = Math.round((savingsAmount / deal.original_price) * 100);

  const getDeadlineText = (deadlineStr: string) => {
    try {
      const deadline = new Date(deadlineStr);
      const now = new Date();
      const diffHours = Math.max(0, Math.round((deadline.getTime() - now.getTime()) / (1000 * 60 * 60)));
      if (diffHours > 24) {
        return `${Math.ceil(diffHours / 24)} days left`;
      }
      return `${diffHours} hours left`;
    } catch {
      return "3 days left";
    }
  };

  const handleJoinClick = async () => {
    if (joined || isJoining) return;
    setJoinError(null);
    setIsJoining(true);

    const previousCount = participantCount;

    // Optimistic UI update
    setJoined(true);
    setParticipantCount((prev) => prev + 1);

    if (onJoin) {
      onJoin(deal.id);
    }

    try {
      const userId = user?.id || "user-curr-01";
      const res = await GroupDealService.joinGroupDeal({
        dealId: deal.id,
        userId,
      });

      if (!res.success) {
        // Rollback state on failure
        setJoined(false);
        setParticipantCount(previousCount);
        setJoinError(res.error || "Failed to join deal. Please try again.");
      } else if (res.currentParticipants) {
        setParticipantCount(res.currentParticipants);
      }
    } catch {
      // Rollback state on network exception
      setJoined(false);
      setParticipantCount(previousCount);
      setJoinError("Network error. Unable to register deal participation.");
    } finally {
      setIsJoining(false);
    }
  };

  const authorName = deal.vendorName || deal.organizerName;

  return (
    <div className="w-full bg-white sm:max-w-xl sm:mx-auto sm:border sm:border-gray-100 sm:rounded-2xl pb-1">
      {/* Author Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 font-extrabold text-sm overflow-hidden flex items-center justify-center shadow-2xs">
            {authorName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm text-foreground">{authorName}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{deal.localityName}</span>
              <span>·</span>
              <span>3h</span>
            </div>
          </div>
        </div>
        <button className="p-2 -mr-2 text-foreground/80 hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Badges */}
      <div className="px-4 flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 rounded-full px-2.5 py-0.5 text-xs font-bold border border-amber-200/60">
          <Flame className="h-3 w-3 fill-amber-500 text-amber-600" />
          GROUP DEAL
        </span>
        <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
          <Clock className="h-3.5 w-3.5" />
          <span>{getDeadlineText(deal.deadline)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-1">
        <h3 className="text-lg font-bold text-foreground leading-tight">
          {deal.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {deal.description}
        </p>
      </div>

      {/* Product Image Area */}
      <div className="w-full aspect-[2/1] bg-gradient-to-br from-gray-100 to-gray-200 my-3 flex items-center justify-center sm:rounded-xl">
        <span className="text-gray-400 text-sm font-medium">Group Offer Preview</span>
      </div>

      {/* Pricing and Action */}
      <div className="px-4 pb-4">
        {joinError && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{joinError}</span>
          </div>
        )}

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-black text-foreground tracking-tight">
            {formatCurrency(deal.discounted_price)}
          </span>
          <span className="text-sm text-muted-foreground font-medium line-through">
            {formatCurrency(deal.original_price)}
          </span>
          <span className="text-sm font-bold text-emerald-600 ml-1">
            Save {savingsPercent}%
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="flex items-center gap-1.5 text-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{participantCount} joined</span>
            </span>
            <span className="text-muted-foreground font-medium text-xs sm:text-sm">
              Goal: {deal.min_participants} participants
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500 rounded-full",
                isThresholdMet ? "bg-emerald-500" : "bg-amber-400"
              )}
              style={{ width: `${percentageToMin}%` }}
              role="progressbar"
              aria-valuenow={percentageToMin}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <button
          role="button"
          onClick={handleJoinClick}
          disabled={joined || isJoining}
          className={cn(
            "w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-150 active:scale-97 shadow-xs",
            joined 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default" 
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {joined ? "Joined" : "Join Deal"}
        </button>
      </div>

      <div className="border-b border-gray-100 sm:hidden"></div>
    </div>
  );
}
