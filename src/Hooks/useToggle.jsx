import React from "react";
import { useState } from "react";
export default function useToggle() {
  const [isToggle, setIsToggle] = useState(false);
  function changeToggle() {
    setIsToggle((tg) => !tg);
  }
  return { isToggle, changeToggle };
}
