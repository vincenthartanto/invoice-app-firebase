import React from "react";
import Address from "./Address";
import PaymentTitleAndDescription from "./PaymentTitleAndDescription";
import PaymentBill from "./PaymentBill";
import useWindow from "../Hooks/useWindow";
export default function PaymentInfo({
  invoiceDate,
  clientStreetAddress,
  clientCity,
  clientPostalCode,
  clientCountry,
  clientEmail,
  clientName,
  paymentDue,
}) {
  const windowSize = useWindow();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      <PaymentTitleAndDescription
        title={"Invoice Date"}
        description={invoiceDate}
      ></PaymentTitleAndDescription>

      <PaymentTitleAndDescription title={"Bill To"} description={clientName}>
        <Address
          street={clientStreetAddress}
          city={clientCity}
          postalCode={clientPostalCode}
          country={clientCountry}
        ></Address>
      </PaymentTitleAndDescription>
      {windowSize.width >= 768 ? (
        <PaymentTitleAndDescription
          title={"Sent to"}
          description={clientEmail}
        ></PaymentTitleAndDescription>
      ) : (
        ""
      )}
      <div className="space-y-4">
        <PaymentTitleAndDescription
          title={"Payment Due"}
          description={paymentDue}
        ></PaymentTitleAndDescription>
        {windowSize.width >= 768 ? (
          ""
        ) : (
          <PaymentTitleAndDescription
            title={"Sent to"}
            description={clientEmail}
          ></PaymentTitleAndDescription>
        )}
      </div>
    </div>
  );
}
