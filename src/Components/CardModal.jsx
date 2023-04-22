import React from "react";

export default function CardModal({ children }) {
  return (
    <div className="w-screen h-screen bg-black bg-opacity-50 fixed z-20 grid place-items-center">
      {children}
    </div>
  );
}
