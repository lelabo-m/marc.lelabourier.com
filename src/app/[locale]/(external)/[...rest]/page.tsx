import { notFound } from "next/navigation";

// from https://next-intl.dev/docs/environments/error-files
export default function CatchAllPage() {
  notFound();
}
