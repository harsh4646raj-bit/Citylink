"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthService } from "@/services/auth-service";
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid registered email address.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await AuthService.resetPassword(cleanEmail);
      if (res.success) {
        setIsSubmitted(true);
      } else {
        setError(res.error || "Unable to send password reset instructions. Please try again.");
      }
    } catch {
      setError("A network error occurred. Please check your connection and retry.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            {isSubmitted
              ? "We've sent recovery instructions to your email."
              : "Enter your registered email to receive password reset instructions."}
          </p>
        </div>

        {error && (
          <div className="p-3.5 text-xs sm:text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm text-gray-600">
              If an account exists for <strong className="text-gray-900">{email}</strong>, you will receive an email with a secure link to reset your password.
            </p>
            <div className="space-y-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="w-full h-11 border-gray-200"
              >
                Send to a different email
              </Button>
              <Link href="/login" className="block w-full">
                <Button className="w-full bg-primary text-white h-11 flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Return to Log In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Registered Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-primary text-white h-11 font-bold rounded-xl"
            >
              Send Reset Link
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
