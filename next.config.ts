/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { type SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPlausibleProxy } from "next-plausible";
import { env } from "~/env";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

// Make sure adding Sentry options is the last code to run before exporting
const sentryConfig: SentryBuildOptions = {
  org: "snacs",
  project: "marc-lelabourier-com",
  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
  // Pass the auth token
  authToken: env.SENTRY_AUTH_TOKEN,
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-side errors will fail.
  tunnelRoute: "/monitoring",
};

const config: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        locale: false,
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
      {
        source: "/cv-template",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

const withConf = withSentryConfig(
  withPlausibleProxy()(withNextIntl(config)),
  sentryConfig,
);

export default withConf;
