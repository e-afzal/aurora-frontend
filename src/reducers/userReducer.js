import { createSlice } from "@reduxjs/toolkit";

let initialUserState = {};

// Set the initial user to empty object OR to userInfo value found in Local Storage, IF ANY
if (typeof window !== "undefined") {
  initialUserState = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : initialUserState;
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    register: (state, action) => {
      const data = {
        user: action.payload,
      };
      state.value = data;
      localStorage.setItem("userInfo", JSON.stringify(data));
    },

    login: (state, action) => {
      const data = { user: action.payload };
      state.value = data;
      localStorage.setItem("userInfo", JSON.stringify(data));
    },

    logout: (state) => {
      //! Clear storage containing user-related data
      localStorage.clear();
      state.value = initialUserState;
    },
  },
});

export const { register, login, logout, returnState } = userSlice.actions;

export default userSlice.reducer;
