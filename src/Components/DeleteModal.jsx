import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import CardModal from "./CardModal";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import MediumHeading from "./MediumHeading";
import SmallParagraph from "./SmallParagraph";
export default function DeleteModal({deleteData,cancel}) {
  const { darkMode } = useContext(darkModeContext);
  return ReactDOM.createPortal(
    <CardModal>
      <Card
        style={`${darkMode ? "bg-darkBlue" : "bg-white"} space-y-4 w-[90%] `}
      >
        <MediumHeading name={"Confirm Deletion"}></MediumHeading>

        <SmallParagraph
          name={
            "   Are you sure you want to delete invoice id ? this action cannot be undone."
          }
        ></SmallParagraph>
        <div className="w-full flex justify-end">
          <Button onClick={cancel} name={"Cancel"}></Button>
          <Button onClick={deleteData} name={"Delete"}></Button>
        </div>
      </Card>
    </CardModal>,
    document.getElementById("modal")
  );
}
