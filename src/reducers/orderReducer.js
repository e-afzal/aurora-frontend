import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialOrderState = {
  createdAt: "",
  fulfillmentStatus: "unfulfilled",
  fulfillmentAt: "",
  cartItems: [],
  subtotal: "",
  shipping: "",
  tax: "",
  total: "",
  shippingAddress: {},
  shippingMethod: "standard",
  discountMode: "",
  discountAmt: "",
  userInfo: {},
  payment: {},
};

export const orderSlice = createSlice({
  name: "order",
  initialState: { value: initialOrderState },
  reducers: {
    createOrder: async (state, action) => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/orders/create`,
          action.payload
        );
      } catch (error) {
        console.log("ORDER creation failed: ", error.message);
      }
    },
  },
});

export const { createOrder } = orderSlice.actions;

export default orderSlice.reducer;
