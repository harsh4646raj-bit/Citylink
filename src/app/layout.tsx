import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { CityProvider } from "@/context/city-context";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "Citylink - City-Based Social Opportunity Platform",
  description:
    "Discover what is happening in your city, join communities, connect with local businesses, and unlock Group Deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/20">
        <ErrorBoundary>
          <CityProvider>
            <AuthProvider>
              <AppShell>{children}</AppShell>
            </AuthProvider>
          </CityProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
