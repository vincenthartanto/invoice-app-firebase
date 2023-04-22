import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import AddNewInvoices from "../Components/AddNewInvoices";
import Invoices from "../Components/Invoices";
import { useNavigate } from "react-router-dom";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import InvoiceSideBarForm from "../Components/InvoiceSideBarForm";
import useToggle from "../Hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../Store/FormAction";
import IllustrationEmpty from "../assets/illustration-empty.svg";
import Loading from "../Components/Loading";
export default function Home() {
  const navigate = useNavigate();
  const { darkMode } = useContext(darkModeContext);
  const modal = useToggle();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const formData = useSelector((state) => state.formData.data);
  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getInvoice());
    setIsLoading(false);
  }, [dispatch]);
  return (
    <Wrapper
      style={`w-full h-full relative  ${
        darkMode ? "bg-blackv2" : "bg-lightGrey"
      }`}
    >
      {modal.isToggle && (
        <InvoiceSideBarForm
          changeToggle={modal.changeToggle}
        ></InvoiceSideBarForm>
      )}
      <AddNewInvoices
        onChangeFilter={onChangeFilter}
        filterValue={filter}
        changeToggle={modal.changeToggle}
        totalInvoices={formData.length}
      ></AddNewInvoices>
      {/* {formData.length === 0 && (
        <div className="grid place-items-center">
          <img src={IllustrationEmpty}></img>
          <h1>Data is Empty!</h1>
        </div>
      )} */}
      {isLoading && <Loading></Loading>}
      {filter !== ""
        ? formData.map((fd, index) => {
            if (fd.status === filter.toLowerCase()) {
              return (
                <Invoices
                  key={fd.id}
                  formData={fd}
                  onClick={() => {
                    navigate(`invoice/detail/${index}`, {
                      // state: { indexData: index },
                    });
                  }}
                  name={fd.clientName}
                  id={fd.id}
                  createdAt={fd.createdAt}
                  total={fd.total}
                  status={fd.status}
                ></Invoices>
              );
            }
          })
        : formData.map((fd, index) => {
            return (
              <Invoices
                key={fd.id}
                formData={fd}
                onClick={() => {
                  navigate(`invoice/detail/${index}`, {});
                }}
                name={fd.clientName}
                id={fd.id}
                createdAt={fd.createdAt}
                total={fd.total}
                status={fd.status}
              ></Invoices>
            );
          })}
    </Wrapper>
  );
}
