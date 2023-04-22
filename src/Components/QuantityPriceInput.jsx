import React from "react";
import IconDelete from "../assets/icon-delete.svg";
import Input from "./Input";
import LabelInputForm from "./LabelInputForm";
import ErrorMessage from "./ErrorMessage";
export default function QuantityPriceInput({
  itemName,
  quantity,
  price,
  total,
  deleteItem,
  onChange,
  itemNameErrorMessage,
  onBlurItemName,
  onBlurQuantity,
  onBlurPrice,
  itemNameFocusError,
  quantityFocusError,
  priceFocusError,
  priceErrorMessage,
  quantityErrorMessage,
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="grid grid-cols-4 md:grid-cols-8  gap-4 items-center">
        <LabelInputForm
          onBlur={onBlurItemName}
          name={"name"}
          labelName={"Item Name"}
          style={"col-span-4 md:col-span-3"}
          value={itemName}
          onChange={onChange}
        ></LabelInputForm>

        <LabelInputForm
          onBlur={onBlurQuantity}
          name={"quantity"}
          labelName={"qty"}
          value={quantity}
          onChange={onChange}
          type="number"
        ></LabelInputForm>

        <LabelInputForm
          onBlur={onBlurPrice}
          type="number"
          name={"price"}
          labelName={"price"}
          value={price}
          style={"md:col-span-2"}
          onChange={onChange}
        ></LabelInputForm>

        <div>
          <p className="text-grey col-span-2">Total</p>

          <p className="text-grey font-bold mt-3">{total}</p>
        </div>
        <button onClick={deleteItem} className="h-full pt-10">
          <img src={IconDelete}></img>
        </button>
        <div className="col-span-4 md:col-span-3">
          {itemNameErrorMessage && itemNameFocusError && (
            <ErrorMessage msg={itemNameErrorMessage}></ErrorMessage>
          )}
        </div>
        <div>
          {quantityErrorMessage && quantityFocusError && (
            <ErrorMessage msg={quantityErrorMessage}></ErrorMessage>
          )}
        </div>
        <div>
          {priceErrorMessage && priceFocusError && (
            <ErrorMessage msg={priceErrorMessage}></ErrorMessage>
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="col-span-2">
<p className="text-grey w-full">Total Price</p>

<p>400.00</p>
</div> */
}
