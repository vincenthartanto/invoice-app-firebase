import React, { useContext } from "react";
import Card from "./Card";
import { darkModeContext } from "../Context/DarkModeContextProvider";
export default function PaymentItemAndPrice({
  itemName,
  qty,
  price,
  totalPricePerItem,
}) {
  const { darkMode } = useContext(darkModeContext);
  return (
    <Card
      style={`flex items-center justify-between h-[70%] rounded-b-none ${
        darkMode ? "bg-blue" : ""
      }`}
    >
      <div className="space-y-2">
        <h3>{itemName}</h3>
        <p className="font-bold text-grey">
          {qty} x ${price}
        </p>
      </div>
      <h3>${totalPricePerItem}</h3>
    </Card>
  );
}
