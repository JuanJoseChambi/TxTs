import { configureStore } from '@reduxjs/toolkit'
import auth from "./Slice/auth"

export const store = configureStore({
  reducer: {
    auth:auth
  }

})

export default store;