import { profile } from "@/data/profile";
import { Metadata, Viewport } from "next";

export const defaultMetadata: Metadata = {
  title: `${profile.name} | ${profile.jobTitle}`,
  description:
    "Marc Le Labourier own little space online. Maybe one day, a more complete description will be written. But for now, deal with it.",

  icons: {
    icon: [
      { url: "/favicon/icon.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  appleWebApp: {
    title: `${profile.name} | ${profile.jobTitle}`,
  },
};

export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
