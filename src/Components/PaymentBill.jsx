import React from "react";
import Card from "./Card";
import PaymentItemAndPrice from "./PaymentItemAndPrice";
import GrandTotalItem from "./GrandTotalItem";

export default function PaymentBill({ state }) {
  return (
    <div className="w-full h-full">
      {state.items.map((st) => {
        return (
          <PaymentItemAndPrice
            key={st.id}
            itemName={st.name}
            qty={st.quantity}
            price={st.price}
            totalPricePerItem={st.total}
          ></PaymentItemAndPrice>
        );
      })}

      <GrandTotalItem total={state.total}></GrandTotalItem>
    </div>
  );
}
