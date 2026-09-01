import * as React from "react";
import { notFound } from "next/navigation";
import { CityService } from "@/services/city-service";
import { CityLandingView } from "@/components/domain/city-landing-view";
import { MOCK_CITIES } from "@/constants/mock-data";
import { Metadata } from "next";

export async function generateStaticParams() {
  return MOCK_CITIES.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const city = await CityService.getCityBySlug(params.slug);
  if (!city) {
    return {
      title: "City Not Found - Citylink",
    };
  }

  return {
    title: `${city.name} City Hub - Citylink`,
    description: `Explore local communities, Group Deals, and verified local businesses in ${city.name}, ${city.state}.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: { slug: string };
}) {
  const city = await CityService.getCityBySlug(params.slug);

  if (!city) {
    notFound();
  }

  return <CityLandingView city={city} />;
}
