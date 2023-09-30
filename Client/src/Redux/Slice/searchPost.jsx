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
      if (searchText) {
          state.search = searchText
      }else{
        state.search = ""
      }
    }
  },
});
export const { setSearch } = search.actions;

export default search.reducer;
