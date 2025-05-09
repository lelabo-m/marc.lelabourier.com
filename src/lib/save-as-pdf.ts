import puppeteer, { type Browser, type Page } from "puppeteer";

export const saveAsPdf = async (url: string) => {
  const browser: Browser = await puppeteer.launch();
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
