"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { useCity } from "@/context/city-context";
import { ProfileService } from "@/services/profile-service";
import { AuthService } from "@/services/auth-service";
import { MOCK_CITIES } from "@/constants/mock-data";
import { MapPin, CheckCircle2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile, setProfile } = useAuth();
  const { cities, setActiveCity } = useCity();

  const availableCities = cities && cities.length > 0 ? cities : MOCK_CITIES;

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize from existing profile or pending signup session
  useEffect(() => {
    if (profile) {
      if (profile.name || profile.full_name) {
        setFullName(profile.full_name || profile.name || "");
      }
      if (profile.username) {
        setUsername(profile.username);
      }
      if (profile.home_city_id) {
        setSelectedCityId(profile.home_city_id);
      }
      if (profile.bio) {
        setBio(profile.bio);
      }
    } else if (typeof window !== "undefined") {
      try {
        const pending = sessionStorage.getItem("citylink_pending_onboarding");
        if (pending) {
          const parsed = JSON.parse(pending);
          if (parsed.fullName) setFullName(parsed.fullName);
          if (parsed.username) setUsername(parsed.username);
        }
      } catch {
        // Ignore storage error
      }
    }
  }, [profile]);

  const handleStep1Continue = async () => {
    setError("");
    const cleanName = fullName.trim();
    const cleanUser = username.toLowerCase().trim();

    if (!cleanName) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanUser || cleanUser.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      const isAvail = await AuthService.checkUsernameAvailability(cleanUser);
      if (!isAvail && cleanUser !== profile?.username) {
        setError("This username is already taken. Please choose another.");
        setIsLoading(false);
        return;
      }

      setStep(2);
    } catch {
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSetup = async () => {
    setError("");
    const targetCityId = selectedCityId || availableCities[0]?.id || "city-muz-01";
    const matchedCity = availableCities.find((c) => c.id === targetCityId) || availableCities[0];

    setIsLoading(true);
    try {
      const userId = user?.id || profile?.user_id || "user-curr-01";
      const profileData = {
        user_id: userId,
        name: fullName.trim() || profile?.name || "Neighbor",
        username: username.toLowerCase().trim() || profile?.username || "neighbor",
        home_city_id: targetCityId,
        bio: bio.trim() || profile?.bio || "Connecting with my local city on Citylink.",
        privacy: "public" as const,
      };

      const res = await ProfileService.createProfile(profileData);
      if (res.profile) {
        setProfile(res.profile);
      }

      if (matchedCity) {
        setActiveCity(matchedCity);
      }

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("citylink_pending_onboarding");
      }

      router.push("/");
    } catch {
      setError("Failed to save profile. Proceeding to home...");
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Progress Bar */}
        <div className="flex justify-center space-x-2">
          <div className={`h-1.5 w-1/2 rounded-full transition-all ${step === 1 ? "bg-primary" : "bg-gray-200"}`} />
          <div className={`h-1.5 w-1/2 rounded-full transition-all ${step === 2 ? "bg-primary" : "bg-gray-200"}`} />
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Set Up Your Profile</h1>
              <p className="mt-1 text-sm text-gray-500">Tell your neighbors who you are.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  placeholder="e.g. Harsh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Unique Username
                </label>
                <Input
                  id="username"
                  placeholder="e.g. harsh_citylink"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Short Bio (Optional)
                </label>
                <Input
                  id="bio"
                  placeholder="e.g. Passionate about local events and society deals"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              onClick={handleStep1Continue}
              isLoading={isLoading}
              className="w-full bg-primary text-white h-11"
            >
              Continue to Home City
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Select Your Home City</h1>
              <p className="mt-1 text-sm text-gray-500">Your feed and Group Deals will be customized for this city.</p>
            </div>

            <div className="space-y-3">
              {availableCities.map((city) => {
                const isSelected = selectedCityId === city.id || (!selectedCityId && city.slug === "muzaffarpur");
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setSelectedCityId(city.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 text-foreground ring-2 ring-primary/20"
                        : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-foreground">{city.name}</div>
                        <div className="text-xs text-muted-foreground">{city.state}, {city.country || "India"}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-primary fill-primary/10" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-1/3 h-11 border-gray-200"
              >
                Back
              </Button>
              <Button
                onClick={handleCompleteSetup}
                isLoading={isLoading}
                className="w-2/3 bg-primary text-white h-11"
              >
                Complete Setup
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
