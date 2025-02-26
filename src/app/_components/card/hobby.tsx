import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const HobbyCategoryCard = Card;

const HobbyCategoryCardHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <CardHeader>
    <CardTitle className="text-xl font-semibold">{children}</CardTitle>
  </CardHeader>
);

const HobbyCategoryCardContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <CardContent>{children}</CardContent>;
};

export { HobbyCategoryCard, HobbyCategoryCardContent, HobbyCategoryCardHeader };
