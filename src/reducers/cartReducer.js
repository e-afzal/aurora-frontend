import { createSlice } from "@reduxjs/toolkit";

let initialCartState = [];

// Set the initial cart to empty array OR to items array in Local Storage, IF ANY
initialCartState = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

export const cartSlice = createSlice({
  name: "cart",
  initialState: { value: initialCartState },
  reducers: {
    addToCart: (state, action) => {
      // console.log("PAYLOAD: ", action.payload);
      // If 'initial state' is EMPTY, simply add payload 'object' as is to the localStorage.
      if (state.value.length === 0) {
        state.value = [action.payload];
        localStorage.setItem("cartItems", JSON.stringify([action.payload]));
        return;
      }
      // If items exist in initialCartState, simply 'RETURN' if duplicate found
      // OR merge new item and existing items into a SINGLE ARRAY
      if (state.value.length > 0) {
        const item = action.payload;
        const duplicateProduct = state.value.find((x) => x.id === item.id);

        if (duplicateProduct) {
          // UPDATE item if already in cart
          // STEP 1: 'filter' out same item from state/cart and keep other item(s)

          const filteredOut = state.value.filter(
            (eachItem) => eachItem.id !== action.payload.id
          );

          // STEP 2: Push the item with NEW quantity/size (action.payload) into 'filteredOut' array
          const newValue = [...filteredOut, action.payload].sort(
            (a, b) => a.id - b.id
          );
          state.value = newValue;
          localStorage.setItem("cartItems", JSON.stringify(newValue));
          return;
        } else {
          // If no duplicate item exists, merge existing items and new item into one array
          const newValue = [...state.value, item];
          state.value = newValue;
          localStorage.setItem("cartItems", JSON.stringify(newValue));
          return;
        }
      }
    },
    removeFromCart: (state, action) => {
      // Find item in cart by ID and remove from 'cartItems'
      const filteredOut = state.value.filter(
        (eachItem) => eachItem.id !== action.payload
      );
      state.value = filteredOut;
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
