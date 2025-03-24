"use client";
import { createContext, ReactNode, use } from "react";

type ConditionContextProps = {
  condition: boolean;
};

const ConditionContext = createContext<ConditionContextProps | null>(null);

const useConditionContext = () => {
  const context = use(ConditionContext);
  if (!context) {
    throw new Error(
      "useConditionContext must be used within an Condition component",
    );
  }
  return context;
};

const Condition = ({ on, children }: { on: boolean; children: ReactNode }) => {
  return (
    <ConditionContext value={{ condition: on }}>{children}</ConditionContext>
  );
};

const ConditionTrue = ({ children }: { children: ReactNode }) => {
  const { condition } = useConditionContext();
  return condition ? children : null;
};

const ConditionFalse = ({ children }: { children: ReactNode }) => {
  const { condition } = useConditionContext();
  return condition ? null : children;
};

Condition.True = ConditionTrue;
Condition.False = ConditionFalse;

export { Condition };
