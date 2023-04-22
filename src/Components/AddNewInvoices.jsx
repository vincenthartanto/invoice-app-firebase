import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import SmallParagraph from "./SmallParagraph";
import MediumHeading from "./MediumHeading";
import useWindow from "../Hooks/useWindow";
import IconArrowDown from "../assets/icon-arrow-down.svg";
export default function AddNewInvoices({
  changeToggle,
  onChangeFilter,
  filter,
  totalInvoices,
}) {
  const navigate = useNavigate();
  const { darkMode } = useContext(darkModeContext);
  const windowSize = useWindow();
  return (
    <header className="flex w-full justify-between items-center ">
      <div className="flex flex-col">
        <MediumHeading name={"Invoices"}></MediumHeading>
        <SmallParagraph name={`${totalInvoices} Invoices`}></SmallParagraph>
      </div>
      <div
        className={`flex font-bold items-center space-x-2 ${
          darkMode ? "bg-blackv2" : ""
        }`}
      >
        <select
          onChange={onChangeFilter}
          value={filter}
          style={{ backgroundImage: `url(${IconArrowDown})` }}
          className={`${
            darkMode ? "bg-darkBlue border-none" : "bg-white "
          } border-none p-2  md:p-4 border appearance-none bg-no-repeat bg-right-4`}
        >
          <option value={""}>Filter</option>
          <option value={"Paid"}>Paid</option>
          <option value={"Pending"}>Pending</option>
          <option value={"Draft"}>Draft</option>
        </select>
        <Button
          style={"w-[8rem]"}
          onClick={() => {
            if (windowSize.width >= 768) {
              changeToggle();
            } else {
              navigate("/invoice/new");
            }
          }}
          name="New"
        ></Button>
      </div>
    </header>
  );
}
