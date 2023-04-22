import React from "react";
import SmallHeading from "./SmallHeading";
import MediumParagraph from "./MediumParagraph";

export default function PaymentTitleAndDescription({
  title,
  description,
  children,
}) {
  return (
    <div className="space-y-2">
      <MediumParagraph name={title}></MediumParagraph>
      <SmallHeading name={description}></SmallHeading>
      {children}
    </div>
  );
}
