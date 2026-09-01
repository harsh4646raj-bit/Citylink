"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { ProfileService } from "@/services/profile-service";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, setProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.username.trim() || formData.username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signUp(formData.email, formData.password, {
        full_name: formData.fullName.trim(),
        username: formData.username.toLowerCase().trim(),
      });
      if (!res.success) {
        setError(res.error || "Signup failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Create initial profile record for user
      if (res.user?.id) {
        const profileRes = await ProfileService.createProfile({
          user_id: res.user.id,
          name: formData.fullName.trim(),
          username: formData.username.toLowerCase().trim(),
        });
        if (profileRes.profile) {
          setProfile(profileRes.profile);
        }
      }

      // Save name/username in session for seamless onboarding continuation
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "citylink_pending_onboarding",
          JSON.stringify({
            fullName: formData.fullName.trim(),
            username: formData.username.toLowerCase().trim(),
          })
        );
      }

      router.push("/onboarding");
    } catch {
      setError("An unexpected error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Citylink</h1>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">Join Citylink</h2>
          <p className="mt-2 text-sm text-gray-500">Create an account to connect with your local city.</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              id="fullName"
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              id="username"
              placeholder="e.g. rahul_sharma"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit" isLoading={isLoading} className="w-full bg-primary text-white h-11 mt-6">
            Continue to Profile Setup
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
