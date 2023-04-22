import React, { useContext, useEffect, useReducer, useState } from "react";
import Wrapper from "../Components/Wrapper";
import GoBackButton from "../Components/GoBackButton";
import FormSection from "../Components/FormSection";
import FormSplit from "../Components/FormSplit";
import LabelInputForm from "../Components/LabelInputForm";
import ItemList from "../Components/ItemList";
import Button from "../Components/Button";
import QuantityPriceInput from "../Components/QuantityPriceInput";
import Footer from "../Components/Footer";
import useWindow from "../Hooks/useWindow";
import IconArrowDown from "../assets/icon-arrow-down.svg";
import { v4 as uuidv4, validate } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice, getInvoice, updateInvoice } from "../Store/FormAction";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import ErrorMessage from "../Components/ErrorMessage";
import { useNavigate, useParams } from "react-router-dom";
export default function InvoiceForm({
  editMode = false,
  indexData = "",
  changeToggle,
}) {
  const { id } = useParams();
  const windowSize = useWindow();
  const rdxDispatch = useDispatch();
  let indexInvoice;
  if (id) {
    indexInvoice = id;
  } else {
    indexInvoice = indexData;
  }
  const [isInitial, setIsInitial] = useState(true);
  const formData = useSelector((state) => state.formData.data[indexInvoice]);
  const { darkMode } = useContext(darkModeContext);
  // const date = new Date();
  // const dateFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const date = new Date();
  const defaultDate = date.toLocaleDateString("en-CA");
  const navigate = useNavigate();
  let itemsErrors = {
    name: "",
    nameFocus: false,
    quantity: "",
    quantityFocus: false,
    price: "",
    priceFocus: false,
  };
  let listItemsErrors = [];

  if (isInitial && editMode) {
    console.log("jalan");
    console.log("ini edit mode " + editMode);
    for (let items of formData.items) {
      listItemsErrors.push(itemsErrors);
    }
    setIsInitial(false);
  }
  const initialState = {
    formData: editMode
      ? {
          streetAddress: formData.senderAddress.street,
          city: formData.senderAddress.city,
          postalCode: formData.senderAddress.postCode,
          country: formData.senderAddress.country,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientStreetAddress: formData.clientAddress.street,
          clientCity: formData.clientAddress.city,
          clientPostalCode: formData.clientAddress.postCode,
          clientCountry: formData.clientAddress.country,
          createdAt: formData.createdAt,
          paymentTerms: formData.paymentTerms,
          projectDescription: formData.description,
          items: formData.items,
          total: formData.total,
        }
      : {
          streetAddress: "",
          city: "",
          postalCode: "",
          country: "",
          clientName: "",
          clientEmail: "",
          clientStreetAddress: "",
          clientCity: "",
          clientPostalCode: "",
          clientCountry: "",
          createdAt: defaultDate,
          paymentTerms: "",
          projectDescription: "",
          items: [],
          total: 0,
        },
    formErrors: {
      streetAddress: "",
      streetAddressFocus: false,
      city: "",
      cityFocus: false,
      postalCode: "",
      postalCodeFocus: false,
      country: "",
      countryFocus: false,
      clientName: "",
      clientNameFocus: false,
      clientEmail: "",
      clientEmailFocus: false,
      clientStreetAddress: "",
      clientStreetAddressFocus: false,
      clientCity: "",
      clientCityFocus: false,
      clientPostalCode: "",
      clientPostalCodeFocus: false,
      clientCountry: "",
      clientCountryFocus: false,
      createdAt: "",
      paymentTerms: "",
      paymentTermsFocus: false,
      projectDescription: "",
      projectDescriptionFocus: false,
      listItems: "",
      items: editMode ? listItemsErrors : [],
    },
  };

  const reducerForm = (state, action) => {
    switch (action.type) {
      case "SET_FORMDATA": {
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.name]: action.value,
          },
        };
      }
      case "UPDATE_FORMDATA_ITEMS": {
        const newArray = [...state.formData.items];
        if (action.name === "quantity") {
          newArray[action.index] = {
            ...newArray[action.index],
            [action.name]: action.value,
            total: action.value * newArray[action.index].price,
          };
        }
        if (action.name === "price") {
          newArray[action.index] = {
            ...newArray[action.index],
            [action.name]: action.value,
            total: action.value * newArray[action.index].quantity,
          };
        }
        newArray[action.index] = {
          ...newArray[action.index],
          [action.name]: action.value,
        };
        return {
          ...state,
          formData: {
            ...state.formData,
            items: [...newArray],
          },
        };
      }
      case "ADD_FORMDATA_ITEMS": {
        return {
          ...state,
          formData: {
            ...state.formData,
            items: [...state.formData.items, action.value],
          },
        };
      }
      case "DELETE_FORMDATA_LISTITEMS": {
        const newArray = [...state.formData.items];
        newArray.splice(action.index, 1);
        return {
          ...state,
          formData: {
            ...state.formData,
            items: [...newArray],
          },
        };
      }
      case "SET_FORMERRORS": {
        return {
          ...state,
          formErrors: {
            ...state.formErrors,
            [action.name]: action.value,
          },
        };
      }
      case "ADD_FORMERRORS_ITEM": {
        return {
          ...state,
          formErrors: {
            ...state.formErrors,
            items: [...state.formErrors.items, action.errors],
          },
        };
      }
      case "DELETE_FORMERRORS_LISTITEMS": {
        const newArray = [...state.formErrors.items];
        newArray.splice(action.index, 1);
        return {
          ...state,
          formErrors: {
            ...state.formErrors,
            items: [...newArray],
          },
        };
      }
      // case "SET_FORMERRORS_ITEM": {
      //   console.log(action.index);
      //   const newArray = [...state.formErrors.items];

      //   newArray[action.index] = {
      //     name: action.value.name,
      //     quantity: action.value.quantity,
      //     price: action.value.price,
      //   };
      //   return {
      //     ...state,
      //     formErrors: {
      //       ...state.formErrors,
      //       items: [...newArray],
      //     },
      //   };
      // }
      case "SET_FORMERRORS_ITEM": {
        const newArray = [...state.formErrors.items];

        newArray[action.index] = {
          ...newArray[action.index],
          [action.name]: action.value,
        };
        return {
          ...state,
          formErrors: {
            ...state.formErrors,
            items: [...newArray],
          },
        };
      }
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducerForm, initialState);

  const onChange = (e) => {
    dispatch({
      type: "SET_FORMDATA",
      name: e.target.name,
      value: e.target.value,
    });
  };
  const onChangeItems = (e, index) => {
    dispatch({
      type: "UPDATE_FORMDATA_ITEMS",
      name: e.target.name,
      value: e.target.value,
      index: index,
    });
  };
  const validationItemError = () => {
    const formErrors = state.formErrors;
    console.log(formErrors.items);
    let counter = 0;
    for (let items of formErrors.items) {
      if (items.name !== "" || items.quantity !== "" || items.price !== "") {
        dispatch({
          type: "SET_FORMERRORS_ITEM",
          name: "nameFocus",
          value: true,
          index: counter,
        });
        dispatch({
          type: "SET_FORMERRORS_ITEM",
          name: "quantityFocus",
          value: true,
          index: counter,
        });
        dispatch({
          type: "SET_FORMERRORS_ITEM",
          name: "priceFocus",
          value: true,
          index: counter,
        });
        counter++;
        return true;
      }
    }
    return false;
  };
  const validationError = () => {
    const formErrors = state.formErrors;

    if (
      formErrors.streetAddress !== "" ||
      formErrors.city !== "" ||
      formErrors.postalCode !== "" ||
      formErrors.country !== "" ||
      formErrors.clientName !== "" ||
      (formErrors.clientEmail !== "" &&
        formErrors.clientStreetAddress !== "") ||
      formErrors.clientCity !== "" ||
      formErrors.clientPostalCode !== "" ||
      formErrors.clientCountry !== "" ||
      formErrors.projectDescription !== "" ||
      formErrors.listItems !== ""
    ) {
      dispatch({
        type: "SET_FORMERRORS",
        name: "streetAddressFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "cityFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "postalCodeFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "countryFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "clientNameFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "clientEmailFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "clientStreetAddressFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "clientCityFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "clientPostalCodeFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "clientCountryFocus",
        value: true,
      });
      dispatch({
        type: "SET_FORMERRORS",
        name: "projectDescriptionFocus",
        value: true,
      });

      return true;
    }
    return false;
  };

  const saveAndSend = () => {
    const isDraft = false;
    const isError = validationError();
    const isItemError = validationItemError();
    if (!isError && !isItemError) {
      rdxDispatch(createInvoice({ ...state.formData, isDraft: isDraft }));
      rdxDispatch(getInvoice());
      windowSize.width >= 768 ? changeToggle() : navigate(-1);
    }
  };
  const saveAsDraft = () => {
    const isDraft = true;
    rdxDispatch(createInvoice({ ...state.formData, isDraft: isDraft }));
    rdxDispatch(getInvoice());
    if (windowSize < 768) {
      navigate(-1);
    } else {
      changeToggle();
    }
  };

  const saveChanges = () => {
    const isError = validationError();
    const isItemError = validationItemError();
    if (!isError && !isItemError) {
      rdxDispatch(updateInvoice({ ...state.formData, docId: formData.docId }));
      windowSize.width >= 768 ? changeToggle() : navigate("..");
    }
  };
  const validateForm = () => {
    let errors = {};
    const formData = state.formData;
    if (formData.streetAddress.length < 10) {
      errors.streetAddress = "Street Address is too short!";
    }
    if (formData.city.length < 5) {
      errors.city = "City characters are too short!";
    }
    if (formData.postalCode.length !== 6) {
      errors.postalCode = "Postal Code must be 6 characters!";
    }
    if (formData.country.length < 5) {
      errors.country = "Country Characters are too short";
    }
    if (formData.clientName < 5) {
      errors.clientName = "Please type the full name of the client!";
    }

    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailRegex.test(formData.clientEmail)) {
      errors.clientEmail = "Please type valid email address";
    }
    if (formData.clientStreetAddress.length < 10) {
      errors.clientStreetAddress = "Client Street Address is too short";
    }

    if (formData.clientCity.length < 5) {
      errors.clientCity = "Client's City characters aer too short!";
    }
    if (formData.clientPostalCode.length !== 6) {
      errors.clientPostalCode = "Client's Postal Code must be 6 characters!";
    }
    if (formData.createdAt === new Date()) {
      errors.createdAt = "Invoice Date must be filled!";
    }
    if (formData.clientCountry.length < 5) {
      errors.clientCountry = "Client's Country Characters are too short";
    }
    if (formData.projectDescription.length < 5) {
      errors.projectDescription = "Project Description is not detail!";
    }
    if (formData.items.length === 0) {
      errors.listItems = "Please Add at least 1 item!";
    }

    if (formData.items.length !== 0) {
      let counter = 0;
      for (let item of formData.items) {
        if (item.name <= 5) {
          errors.name = "Please enter name more than 5 characters";
        }

        if (item.quantity === 0) {
          errors.qty = "Please enter quantity";
        }
        if (item.price === 0) {
          errors.price = "Please fill the price";
        }

        dispatch({
          type: "SET_FORMERRORS_ITEM",
          name: "name",
          value: errors.name || "",
          index: counter,
        });
        dispatch({
          type: "SET_FORMERRORS_ITEM",
          name: "quantity",
          value: errors.qty || "",
          index: counter,
        });
        dispatch({
          type: "SET_FORMERRORS_ITEM",
          name: "price",
          value: errors.price || "",
          index: counter,
        });
        counter++;
      }
    }

    dispatch({
      type: "SET_FORMERRORS",
      name: "listItems",
      value: errors.listItems || "",
    });
    // console.log(state.formErrors.items);
    dispatch({
      type: "SET_FORMERRORS",
      name: "streetAddress",
      value: errors.streetAddress || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "city",
      value: errors.city || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "postalCode",
      value: errors.postalCode || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "country",
      value: errors.country || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "clientName",
      value: errors.clientName || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "clientEmail",
      value: errors.clientEmail || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "clientStreetAddress",
      value: errors.clientStreetAddress || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "clientCity",
      value: errors.clientCity || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "clientPostalCode",
      value: errors.clientPostalCode || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "clientCountry",
      value: errors.clientCountry || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "createdAt",
      value: errors.createdAt || "",
    });
    dispatch({
      type: "SET_FORMERRORS",
      name: "projectDescription",
      value: errors.projectDescription || "",
    });
  };
  useEffect(() => {
    validateForm();
  }, [state.formData]);
  return (
    <>
      <Wrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={"md:w-[80%] h-full  rounded-r-3xl md:overflow-scroll"}
      >
        {windowSize.width < 768 && <GoBackButton></GoBackButton>}

        <h2>{editMode ? "Edit XM9141" : "New Invoice"}</h2>

        <FormSection title={"Bill From"}>
          <LabelInputForm
            onBlur={() => {
              dispatch({
                type: "SET_FORMERRORS",
                name: "streetAddressFocus",
                value: true,
              });
            }}
            name={"streetAddress"}
            labelName={"Street Address"}
            value={state.formData.streetAddress}
            onChange={onChange}
          ></LabelInputForm>
          {state.formErrors.streetAddress &&
            state.formErrors.streetAddressFocus && (
              <ErrorMessage msg={state.formErrors.streetAddress}></ErrorMessage>
            )}
          <FormSplit>
            <LabelInputForm
              onBlur={() => {
                dispatch({
                  type: "SET_FORMERRORS",
                  name: "cityFocus",
                  value: true,
                });
              }}
              name={"city"}
              labelName={"City"}
              value={state.formData.city}
              onChange={onChange}
            ></LabelInputForm>

            <LabelInputForm
              name={"postalCode"}
              onBlur={() => {
                dispatch({
                  type: "SET_FORMERRORS",
                  name: "postalCodeFocus",
                  value: true,
                });
              }}
              labelName={"Postal Code"}
              value={state.formData.postalCode}
              onChange={onChange}
            ></LabelInputForm>
            <LabelInputForm
              name={"country"}
              onBlur={() => {
                dispatch({
                  type: "SET_FORMERRORS",
                  name: "countryFocus",
                  value: true,
                });
              }}
              labelName={"Country"}
              value={state.formData.country}
              onChange={onChange}
            ></LabelInputForm>
            <div>
              {state.formErrors.city && state.formErrors.cityFocus && (
                <ErrorMessage msg={state.formErrors.city}></ErrorMessage>
              )}
            </div>
            <div>
              {state.formErrors.postalCode &&
                state.formErrors.postalCodeFocus && (
                  <ErrorMessage
                    msg={state.formErrors.postalCode}
                  ></ErrorMessage>
                )}
            </div>
            <div>
              {state.formErrors.country && state.formErrors.countryFocus && (
                <ErrorMessage msg={state.formErrors.country}></ErrorMessage>
              )}
            </div>
          </FormSplit>
        </FormSection>
        <FormSection title={"Bill To"}>
          <LabelInputForm
            onBlur={() => {
              dispatch({
                type: "SET_FORMERRORS",
                name: "clientNameFocus",
                value: true,
              });
            }}
            name={"clientName"}
            labelName={"Client's Name"}
            onChange={onChange}
            value={state.formData.clientName}
          ></LabelInputForm>
          <div>
            {state.formErrors.clientName &&
              state.formErrors.clientNameFocus && (
                <ErrorMessage msg={state.formErrors.clientName}></ErrorMessage>
              )}
          </div>
          <LabelInputForm
            name={"clientEmail"}
            onBlur={() => {
              dispatch({
                type: "SET_FORMERRORS",
                name: "clientEmailFocus",
                value: true,
              });
            }}
            labelName={"Client's Email"}
            type="email"
            onChange={onChange}
            value={state.formData.clientEmail}
          ></LabelInputForm>
          <div>
            {state.formErrors.clientEmail &&
              state.formErrors.clientEmailFocus && (
                <ErrorMessage msg={state.formErrors.clientEmail}></ErrorMessage>
              )}
          </div>
          <LabelInputForm
            onBlur={() => {
              dispatch({
                type: "SET_FORMERRORS",
                name: "clientStreetAddressFocus",
                value: true,
              });
            }}
            name={"clientStreetAddress"}
            labelName={"Street Address"}
            onChange={onChange}
            value={state.formData.clientStreetAddress}
          ></LabelInputForm>
          <div>
            {state.formErrors.clientStreetAddress &&
              state.formErrors.clientStreetAddressFocus && (
                <ErrorMessage
                  msg={state.formErrors.clientStreetAddress}
                ></ErrorMessage>
              )}
          </div>
          <FormSplit>
            <LabelInputForm
              onBlur={() => {
                dispatch({
                  type: "SET_FORMERRORS",
                  name: "clientCityFocus",
                  value: true,
                });
              }}
              name={"clientCity"}
              labelName={"City"}
              value={state.formData.clientCity}
              onChange={onChange}
            ></LabelInputForm>
            <LabelInputForm
              onBlur={() => {
                dispatch({
                  type: "SET_FORMERRORS",
                  name: "clientPostalCodeFocus",
                  value: true,
                });
              }}
              name={"clientPostalCode"}
              labelName={"Postal Code"}
              value={state.formData.clientPostalCode}
              onChange={onChange}
            ></LabelInputForm>
            <LabelInputForm
              onBlur={() => {
                dispatch({
                  type: "SET_FORMERRORS",
                  name: "clientCountryFocus",
                  value: true,
                });
              }}
              name={"clientCountry"}
              labelName={"Country"}
              value={state.formData.clientCountry}
              onChange={onChange}
            ></LabelInputForm>
            <div>
              {state.formErrors.clientCity &&
                state.formErrors.clientCityFocus && (
                  <ErrorMessage
                    msg={state.formErrors.clientCity}
                  ></ErrorMessage>
                )}
            </div>
            <div>
              {state.formErrors.clientPostalCode &&
                state.formErrors.clientPostalCodeFocus && (
                  <ErrorMessage
                    msg={state.formErrors.clientPostalCode}
                  ></ErrorMessage>
                )}
            </div>

            <div>
              {state.formErrors.clientCountry &&
                state.formErrors.clientCountryFocus && (
                  <ErrorMessage
                    msg={state.formErrors.clientCountry}
                  ></ErrorMessage>
                )}
            </div>
          </FormSplit>
          <div className="md:flex md:space-x-2 md:space space-y-4 md:items-center">
            <LabelInputForm
              style={"w-full"}
              name={"createdAt"}
              labelName={"Invoice Date"}
              onChange={onChange}
              type="date"
              value={state.formData.createdAt}
            ></LabelInputForm>
            <div>
              {state.formErrors.createdAt && (
                <ErrorMessage msg={state.formErrors.createdAt}></ErrorMessage>
              )}
            </div>

            <div className="w-full">
              <label>Payment Terms</label>
              <select
                style={{ backgroundImage: `url(${IconArrowDown})` }}
                className={`${
                  darkMode ? "bg-darkBlue border-none" : "bg-white "
                } w-full p-4 border appearance-none bg-no-repeat bg-right-4`}
                name="paymentTerms"
                onChange={onChange}
                value={state.formData.paymentTerms}
              >
                <option value={1}>Next Day</option>
                <option value={7}>Next 7 Days</option>
                <option value={14}>Next 14 Days</option>
                <option value={21}>Next 21 Days</option>
                <option value={30}>Next 30 Days</option>
              </select>
            </div>
          </div>
          <LabelInputForm
            name={"projectDescription"}
            onBlur={() => {
              dispatch({
                type: "SET_FORMERRORS",
                name: "projectDescriptionFocus",
                value: true,
              });
            }}
            labelName={"Project Description"}
            onChange={onChange}
            value={state.formData.projectDescription}
          ></LabelInputForm>
          <div>
            {state.formErrors.projectDescription &&
              state.formErrors.projectDescriptionFocus && (
                <ErrorMessage
                  msg={state.formErrors.projectDescription}
                ></ErrorMessage>
              )}
          </div>
        </FormSection>
        <ItemList>
          {state.formData.items.map((item, index) => {
            return (
              <QuantityPriceInput
                itemName={item.name}
                onBlurItemName={() => {
                  dispatch({
                    type: "SET_FORMERRORS_ITEM",
                    index: index,
                    name: "nameFocus",
                    value: true,
                  });
                }}
                onBlurQuantity={() => {
                  dispatch({
                    type: "SET_FORMERRORS_ITEM",
                    name: "quantityFocus",
                    index: index,
                    value: true,
                  });
                }}
                onBlurPrice={() => {
                  dispatch({
                    type: "SET_FORMERRORS_ITEM",
                    name: "priceFocus",
                    index: index,
                    value: true,
                  });
                }}
                itemNameErrorMessage={state.formErrors.items[index].name}
                itemNameFocusError={state.formErrors.items[index].nameFocus}
                quantity={item.quantity}
                quantityErrorMessage={state.formErrors.items[index].quantity}
                quantityFocusError={state.formErrors.items[index].quantityFocus}
                price={item.price}
                priceErrorMessage={state.formErrors.items[index].price}
                priceFocusError={state.formErrors.items[index].priceFocus}
                total={item.total}
                key={item.id}
                onChange={(e) => {
                  onChangeItems(e, index);
                }}
                deleteItem={() => {
                  dispatch({
                    type: "DELETE_FORMERRORS_LISTITEMS",
                    index: index,
                  });
                  dispatch({
                    type: "DELETE_FORMDATA_LISTITEMS",
                    index: index,
                  });
                }}
              ></QuantityPriceInput>
            );
          })}
        </ItemList>
        {state.formErrors.listItems && (
          <ErrorMessage msg={state.formErrors.listItems}></ErrorMessage>
        )}
        <Button
          onClick={() => {
            const item = {
              id: uuidv4(),
              name: "",
              quantity: 0,
              price: 0,
              total: 0,
            };
            dispatch({ type: "ADD_FORMDATA_ITEMS", value: item });
            dispatch({
              type: "ADD_FORMERRORS_ITEM",
              errors: itemsErrors,
            });
          }}
          name={"+ Add New Item"}
        ></Button>
        {editMode && windowSize.width >= 768 && (
          <Footer style={"justify-end"}>
            <Button onClick={changeToggle} name={"Cancel"}></Button>
            <Button onClick={saveChanges} name={"Save Changes"}></Button>
          </Footer>
        )}
        {!editMode && windowSize.width >= 768 && (
          <Footer style={"justify-end"}>
            <Button onClick={changeToggle} name={"Discard"}></Button>
            <Button onClick={saveAsDraft} name={"Save as Draft"}></Button>
            <Button onClick={saveAndSend} name={"Save & Send"}></Button>
          </Footer>
        )}
      </Wrapper>

      {editMode && windowSize.width < 768 && (
        <Footer style={"justify-end"}>
          <Button
            onClick={() => {
              navigate("/");
            }}
            name={"Cancel"}
          ></Button>
          <Button onClick={saveChanges} name={"Save Changes"}></Button>
        </Footer>
      )}
      {!editMode && windowSize.width < 768 && (
        <Footer style={"justify-end"}>
          <Button
            onClick={() => {
              navigate("/");
            }}
            name={"Discard"}
          ></Button>
          <Button onClick={saveAsDraft} name={"Save as Draft"}></Button>
          <Button onClick={saveAndSend} name={"Save & Send"}></Button>
        </Footer>
      )}
    </>
  );
}
