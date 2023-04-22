import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";

export default function MediumHeading({ name }) {
  const { darkMode } = useContext(darkModeContext);
  return (
    <h2 className={`${darkMode ? "text-white" : "text-black"}`}>{name}</h2>
  );
}
