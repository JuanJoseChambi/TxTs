import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nombre:"",
  apellido:"",
  nombreUsuario:"",
  email:"",
  contraseña:""
};

export const info = createSlice({
  name: "info",
  initialState: initialState,
  reducers: {
    setInfo: (state, action) => {
      const info = action.payload;
      state.nombre = info.nombre;
      state.apellido = info.apellido,
      state.nombreUsuario = info.nombreUsuario,
      state.email = info.email,
      state.contraseña = info.contraseña
    }
  },
});
export const { setInfo } = info.actions;

export default info.reducer;
