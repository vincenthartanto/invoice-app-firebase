import React, { useContext } from "react";
import Status from "./Status";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import SmallHeading from "./SmallHeading";
import SmallParagraph from "./SmallParagraph";
import IconArrowRight from "../assets/icon-arrow-right.svg";
import useWindow from "../Hooks/useWindow";
export default function Invoices({
  name,
  id,
  createdAt,
  total,
  status,
  onClick,
  clientName,
}) {
  const windowSize = useWindow();
  const { darkMode } = useContext(darkModeContext);
  const themeColor = darkMode ? "bg-darkBlue" : "";
  return windowSize.width >= 768 ? (
    <Card
      onClick={onClick}
      style={`grid grid-cols-6 grid place-items-center ${themeColor}`}
    >
      <SmallHeading name={id}></SmallHeading>
      <SmallParagraph name={`Due ${createdAt}`}></SmallParagraph>
      <SmallParagraph name={name}></SmallParagraph>
      <SmallHeading name={`$${total}`}></SmallHeading>
      <Status title={status}></Status>
      <img src={IconArrowRight}></img>
    </Card>
  ) : (
    <Card onClick={onClick} style={`space-y-4 ${themeColor}`}>
      <div className="flex w-full justify-between">
        <SmallHeading name={id}></SmallHeading>
        <SmallParagraph name={name}></SmallParagraph>
      </div>
      <div className="flex justify-between w-full items-center ">
        <div className="space-y-3">
          <SmallParagraph name={`Due ${createdAt}`}></SmallParagraph>
          <SmallHeading name={`$${total}`}></SmallHeading>
        </div>
        <Status title={status}></Status>
      </div>
    </Card>
  );
}
