"use client";
import { ButtonHTMLAttributes, ClassAttributes } from "react";

export type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ClassAttributes<HTMLButtonElement>;

export const BackButton = ({
  onClick,
  children,
  ...props
}: BackButtonProps) => {
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        window.history.back();
      }}
      {...props}
    >
      {children}
    </button>
  );
};
