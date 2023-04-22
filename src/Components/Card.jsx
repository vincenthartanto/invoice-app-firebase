import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";

export default function Card({
  children,
  style,
  onClick,
  billingMode = false,
}) {
  const { darkMode } = useContext(darkModeContext);

  return (
    <div
      onClick={onClick}
      className={` px-6 py-8  rounded-xl shadow-md  ${style}`}
    >
      {children}
    </div>
  );
}
