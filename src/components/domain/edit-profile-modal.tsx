"use client";

import * as React from "react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useCity } from "@/context/city-context";
import { ProfileService } from "@/services/profile-service";
import { AuthService } from "@/services/auth-service";
import { Profile } from "@/types/database";
import { User, MapPin, Lock, Globe, AlertCircle } from "lucide-react";

export interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (updatedProfile: Profile) => void;
}

export function EditProfileModal({
  open,
  onOpenChange,
  onSuccess,
}: EditProfileModalProps) {
  const { user, profile, setProfile } = useAuth();
  const { cities } = useCity();

  const [name, setName] = React.useState(profile?.full_name || profile?.name || "");
  const [username, setUsername] = React.useState(profile?.username || "");
  const [bio, setBio] = React.useState(profile?.bio || "");
  const [homeCityId, setHomeCityId] = React.useState(profile?.home_city_id || cities[0]?.id || "city-muz-01");
  const [privacy, setPrivacy] = React.useState<"public" | "private">(profile?.privacy || "public");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Sync state whenever modal opens or profile changes
  React.useEffect(() => {
    if (profile) {
      setName(profile.full_name || profile.name || "");
      setUsername(profile.username || "");
      setBio(profile.bio || "");
      if (profile.home_city_id) {
        setHomeCityId(profile.home_city_id);
      }
      setPrivacy(profile.privacy || "public");
    }
  }, [profile, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setLoading(true);

    const cleanUsername = username.toLowerCase().trim().replace(/^@/, "");

    // Check if username changed and is available
    if (cleanUsername !== profile?.username) {
      const isAvailable = await AuthService.checkUsernameAvailability(cleanUsername);
      if (!isAvailable) {
        setLoading(false);
        setError(`The username @${cleanUsername} is already taken.`);
        return;
      }
    }

    const res = await ProfileService.updateProfile(user.id, {
      name,
      username: cleanUsername,
      bio,
      home_city_id: homeCityId,
      privacy,
    });

    setLoading(false);

    if (res.success && res.profile) {
      setProfile(res.profile);
      if (onSuccess) onSuccess(res.profile);
      onOpenChange(false);
    } else {
      setError(res.error || "Failed to update profile. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2.5 text-primary font-extrabold mb-1">
          <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <User className="h-5 w-5" />
          </div>
          <DialogTitle>Edit Profile</DialogTitle>
        </div>
        <DialogDescription>
          Update your public details, home city anchor, and privacy preferences.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        {error && (
          <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Input
          label="Display Name"
          placeholder="e.g. Harsh Kumar"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Username"
          placeholder="e.g. harsh_k"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
          helperText="Unique handle across Citylink (@username)"
          required
        />

        <div className="space-y-1.5 text-left">
          <div className="flex justify-between items-center">
            <label className="text-xs sm:text-sm font-semibold text-foreground/90">Bio / About</label>
            <span className="text-[10px] text-muted-foreground font-semibold">{bio.length}/160</span>
          </div>
          <textarea
            rows={3}
            maxLength={160}
            className="w-full rounded-xl border border-input bg-background/80 px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
            placeholder="Tell neighbors a bit about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Home City Selector */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs sm:text-sm font-semibold text-foreground/90 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Permanent Home City</span>
          </label>
          <select
            value={homeCityId}
            onChange={(e) => setHomeCityId(e.target.value)}
            className="w-full h-11 px-3.5 text-xs font-bold rounded-xl border border-input bg-background/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.state}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-muted-foreground">
            Sets your default neighborhood community affiliation.
          </p>
        </div>

        {/* Profile Privacy Toggle */}
        <div className="space-y-2 pt-1 text-left">
          <label className="text-xs sm:text-sm font-semibold text-foreground/90">Account Privacy</label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setPrivacy("public")}
              className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 text-xs transition-all duration-150 active:scale-95 ${
                privacy === "public"
                  ? "border-primary bg-primary/8 text-foreground font-bold shadow-2xs"
                  : "border-border/70 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-foreground">Public</div>
                <div className="text-[10px] text-muted-foreground font-medium">Anyone can see activity</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPrivacy("private")}
              className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 text-xs transition-all duration-150 active:scale-95 ${
                privacy === "private"
                  ? "border-secondary bg-secondary/8 text-foreground font-bold shadow-2xs"
                  : "border-border/70 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <Lock className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-foreground">Private</div>
                <div className="text-[10px] text-muted-foreground font-medium">Only connections see</div>
              </div>
            </button>
          </div>
        </div>

        <DialogFooter className="pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={loading}
            variant="default"
            className="font-bold rounded-xl shadow-xs"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
