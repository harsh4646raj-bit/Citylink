import * as React from "react";
import { notFound } from "next/navigation";
import { ProfileService } from "@/services/profile-service";
import { PublicProfileView } from "@/components/domain/public-profile-view";
import { Metadata } from "next";

export async function generateStaticParams() {
  return [
    { username: "harsh_citylink" },
    { username: "rohan_v" },
    { username: "private_user" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const profile = await ProfileService.getProfileByUsername(params.username);
  if (!profile) {
    return {
      title: "User Not Found - Citylink",
    };
  }

  const displayName = profile.full_name || profile.name;
  return {
    title: `${displayName} (@${profile.username}) - Citylink Profile`,
    description: profile.bio || `View ${displayName}'s profile and community activity on Citylink.`,
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const profile = await ProfileService.getProfileByUsername(params.username);

  if (!profile) {
    notFound();
  }

  return <PublicProfileView profile={profile} />;
}
