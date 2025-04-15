import { NuqsAdapter } from "nuqs/adapters/next";
import type { PropsWithChildren } from "react";
import { TRPCReactProvider } from "./trpc/react";

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <NuqsAdapter>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </NuqsAdapter>
  );
}
