import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";

export default function Button({ name, onClick, style }) {
  const { darkMode } = useContext(darkModeContext);
  let buttonStyle;
  if (name === "Edit" || name === "Cancel" || name === "Discard") {
    buttonStyle = `${
      darkMode ? "bg-blue text-white" : "bg-lightWhite text-grey"
    }  hover:bg-darkWhite hover:font-bold  w-[6rem]`;
  } else if (name === "+ Add New Item") {
    buttonStyle = `${
      darkMode ? "bg-blue" : "bg-lightWhite"
    } text-grey hover:bg-darkWhite hover:font-bold w-full`;
  } else if (name === "Delete") {
    buttonStyle = "bg-red text-white font-bold hover:opacity-50  w-[6rem]";
  } else if (name === "Save as Draft") {
    buttonStyle = "bg-darkGrey text-white hover:bg-black  w-[12rem]";
  } else if (name === "Logout") {
    buttonStyle = "bg-orange text-white font-bold hover:opacity-50  w-[6rem]";
  } else {
    buttonStyle = "bg-darkPurple hover:bg-lightPurple text-white ";
  }
  return (
    <button
      onClick={onClick}
      className={`${buttonStyle} space-x-2 p-4 rounded-full flex items-center justify-center ${style}`}
    >
      {(name === "New" || name === "New Invoice") && (
        <div className="font-bold bg-white text-darkPurple rounded-full w-8 h-8 grid place-items-center">
          <p className="text-2xl">+</p>
        </div>
      )}

      <p>{name}</p>
    </button>
  );
}
