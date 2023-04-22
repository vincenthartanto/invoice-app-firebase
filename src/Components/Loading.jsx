import React from "react";
import LoadingIcon from "../assets/processing.gif";
export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-white">
      <img className="h-auto w-44 mx-auto" src={LoadingIcon}></img>
      <p>Loading...</p>
    </div>
  );
}
