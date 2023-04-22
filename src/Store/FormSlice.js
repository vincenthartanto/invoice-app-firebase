import { createSlice } from "@reduxjs/toolkit";
import generateRandomString from "../Functions/GenerateRandomString";

export const formSlice = createSlice({
  name: "form-slice",
  initialState: {
    data: [],
  },
  reducers: {
    markAsPaid(state, action) {
      state.data[action.payload].status = "paid";
    },
    editData(state, action) {
      const date = new Date(action.payload.createdAt);
      let total = 0;
      console.log(action.payload.paymentTerms);
      date.setDate(date.getDate() + +action.payload.paymentTerms);
      console.log(date);
      const paymentDueFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      console.log(paymentDueFormat);
      state.data[action.payload.index].createdAt = action.payload.createdAt;
      state.data[action.payload.index].description =
        action.payload.projectDescription;
      state.data[action.payload.index].paymentDue = paymentDueFormat;
      state.data[action.payload.index].paymentTerms =
        action.payload.paymentTerms;
      state.data[action.payload.index].clientName = action.payload.clientName;
      state.data[action.payload.index].clientEmail = action.payload.clientEmail;
      state.data[action.payload.index].senderAddress.street =
        action.payload.streetAddress;
      state.data[action.payload.index].senderAddress.city = action.payload.city;
      state.data[action.payload.index].senderAddress.postCode =
        action.payload.postalCode;
      state.data[action.payload.index].senderAddress.country =
        action.payload.country;
      state.data[action.payload.index].clientAddress.street =
        action.payload.clientStreetAddress;
      state.data[action.payload.index].clientAddress.city =
        action.payload.clientCity;
      state.data[action.payload.index].clientAddress.postCode =
        action.payload.clientPostalCode;
      state.data[action.payload.index].clientAddress.country =
        action.payload.country;
      state.data[action.payload.index].items = [...action.payload.items];

      for (let item of action.payload.items) {
        total = total + item.total;
      }
      state.data[action.payload.index].total = total;
    },
    deleteData(state, action) {
      console.log(action.payload);
      state.data.splice(action.payload, 1);
    },
    readInvoice(state, action) {
      state.data = action.payload;
    },
    addData(state, action) {
      const date = new Date();
      const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      let total = 0;
      for (let item of action.payload.items) {
        total = total + item.total;
      }

      const paymentDue = new Date(
        date.setDate(date.getDate() + action.payload.paymentTerms)
      );
      const paymentDueFormat = `${paymentDue.getFullYear()}-${paymentDue.getMonth()}-${paymentDue.getDate()}}`;
      const data = {
        id: generateRandomString(),
        createdAt: createdAt,
        paymentDue: paymentDueFormat,
        description: action.payload.projectDescription,
        paymentTerms: action.payload.paymentTerms,
        clientName: action.payload.clientName,
        clientEmail: action.payload.clientEmail,
        status: "Pending",
        senderAddress: {
          street: action.payload.streetAddress,
          city: action.payload.city,
          postCode: action.payload.postalCode,
          country: action.payload.country,
        },
        clientAddress: {
          street: action.payload.clientStreetAddress,
          city: action.payload.clientCity,
          postCode: action.payload.clientPostalCode,
          country: action.payload.clientCountry,
        },
        items: action.payload.items,
        total: total,
      };
      state.data.push(data);

      console.log(data);
    },
    readData(state, action) {
      state.data = action.payload;
    },
  },
});

export const FormSliceActions = formSlice.actions;
