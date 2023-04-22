import React, { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import Input from "./Input";

export default function LabelInputForm({
  name,
  labelName,
  style,
  value,
  onChange,
  type = "text",
  onFocus,
  onBlur,
}) {
  return (
    <div className={`${style}`}>
      <label htmlFor={name}>{labelName}</label>
      <Input
        onBlur={onBlur}
        onFocus={onFocus}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
      ></Input>
    </div>
  );
}
