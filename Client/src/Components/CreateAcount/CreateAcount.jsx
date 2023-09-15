import React, { useEffect, useState } from "react";
import style from "./CreateAcount.module.scss";
import Inputs from "../Inputs/Inputs";
import axios from "axios";
import { alertError, alertLoading } from '../Alerts/Alerts';


export default function CreateAcount({ signIn }) {
  const [createAccount, setCreateAccount] = useState({
    nombre: "",
    apellido: "",
    nombreUsuario: "",
    email: "",
    contraseña: "",
    verificarContraseña: ""
  })

  async function handlerCreateUser (e) {
    e.preventDefault();
    if (createAccount.nombre && createAccount.apellido && createAccount.nombreUsuario && createAccount.email && createAccount.contraseña && createAccount.verificarContraseña) {
      if (createAccount.contraseña === createAccount.verificarContraseña) {
        const {data} = await axios.post("/api/user/createAccount", createAccount);
      if (data.create) {
        alertLoading(data.message)
        signIn()
      }else{
        alertLoading(data.message)
      }
      }else{
        alertError("Desigualdad de Contraseñas")
      }
    }else{
      alertError("Complete todos Los campos para el Registro")
    }
  }

  useEffect(() => {
    const CheckIn = document.getElementById("CheckIn");

    function callback(entrys) {
      entrys.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.visibleCheckIn);
        }});
    }
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observadorCheckIn = new IntersectionObserver(callback, options);
    observadorCheckIn.observe(CheckIn);
  }, []);

  return (
    <div className={style.containerCheckIn} id="CheckIn">
      <div className={style.header}>
        <p>Crear Cuenta</p>
        <p>
          Bienvenido de nuevo a <b>TxTs</b>
        </p>
      </div>
      <form className={style.containerInputs}>
        <Inputs inputs={[
            { txt: "Nombre", typ: "text", name: "nombre"},
            { txt: "Apellido", typ: "text",name:"apellido"},
            { txt: "Nombre de Usuario", typ: "text",name:"nombreUsuario"},
            { txt: "Email", typ: "email",name:"email"},
            { txt: "Contraseña", typ: "password", name:"contraseña"},
            { txt: "Verificar Contraseña", typ: "password", name:"verificarContraseña"}
          ]} textBtn={"Crear Cuenta"} state={{set: setCreateAccount, stte:createAccount}} actionPress={handlerCreateUser}/>
      </form>
      <p className={style.textRegister}>Ya tenes una cuenta?<button onClick={() => signIn()}>Inicia Sesion</button></p>
    </div>
  );
}
