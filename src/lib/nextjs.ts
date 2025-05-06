import { headers } from "next/headers";

export interface NextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export async function getNonce() {
  const nonce = (await headers()).get("x-nonce");
  if (!nonce) {
    throw new Error("Nonce not found");
  }
  return nonce;
}
