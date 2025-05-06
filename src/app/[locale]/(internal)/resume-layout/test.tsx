"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/utils";

export const ClientTest = ({ url }: { url: string }) => {
  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(
    trpc.resume.scrap.queryOptions({
      url,
    }),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>No data</div>;
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
