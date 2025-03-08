import { ReactNode } from "react";

const ConditionalRender = ({
  condition,
  onTrue,
  onFalse,
}: {
  condition: boolean;
  onTrue: ReactNode;
  onFalse: ReactNode;
}) => {
  return condition ? onTrue : onFalse;
};

export { ConditionalRender };
