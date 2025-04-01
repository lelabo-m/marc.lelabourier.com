/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { type SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPlausibleProxy } from "next-plausible";
import "./src/env.js";

const withNextIntl = createNextIntlPlugin("./src/app/_lib/i18n/request.ts");

// Make sure adding Sentry options is the last code to run before exporting
const sentryConfig: SentryBuildOptions = {
  org: "snacs",
  project: "javascript-nextjs",
  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
};

const config: NextConfig = {};

export default withSentryConfig(
  withPlausibleProxy()(withNextIntl(config)),
  sentryConfig,
);
