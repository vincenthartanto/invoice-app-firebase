import {
  doc,
  setDoc,
  getDocs,
  addDoc,
  collection,
  QuerySnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { FormSliceActions } from "./FormSlice";
import { db } from "../firebase";
import generateRandomString from "../Functions/GenerateRandomString";
export const getInvoice = () => {
  return async (dispatch) => {
    try {
      let listData = [];
      const docSnap = await getDocs(collection(db, "formData"));
      docSnap.forEach((doc) => {
        listData.push({ ...doc.data(), docId: doc.id });
      });
      dispatch(FormSliceActions.readInvoice(listData));
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateInvoice = (invoice) => {
  return async (dispatch) => {
    const date = new Date(invoice.createdAt);
    let total = 0;
    date.setDate(date.getDate() + +invoice.paymentTerms);
    for (let item of invoice.items) {
      total = total + item.total;
    }
    const data = {
      createdAt: invoice.createdAt,
      paymentDue: date.toLocaleDateString("en-CA"),
      description: invoice.projectDescription,
      paymentTerms: invoice.paymentTerms,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      status: "pending",
      senderAddress: {
        street: invoice.streetAddress,
        city: invoice.city,
        postCode: invoice.postalCode,
        country: invoice.country,
      },
      clientAddress: {
        street: invoice.clientStreetAddress,
        city: invoice.clientCity,
        postCode: invoice.clientPostalCode,
        country: invoice.clientCountry,
      },
      items: invoice.items,
      total: total,
    };
    try {
      await updateDoc(doc(db, "formData", invoice.docId), data);
      dispatch(getInvoice());
    } catch (e) {
      console.log(e);
    }
  };
};
export const deleteInvoice = (docId) => {
  return async (dispatch) => {
    await deleteDoc(doc(db, "formData", docId));
    dispatch(getInvoice());
  };
};
export const markAsPaidInvoice = (docId) => {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "formData", docId), {
        status: "paid",
      });
      dispatch(getInvoice());
    } catch (e) {
      console.log(e);
    }
  };
};
export const createInvoice = (invoice) => {
  return async () => {
    let total = 0;
    for (let item of invoice.items) {
      total = total + item.total;
    }
    const date = new Date(invoice.createdAt);
    const paymentDue = new Date(
      date.setDate(date.getDate() + invoice.paymentTerms)
    );
    const paymentDueFormat = `${paymentDue.getFullYear()}-${paymentDue.getMonth()}-${paymentDue.getDate()}`;

    const data = {
      id: generateRandomString(),
      createdAt: invoice.createdAt,
      paymentDue: paymentDueFormat,
      description: invoice.projectDescription,
      paymentTerms: invoice.paymentTerms,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      status: invoice.isDraft ? "Draft" : "Pending",
      senderAddress: {
        street: invoice.streetAddress,
        city: invoice.city,
        postCode: invoice.postalCode,
        country: invoice.country,
      },
      clientAddress: {
        street: invoice.clientStreetAddress,
        city: invoice.clientCity,
        postCode: invoice.clientPostalCode,
        country: invoice.clientCountry,
      },
      items: invoice.items,
      total: total,
    };
    try {
      await addDoc(collection(db, "formData"), data);
    } catch (e) {
      console.log(e);
    }
  };
};
