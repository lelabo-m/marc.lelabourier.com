"use client";

import HomePageLayout from "@/components/layout/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH1 } from "@/components/ui/typography";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useTRPC } from "~/trpc/utils";
import { useLocale } from "next-intl";

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

const schema = z.object({
  url: z.string().url(),
});

export default function ResumeGenerator() {
  const locale = useLocale();
  const t = useTranslations("cv-gen");

  const trpc = useTRPC();

  const generatePdfMutation = useMutation(
    trpc.cv.generatePdf.mutationOptions({
      onSuccess: (data) => {
        const blob = new Blob([data], { type: "application/pdf" });
        downloadBlobOnClient(blob);
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
      generatePdfMutation.mutate({
        locale,
        url: value.url,
      });
    },
  });

  return (
    <HomePageLayout>
      <div className="space-y-6">
        <TypographyH1>{t("title")}</TypographyH1>
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
                    placeholder="https://..."
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
    </HomePageLayout>
  );
}
