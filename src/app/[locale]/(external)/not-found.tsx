import { AppSkeleton } from "@/components/layout/app";
import { PageNotFound } from "@/components/layout/not-found";

export default NotFoundLayout;

export async function NotFoundLayout() {
  return (
    <AppSkeleton>
      <PageNotFound />
    </AppSkeleton>
  );
}
