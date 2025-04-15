"use client";

import { Button } from "@/components/ui/button";

export default function TestPage() {
  const handleDownloadPDF = async (websiteUrl: string) => {
    try {
      const apiUrl = `/api/pdf?url=${encodeURIComponent(websiteUrl)}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "website.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleGenerateJson = async (websiteUrl: string) => {
    try {
      const apiUrl = `/api/scrap-resume?url=${encodeURIComponent(websiteUrl)}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const jsonData = await response.json();
      console.log("Scraped JSON data:", jsonData);
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="bg-yellow-400 text-lg">
      <h1>{"Your PDF Content"}</h1>
      <Button onClick={() => handleDownloadPDF("http://localhost:3000/resume")}>
        {"PDF"}{" "}
      </Button>

      <Button
        onClick={() => handleGenerateJson("https://marc.lelabourier.com/")}
      >
        {"RESUME"}{" "}
      </Button>
    </div>
  );
}
