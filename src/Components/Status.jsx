import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";

export default function Status({ title }) {
  const { darkMode } = useContext(darkModeContext);
  let boxStyle;
  let circleStyle;
  let statusName;
  if (title.toLowerCase() === "paid") {
    statusName = "Paid";
    boxStyle = "bg-green text-green ";
    circleStyle = "bg-green";
  } else if (title.toLowerCase() === "pending") {
    statusName = "Pending";
    boxStyle = "bg-orange text-orange";
    circleStyle = "bg-orange";
  } else {
    statusName = "Draft";
    boxStyle = `${
      darkMode ? "bg-lightWhite text-white" : "bg-blackv2 text-black"
    }`;
    circleStyle = boxStyle;
  }
  return (
    <div
      className={`${boxStyle} bg-opacity-20 font-bold w-[6.5rem] h-[2.5rem] flex items-center justify-center space-x-4`}
    >
      <div className={`${circleStyle} w-2 h-2 rounded-full`}></div>
      <p>{statusName}</p>
    </div>
  );
}
