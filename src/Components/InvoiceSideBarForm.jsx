import React from "react";
import CardModal from "./CardModal";
import InvoiceForm from "../Page/InvoiceForm";
import { createPortal } from "react-dom";

export default function InvoiceSideBarForm({
  changeToggle,
  editMode,
  indexData,
}) {
  return (
    <div
      onClick={changeToggle}
      className=" bg-black bg-opacity-50 absolute w-screen top-0 z-20 h-full  left-0"
    >
      <InvoiceForm
        changeToggle={changeToggle}
        indexData={indexData}
        editMode={editMode}
      ></InvoiceForm>
    </div>
  );
}
