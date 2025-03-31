/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import createNextIntlPlugin from "next-intl/plugin";
import { withPlausibleProxy } from "next-plausible";
import "./src/env.js";

const withNextIntl = createNextIntlPlugin("./src/app/_lib/i18n/request.ts");

/** @type {import("next").NextConfig} */
const config = {};

export default withPlausibleProxy()(withNextIntl(config));
