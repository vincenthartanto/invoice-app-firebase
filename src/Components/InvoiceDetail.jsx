import React, { useContext } from "react";
import Card from "./Card";
import Wrapper from "./Wrapper";
import Status from "./Status";
import Address from "./Address";
import PaymentInfo from "./PaymentInfo";
import PaymentBill from "./PaymentBill";
import Footer from "./Footer";
import Button from "./Button";
import GoBackButton from "./GoBackButton";
import MediumParagraph from "./MediumParagraph";
import SmallParagraph from "./SmallParagraph";
import SmallHeading from "./SmallHeading";
import useWindow from "../Hooks/useWindow";
import { darkModeContext } from "../Context/DarkModeContextProvider";
import { color } from "framer-motion";
import useToggle from "../Hooks/useToggle";
import InvoiceSideBarForm from "./InvoiceSideBarForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormSliceActions } from "../Store/FormSlice";
import DeleteModal from "./DeleteModal";
import { deleteInvoice, markAsPaidInvoice } from "../Store/FormAction";
import ValidationModalMessage from "./ValidationModalMessage";
export default function InvoiceDetail() {
  const windowSize = useWindow();
  const { id } = useParams();
  const { darkMode } = useContext(darkModeContext);
  const colorTheme = darkMode ? "bg-darkBlue" : "bg-white";
  const modal = useToggle();
  const deleteModal = useToggle();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const validationModal = useToggle();
  const navigate = useNavigate();
  const formData = useSelector((st) => st.formData.data[id]); // keapus state index data karena mau ke router baru
  return (
    <div className="flex flex-col justify-between md:relative md:h-full ">
      <Wrapper>
        <GoBackButton></GoBackButton>
        {windowSize.width >= 768 ? (
          <Card style={`flex items-center justify-between  ${colorTheme}`}>
            <div className="flex items-center space-x-4">
              <MediumParagraph name="Status"></MediumParagraph>
              <Status title={formData.status}></Status>
            </div>
            {formData.status != "paid" && (
              <div className="flex space-x-4">
                <Button
                  onClick={() => {
                    modal.changeToggle();
                  }}
                  name={"Edit"}
                ></Button>
                <Button
                  onClick={() => {
                    deleteModal.changeToggle();
                  }}
                  name={"Delete"}
                ></Button>

                <Button
                  onClick={() => {
                    if (formData.status !== "Draft") {
                      dispatch(markAsPaidInvoice(formData.docId));
                      navigate(-1);
                    } else {
                      validationModal.changeToggle();
                    }

                    // dispatch(FormSliceActions.markAsPaid(formData.docId));
                  }}
                  name={"Mark as Paid"}
                ></Button>
              </div>
            )}
          </Card>
        ) : (
          <Card style={`flex items-center justify-between ${colorTheme}`}>
            <MediumParagraph name="Status"></MediumParagraph>
            <Status title={formData.status}></Status>
          </Card>
        )}

        <Card style={`flex flex-col  justify-around space-y-4  ${colorTheme}`}>
          <div>
            <SmallHeading name={formData.id}></SmallHeading>
            <SmallParagraph name={formData.description}></SmallParagraph>
          </div>
          {/* <Address
            street={"19 Union Terrace"}
            city={"London"}
            postalCode={"E1 3EZ"}
            country={"United Kingdom"}
          ></Address> */}

          <PaymentInfo
            clientCountry={formData.clientAddress.country}
            clientPostalCode={formData.clientAddress.postCode}
            clientStreetAddress={formData.clientAddress.street}
            clientEmail={formData.clientEmail}
            clientName={formData.clientName}
            clientCity={formData.clientAddress.city}
            invoiceDate={formData.createdAt}
            paymentDue={formData.paymentDue}
          ></PaymentInfo>
          <PaymentBill state={formData}></PaymentBill>
        </Card>
      </Wrapper>
      {windowSize.width < 768 && formData.status != "paid" && (
        <Footer>
          <Button
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
            name={"Edit"}
          ></Button>
          <Button
            onClick={() => {
              deleteModal.changeToggle();
            }}
            name={"Delete"}
          ></Button>

          <Button
            onClick={() => {
              if (formData.status !== "Draft") {
                dispatch(markAsPaidInvoice(formData.docId));
                navigate(-1);
              } else {
                validationModal.changeToggle();
              }
            }}
            name={"Mark as Paid"}
          ></Button>
        </Footer>
      )}

      {validationModal.isToggle && (
        <ValidationModalMessage
          title={"You can't mark as paid!"}
          msg={" You need to fill the form in order to mark as paid this form!"}
          changeToggle={validationModal.changeToggle}
        ></ValidationModalMessage>
      )}
      {modal.isToggle && (
        <InvoiceSideBarForm
          changeToggle={modal.changeToggle}
          editMode={true}
          indexData={id}
        ></InvoiceSideBarForm>
      )}
      {deleteModal.isToggle && (
        <DeleteModal
          cancel={deleteModal.changeToggle}
          deleteData={() => {
            dispatch(deleteInvoice(formData.docId));
            // dispatch(FormSliceActions.deleteData(state.indexData));
            navigate(-1);
          }}
        ></DeleteModal>
      )}
    </div>
  );
}
