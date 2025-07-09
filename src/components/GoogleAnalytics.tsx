"use client";

import { GoogleAnalytics as GA } from "@next/third-parties/google";
import { useEffect } from "react";

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!gaId) {
      console.warn("Google Analytics measurement ID is not configured");
      return;
    }

    if (typeof window !== "undefined" && window.gtag) {
      // Configure GA4 for better privacy
      window.gtag("config", gaId, {
        anonymize_ip: true,
        cookie_flags: "SameSite=None;Secure",
      });
    }
  }, [gaId]);

  if (!gaId) {
    return null;
  }

  return <GA gaId={gaId} />;
}

// Event tracking utilities
export const trackEvent = (
  eventName: string,
  eventCategory: string,
  eventLabel?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: value,
    });
  }
};

// Specific tracking functions for the apartment showcase
export const trackFormSubmission = (apartmentType: string) => {
  trackEvent("form_submit", "contact", apartmentType);
};

export const trackApartmentInterest = (apartmentType: string) => {
  trackEvent("apartment_interest", "engagement", apartmentType);
};

export const trackImageView = (imageTitle: string, apartmentType: string) => {
  trackEvent("image_view", "engagement", `${apartmentType}_${imageTitle}`);
};

export const trackFloorPlanDownload = (apartmentType: string) => {
  trackEvent("floor_plan_download", "engagement", apartmentType);
};

export const trackContactClick = (contactType: "phone" | "email") => {
  trackEvent("contact_click", "engagement", contactType);
};

// Global gtag types
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}