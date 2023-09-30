import { configureStore } from '@reduxjs/toolkit'
import auth from "./Slice/auth"
import info from "./Slice/info"
import search from "./Slice/searchPost"

export const store = configureStore({
  reducer: {
    auth:auth,
    info:info,
    search:search
  }

})

export default store;