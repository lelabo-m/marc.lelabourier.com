"use client";

import HomePageLayout from "@/components/layout/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { z } from "zod";
import { useTRPC } from "~/trpc/utils";
import {
  curriculumVitaeSchema,
  type CurriculumVitaeSchema,
} from "~/schema/curriculum";

import { type Dispatch, type SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { parseAsJson, parseAsString, useQueryState } from "nuqs";
import { getBaseUrl } from "@/lib/utils";
import { env } from "process";
import { InternalLink } from "@/components/ui/link";
import { Loader2 } from "lucide-react";

function downloadBlobOnClient(blob: Blob) {
  const fileURL = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = fileURL;
  link.download = "document.pdf"; // specify the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(fileURL);
}

export default function ResumeGenerator() {
  const [curriculum, setCurriculum] = useQueryState(
    "curriculum",
    // eslint-disable-next-line @typescript-eslint/unbound-method
    parseAsJson(curriculumVitaeSchema.parse),
  );
  console.log("🚀 ~ ResumeGenerator ~ curriculum:", curriculum);

  const [scrapUrl, setScrapeUrl] = useQueryState("url", parseAsString);

  const handleReset = () => {
    void setCurriculum(null);
    void setScrapeUrl(null);
  };

  return (
    <HomePageLayout>
      {!curriculum ? (
        <InitialForm setData={setCurriculum} setUrl={setScrapeUrl} />
      ) : (
        <ScrapedContentEditor
          url={scrapUrl}
          data={curriculum}
          setData={setCurriculum}
          reset={handleReset}
        />
      )}
    </HomePageLayout>
  );
}

interface InitialFormProps {
  setUrl: Dispatch<SetStateAction<string | null>>;
  setData: Dispatch<SetStateAction<CurriculumVitaeSchema | null>>;
}

const InitialForm = ({ setUrl, setData }: InitialFormProps) => {
  const trpc = useTRPC();
  const t = useTranslations();

  const schema = z.object({
    url: z.string().url(),
  });

  const scrapePdfData = useMutation(
    trpc.cv.scrapePdfData.mutationOptions({
      onSuccess: (data) => {
        setData(data);
      },
    }),
  );

  const form = useForm({
    defaultValues: {
      url: "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      setUrl(value.url);
      scrapePdfData.mutate({
        url: value.url,
      });
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <TypographyH1>{t("cv-gen.title")}</TypographyH1>
        <TypographyLead>{t("cv-gen.lead")}</TypographyLead>
      </div>
      <div className="w-full p-16">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await form.handleSubmit();
          }}
          className="m-auto w-full max-w-md"
        >
          <div className="flex items-center space-x-2">
            <form.Field
              name="url"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <Input
                  type="url"
                  placeholder="https://yourwebsite.com/profile"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
            <Button type="submit">
              {scrapePdfData.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                t("cv-gen.cta")
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ScrapedContentEditorProps {
  url: string | null;
  data: CurriculumVitaeSchema;
  setData: Dispatch<SetStateAction<CurriculumVitaeSchema | null>>;
  reset: () => void;
}

const ScrapedContentEditor = ({
  url,
  data,
  setData,
  reset,
}: ScrapedContentEditorProps) => {
  const trpc = useTRPC();
  const t = useTranslations("cv-gen");
  const generatePdf = useMutation(
    trpc.cv.generatePdf.mutationOptions({
      onSuccess: (data) => {
        const blob = new Blob([data], { type: "application/pdf" });
        downloadBlobOnClient(blob);
      },
    }),
  );

  const [editorContent, setEditorContent] = useState(
    JSON.stringify(data, null, 2),
  );
  const locale = useLocale();

  const searchParams = `/cv-template?url=${encodeURIComponent(url ?? "")}&data=${encodeURIComponent(JSON.stringify(data))}`;

  const baseUrl =
    env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? `${getBaseUrl()}/${locale}`
      : `/${locale}`;

  const iframeUrl = `${baseUrl}${searchParams}`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex flex-col space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("editor-title")}</CardTitle>
            <CardDescription>{t("editor-description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your resume data in JSON format"
              className="max-h-100 overflow-y-scroll font-mono text-sm"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={reset}>
              {t("editor-btn-start-over")}
            </Button>
            <Button
              onClick={() =>
                setData(curriculumVitaeSchema.parse(editorContent))
              }
            >
              {t("editor-btn-apply")}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col space-y-4">
        <Card>
          <div className="h-116 w-full overflow-hidden">
            <iframe
              src={iframeUrl}
              className="h-2/1 w-2/1 origin-[0_0] scale-50 border-0"
              title="Resume Preview"
            />
          </div>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <InternalLink href={searchParams}>
                {t("editor-btn-full-screen")}
              </InternalLink>
            </Button>

            <Button
              onClick={() =>
                generatePdf.mutate({
                  url: `${getBaseUrl()}/${locale}/${searchParams}`,
                })
              }
            >
              {t("editor-btn-download")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
