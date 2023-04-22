import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";

export default function MediumParagraph({ name }) {
  const { darkMode } = useContext(darkModeContext);
  return (
    <p
      className={`paragraph-medium  ${
        darkMode ? "text-purple" : "text-textGrey"
      }`}
    >
      {name}
    </p>
  );
}
