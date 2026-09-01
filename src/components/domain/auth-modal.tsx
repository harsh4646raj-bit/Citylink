"use client";

import * as React from "react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { ShieldCheck, LogIn, UserPlus, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  defaultMode?: "login" | "signup";
}

export function AuthModal({
  open,
  onOpenChange,
  title = "Join the Citylink Community",
  description = "Log in or sign up to participate in Group Deals, join local communities, and connect with verified neighbors.",
  defaultMode = "login",
}: AuthModalProps) {
  const router = useRouter();
  const { signIn, signUp, isLoading } = useAuth();

  const [mode, setMode] = React.useState<"login" | "signup">(defaultMode);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "login") {
      const res = await signIn(email, password);
      if (res.success) {
        onOpenChange(false);
      } else {
        setError(res.error || "Invalid credentials.");
      }
    } else {
      const res = await signUp(email, password);
      if (res.success) {
        onOpenChange(false);
        router.push("/onboarding");
      } else {
        setError(res.error || "Signup failed.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2.5 text-primary font-extrabold mb-1">
          <div className="h-9 w-9 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <DialogTitle>{title}</DialogTitle>
        </div>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        {/* Toggle Mode */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-muted/70 rounded-2xl text-xs font-bold border border-border/40">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
            className={`py-2 rounded-xl transition-all duration-150 ${
              mode === "login" ? "bg-background text-foreground shadow-2xs font-extrabold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
            className={`py-2 rounded-xl transition-all duration-150 ${
              mode === "signup" ? "bg-background text-foreground shadow-2xs font-extrabold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="space-y-1.5">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={mode === "signup" ? "Minimum 8 characters" : undefined}
            required
          />
          {mode === "login" && (
            <div className="text-right">
              <Link
                href="/forgot-password"
                onClick={() => onOpenChange(false)}
                className="text-xs text-primary hover:underline font-bold"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          variant="default"
          className="w-full h-11 font-bold rounded-2xl shadow-xs"
        >
          {mode === "login" ? (
            <>
              <LogIn className="h-4 w-4 mr-1.5" /> Log In
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-1.5" /> Continue to Profile Setup
            </>
          )}
        </Button>
      </form>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl w-full sm:w-auto font-semibold">
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
