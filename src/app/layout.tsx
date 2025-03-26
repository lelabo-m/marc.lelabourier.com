import { PropsWithChildren } from "react";
import "~/styles/app.css";

export default async function RootLayout({ children }: PropsWithChildren) {
  return children;
}
