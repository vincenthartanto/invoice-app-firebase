import React from "react";
import { useNavigate } from "react-router-dom";
import IconArrowLeft from "../assets/icon-arrow-left.svg";
export default function GoBackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("..");
      }}
      className="flex items-center space-x-4"
    >
      <img src={IconArrowLeft}></img>
      <p className="font-bold">Go back</p>
    </button>
  );
}
