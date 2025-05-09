import * as Sentry from "@sentry/nextjs";
import { env } from "./env";

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: env.NODE_ENV === "production",
  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
