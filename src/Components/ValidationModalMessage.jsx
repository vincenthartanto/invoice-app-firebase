import React, { useContext } from "react";
import CardModal from "./CardModal";
import Card from "./Card";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import MediumHeading from "./MediumHeading";
import SmallParagraph from "./SmallParagraph";
import Button from "./Button";
import ReactDOM from "react-dom";
export default function ValidationModalMessage({ changeToggle, msg, title }) {
  const { darkMode } = useContext(darkModeContext);
  return ReactDOM.createPortal(
    <CardModal>
      <Card
        style={`${darkMode ? "bg-darkBlue" : "bg-white"} space-y-4 w-[90%] `}
      >
        <MediumHeading name={title}></MediumHeading>

        <SmallParagraph name={msg}></SmallParagraph>
        <div className="w-full flex justify-end">
          <Button onClick={changeToggle} name={"Ok"}></Button>
        </div>
      </Card>
    </CardModal>,
    document.getElementById("modal")
  );
}
