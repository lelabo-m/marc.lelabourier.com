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
import {
  createLoader,
  createParser,
  parseAsJson,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { getBaseUrl } from "@/lib/utils";
import { env } from "process";

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

function parseAsJsonUrlEncoded<T>(runtimeParser: (value: unknown) => T) {
  return createParser({
    parse: (query) => {
      try {
        const obj = JSON.parse(decodeURIComponent(query));
        return runtimeParser(obj);
      } catch (error) {
        console.log("Error parsing content:", error);
        return null;
      }
    },
    serialize: (value) => encodeURIComponent(JSON.stringify(value)),
    eq(a, b) {
      // Check for referential equality first
      return a === b || JSON.stringify(a) === JSON.stringify(b);
    },
  });
}

export default function ResumeGenerator() {
  const [curriculum, setCurriculum] = useQueryState(
    "curriculum",
    parseAsJsonUrlEncoded(curriculumVitaeSchema.parse),
  );
  const [scrapUrl, setScrapeUrl] = useQueryState("url", parseAsString);

  const handleReset = () => {
    setCurriculum(null);
    setScrapeUrl(null);
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
  const t = useTranslations("cv-gen");

  const schema = z.object({
    url: z.string().url(),
  });

  const scrapePdfData = useMutation(
    trpc.cv.scrapePdfData.mutationOptions({
      onSuccess: (data) => {
        setData(data.curriculum);
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
        <TypographyH1>{t("title")}</TypographyH1>
        <TypographyLead>
          {
            "Enter the URL of your profile page to generate a professional resume"
          }
        </TypographyLead>
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
            <Button type="submit">{t("cta")}</Button>
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
  const [editorContent, setEditorContent] = useState(
    JSON.stringify(data, null, 2),
  );
  const locale = useLocale();

  const baseUrl =
    env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? `${getBaseUrl()}/${locale}`
      : `/${locale}`;
  const iframeUrl = `${baseUrl}/cv-template?url=${encodeURIComponent(url ?? "")}&data=${encodeURIComponent(JSON.stringify(data))}`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex flex-col space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{"Resume Data (JSON)"}</CardTitle>
            <CardDescription>
              {"Edit the JSON data to customize your resume"}
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Textarea
              placeholder="Enter your resume data in JSON format"
              className="max-h-100 overflow-y-scroll font-mono text-sm"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={reset}>
              {"Start Over"}
            </Button>
            <Button
              onClick={() =>
                setData(curriculumVitaeSchema.parse(editorContent))
              }
            >
              {"Apply Changes"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="h-140 w-100 overflow-hidden rounded-lg bg-white shadow-lg">
        <iframe
          src={iframeUrl}
          className="h-2/1 w-2/1 origin-[0_0] scale-50 border-0"
          title="Resume Preview"
        />
      </div>
    </div>
  );
};
