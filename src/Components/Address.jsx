import React from "react";
import SmallParagraph from "./SmallParagraph";

export default function Address({ street, city, postalCode, country }) {
  return (
    <div className="space-y-2">
      <SmallParagraph name={street}></SmallParagraph>
      <SmallParagraph name={city}></SmallParagraph>
      <SmallParagraph name={postalCode}></SmallParagraph>
      <SmallParagraph name={country}></SmallParagraph>
    </div>
  );
}
