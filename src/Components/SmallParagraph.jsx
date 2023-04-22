import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";

export default function SmallParagraph({ name }) {
  const { darkMode } = useContext(darkModeContext);
  return (
    <p className={`paragraph-small ${darkMode ? "text-white" : ""}`}>{name}</p>
  );
}
