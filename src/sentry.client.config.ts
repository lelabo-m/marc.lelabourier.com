import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a2286fa263f02640c608f8d95fb50af9@o4509079743365120.ingest.de.sentry.io/4509079752343632",

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
