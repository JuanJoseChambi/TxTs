import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: localStorage.getItem("token") || ""
};

export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      const token = action.payload;
      state.auth = token
      localStorage.setItem("token",token)
    },
    
  },
});
export const { setAuth } = auth.actions;

export default auth.reducer;
