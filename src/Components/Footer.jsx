import React, { useContext } from "react";
import Button from "./Button";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import useWindow from "../Hooks/useWindow";
export default function Footer({ children, style }) {
  const { darkMode } = useContext(darkModeContext);
  const windowSize = useWindow();
  return (
    <footer
      className={` ${windowSize.width >= 768 ? "" : "shadow-md "}${
        darkMode
          ? "bg-darkBlue md:bg-transparent"
          : "bg-white md:bg-transparent"
      } p-4 space-x-4 flex items-center  ${style}`}
    >
      {children}
    </footer>
  );
}
