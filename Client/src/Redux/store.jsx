import { configureStore } from '@reduxjs/toolkit'
import auth from "./Slice/auth"
import info from "./Slice/info"

export const store = configureStore({
  reducer: {
    auth:auth,
    info:info
  }

})

export default store;