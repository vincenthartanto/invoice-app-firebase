import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";

export default function SmallHeading({ name }) {
  const { darkMode } = useContext(darkModeContext);
  return <h3 className={`${darkMode ? "text-purple" : ""}`}>{name}</h3>;
}
