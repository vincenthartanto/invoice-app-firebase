import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";

export default function Wrapper({ children, style, onClick }) {
  const { darkMode } = useContext(darkModeContext);
  return (
    <div
      onClick={onClick}
      className={`p-6 space-y-4  ${style} ${
        darkMode ? "bg-blackv2 text-white" : "bg-white md:bg-lightGrey "
      }  `}
    >
      {children}
    </div>
  );
}
