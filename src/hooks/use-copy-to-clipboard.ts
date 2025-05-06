"use client";

import { useCallback, useState } from "react";

export interface CopyToClipboardProps {
  text: string;
  timeout?: number;
  onCopy?: (text: string) => void;
  onError?: (error: unknown) => void;
}

export const useCopyToClipboard = ({
  text,
  timeout = 2000,
  onCopy,
  onError,
}: CopyToClipboardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      onCopy?.(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
    } catch (err) {
      onError?.(err);
    }
  }, [text, timeout, onCopy, onError]);

  return {
    isCopied,
    handleClick,
  };
};
