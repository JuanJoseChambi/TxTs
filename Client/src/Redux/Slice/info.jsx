import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoUser: JSON.parse(localStorage.getItem("info")) || {}
};


export const info = createSlice({
  name: "info",
  initialState: initialState,
  reducers: {
    setInfo: (state, action) => {
      const info = action.payload;
      state.infoUser = info
      localStorage.setItem("info",JSON.stringify(info))
    }
  },
});
export const { setInfo } = info.actions;

export default info.reducer;
