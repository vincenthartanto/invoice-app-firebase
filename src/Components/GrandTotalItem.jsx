import React, { useContext } from "react";
import Card from "./Card";
import { darkModeContext } from "../Context/DarkModeContextProvider";
export default function GrandTotalItem({ total }) {
  const { darkMode } = useContext(darkModeContext);
  const themeColor = darkMode ? "bg-black text-white" : "text-black";
  return (
    <Card style={`flex rounded-t-none justify-between ${themeColor}`}>
      <p className="">Amount Due</p>
      <h2 className="">${total}</h2>
    </Card>
  );
}
