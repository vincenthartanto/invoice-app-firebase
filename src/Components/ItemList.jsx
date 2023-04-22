import React from "react";
import LabelInputForm from "./LabelInputForm";
import FormSection from "./FormSection";
import QuantityPriceInput from "./QuantityPriceInput";
import Button from "./Button";

export default function ItemList({ children }) {
  return (
    <FormSection>
      <h3 className="text-grey">Item List</h3>
      {children}
    </FormSection>
  );
}
