import React from "react";
import Logo from "../assets/logo.svg";
import MoonLogo from "../assets/icon-moon.svg";
import Avatar from "../assets/image-avatar.jpg";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import { useContext } from "react";
import SunLogo from "../assets/icon-sun.svg";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { AuthSliceActions } from "../Store/AuthSlice";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { darkMode, setDarkMode } = useContext(darkModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav
      className={`w-full flex items-center justify-between ${
        darkMode ? "bg-darkBlue" : "bg-darkGrey"
      }`}
    >
      <div className="w-[4.5rem] h-[4.5rem] bg-gradient-to-b  grid place-items-center relative rounded-r-3xl bg-darkPurple ">
        <img
          className="w-[1.75rem] h-[1.625rem] relative z-10"
          src={Logo}
        ></img>
        <div className="bottom-0 absolute w-full h-[50%] bg-lightPurple -z-5 rounded-tl-3xl rounded-br-3xl"></div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            if (!darkMode) {
              setDarkMode(true);
            } else {
              setDarkMode(false);
            }
          }}
        >
          {" "}
          <img
            className="w-[1.75rem] h-[1.625rem] relative z-10"
            src={darkMode ? SunLogo : MoonLogo}
          ></img>
        </button>

        <div className="border-l border-grey p-4">
          <img className="rounded-full h-[2rem] w-[2rem]" src={Avatar}></img>
        </div>
        <Button
          name={"Logout"}
          onClick={() => {
            const auth = getAuth();
            signOut(auth)
              .then(() => {
                dispatch(AuthSliceActions.logout());
                navigate("login");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        ></Button>
      </div>
    </nav>
  );
}
