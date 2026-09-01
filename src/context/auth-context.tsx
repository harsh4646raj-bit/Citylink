"use client";

import * as React from "react";
import { Profile } from "@/types/database";
import { AuthService, AuthResponse, SignUpOptions } from "@/services/auth-service";
import { ProfileService } from "@/services/profile-service";
import { CURRENT_MOCK_USER } from "@/constants/mock-data";
import { createClient } from "@/lib/supabase/client";

export interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, metadata?: SignUpOptions) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setProfile: (profile: Profile | null) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser = null,
  initialProfile = null,
}: {
  children: React.ReactNode;
  initialUser?: AuthUser | null;
  initialProfile?: Profile | null;
}) {
  const [user, setUser] = React.useState<AuthUser | null>(initialUser || { id: CURRENT_MOCK_USER.id, email: "harsh@citylink.in" });
  const [profile, setProfileState] = React.useState<Profile | null>(initialProfile || (CURRENT_MOCK_USER as unknown as Profile));
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Initialize and listen to Supabase auth state changes in browser
  React.useEffect(() => {
    if (
      typeof window === "undefined" ||
      process.env.NODE_ENV === "test" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
    ) {
      return;
    }

    const supabase = createClient();

    const fetchSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const authUser = { id: session.user.id, email: session.user.email || "" };
          setUser(authUser);
          const userProfile = await ProfileService.getProfile(session.user.id);
          setProfileState(userProfile);
        } else {
          setUser(null);
          setProfileState(null);
        }
      } catch {
        // Fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authUser = { id: session.user.id, email: session.user.email || "" };
        setUser(authUser);
        const userProfile = await ProfileService.getProfile(session.user.id);
        setProfileState(userProfile);
      } else {
        setUser(null);
        setProfileState(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = React.useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await AuthService.signIn(email, password);
      if (res.success && res.user) {
        setUser(res.user);
        const p = await ProfileService.getProfile(res.user.id);
        setProfileState(p);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = React.useCallback(
    async (
      email: string,
      password: string,
      metadata?: SignUpOptions
    ): Promise<AuthResponse> => {
      setIsLoading(true);
      try {
        const res = await AuthService.signUp(email, password, metadata);
        if (res.success && res.user) {
          setUser(res.user);
          if (metadata?.name || metadata?.full_name || metadata?.username) {
            const profileRes = await ProfileService.createProfile({
              user_id: res.user.id,
              name: metadata.full_name || metadata.name || "Neighbor",
              username: metadata.username || "neighbor",
              home_city_id: metadata.home_city_id,
            });
            if (profileRes.profile) {
              setProfileState(profileRes.profile);
            }
          }
        }
        return res;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signOut = React.useCallback(async () => {
    setIsLoading(true);
    try {
      await AuthService.signOut();
      setUser(null);
      setProfileState(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = React.useCallback(async () => {
    if (user?.id) {
      const p = await ProfileService.getProfile(user.id);
      setProfileState(p);
    }
  }, [user?.id]);

  const setProfile = React.useCallback((newProfile: Profile | null) => {
    setProfileState(newProfile);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      profile,
      isLoading,
      isAuthenticated: Boolean(user),
      signIn,
      signUp,
      signOut,
      refreshProfile,
      setProfile,
    }),
    [user, profile, isLoading, signIn, signUp, signOut, refreshProfile, setProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useOptionalAuth() {
  return React.useContext(AuthContext);
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
