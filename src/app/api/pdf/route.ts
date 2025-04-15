import { type NextRequest } from "next/server";
import puppeteer, { type Browser, type Page } from "puppeteer";

const saveAsPdf = async (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const browser: Browser = await puppeteer.launch();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const page: Page = await browser.newPage();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const result = await page.pdf({
    format: "a4",
    printBackground: true,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await browser.close();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return new Response("URL parameter is missing", { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const pdf = await saveAsPdf(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Disposition": `attachment; filename="file.pdf"`,
      "Content-Type": "application/pdf",
    },
  });
}
