"use client";

import {
  type CopyToClipboardProps,
  useCopyToClipboard,
} from "@/hooks/use-copy-to-clipboard";
import type { ButtonHTMLAttributes, ClassAttributes, ReactNode } from "react";
import { toast } from "sonner";

export type CopyToClipboardButtonProps = CopyToClipboardProps & {
  text: string;
  children: ((props: { isCopied: boolean }) => ReactNode) | ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  ClassAttributes<HTMLButtonElement>;

export const CopyToClipboardButton = ({
  text,
  timeout,
  children,
  ...props
}: CopyToClipboardButtonProps) => {
  const { isCopied, handleClick } = useCopyToClipboard({
    text,
    timeout,
    onCopy: (text) => {
      console.log("Copied to clipboard", text);
      toast.success("Copied to clipboard");
    },
    onError: (error) => {
      console.error("Failed to copy to clipboard", error);
      toast.error("Failed to copy to clipboard");
    },
  });

  return (
    <button
      onClick={handleClick}
      disabled={isCopied}
      {...props}
      data-copied={isCopied}
    >
      {typeof children === "function" ? children({ isCopied }) : children}
    </button>
  );
};
