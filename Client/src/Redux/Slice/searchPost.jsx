import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: ""
};


export const search = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearch: (state, action) => {
      const searchText = action.payload;
      state.search = searchText ? searchText : null
    }
  },
});
export const { setSearch } = search.actions;

export default search.reducer;
