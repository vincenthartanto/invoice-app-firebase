import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import { darkModeContext } from "../Context/DarkModeContextProvider";
export default function RootLayout() {
  const { darkMode } = useContext(darkModeContext);
  const themeColor = darkMode ? "bg-blackv2" : "bg-lightGrey";
  return (
    <div className={`flex flex-col h-screen`}>
      <Navbar></Navbar>
      <div className={`${themeColor} flex-1`}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
