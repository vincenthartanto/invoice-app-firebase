import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import Input from "./Input";
import LabelInputForm from "./LabelInputForm";

export default function FormSplit({ children }) {
  const { darkMode } = useContext(darkModeContext);
  return (
    <div className="grid  grid-cols-2 gap-2 w-full md:grid-cols-3">
      {children}
    </div>
  );
}
