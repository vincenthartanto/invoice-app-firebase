import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";

export default function Input({
  name,
  value,
  onChange,
  type,
  onFocus = null,
  onBlur = null,
}) {
  const { darkMode } = useContext(darkModeContext);
  return (
    <input
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className={`${
        darkMode ? "bg-darkBlue text-white border-none" : "bg-white text-black"
      }`}
    ></input>
  );
}
