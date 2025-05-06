"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useTRPC } from "~/trpc/utils";

export default function ResumeGenerator() {
  const trpc = useTRPC();
  const generatePdfMutation = useMutation(
    trpc.resume.generatePdf.mutationOptions({
      onSuccess: (data) => {
        const blob = new Blob([data], { type: "application/pdf" });

        const fileURL = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = fileURL;
        link.download = "document.pdf"; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(fileURL);
      },
    }),
  );

  const schema = z.object({
    url: z.string().url(),
  });

  const form = useForm({
    defaultValues: {
      url: "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      generatePdfMutation.mutate({
        url: value.url,
      });
    },
  });
  return (
    <div>
      PDF Generator
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <h1>URL</h1>
        <form.Field
          name="url"
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
        <Button type="submit">Generate PDF</Button>
      </form>
    </div>
  );
}
