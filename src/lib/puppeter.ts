import chromium from "@sparticuz/chromium-min";
import puppeteer, { type Browser } from "puppeteer";
import puppeteerCore from "puppeteer-core";
import { env } from "~/env";

export const remoteExecutablePath =
  "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";

export const getPuppeterBrowser = async () => {
  if (env.NODE_ENV === "development") {
    return await puppeteer.launch({});
  }
  return (await puppeteerCore.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(remoteExecutablePath),
    headless: true,
  })) as unknown as Browser;
};
