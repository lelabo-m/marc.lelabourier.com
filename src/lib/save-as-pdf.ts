import { type Browser, type Page } from "puppeteer";
import { getPuppeterBrowser } from "./puppeter";

export const saveAsPdf = async (url: string) => {
  const browser: Browser = await getPuppeterBrowser();
  const page: Page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  const result = await page.pdf({
    format: "a4",
    printBackground: true,
  });

  await browser.close();

  return result;
};
