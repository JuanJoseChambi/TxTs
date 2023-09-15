import React, { useEffect, useState } from "react";
import style from "./SignIn.module.scss";
import Inputs from "../Inputs/Inputs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { alertSuccess, alertError } from "../Alerts/Alerts";
import { useDispatch } from "react-redux";
import { setAuth } from "../../Redux/Slice/auth";

function SignIn({ createCount }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: "",
    contraseña: "",
  });

  async function handlerAccessUser(e) {
    e.preventDefault();
    if (login.email && login.contraseña) {
      const userAccess = {
        email: login.email,
        contraseña: login.contraseña,
      };
      const { data } = await axios.post("/api/user/login", userAccess);
      if (data.access) {
        dispatch(setAuth(data.token));
        navigate("/home");
        alertSuccess("Bienvenido a TxTs");
      } else {
        alertError(data.message);
      }
    } else {
      alertError("Ingrese Contraseña y Email");
    }
  }

  useEffect(() => {
    const SignIn = document.getElementById("SignIn");
    function callback(entrys) {
      entrys.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.visibleSignIn);
        }
      });
    }
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };
    const observadorSignIn = new IntersectionObserver(callback, options);

    observadorSignIn.observe(SignIn);
  }, []);

  return (
    <div className={style.containerSignIn} id="SignIn">
      <div className={style.header}>
        <p>Iniciar Sesion</p>
        <p>
          Bienvenido de nuevo a <b>TxTs</b>
        </p>
      </div>
      <form className={style.containerInputs}>
        <Inputs
          inputs={[
            { txt: "Email", typ: "email", name: "email" },
            { txt: "Contraseña", typ: "password", name: "contraseña" },
          ]}
          textBtn={"Acceder"}
          state={{ set: setLogin, stte: login }}
          actionPress={handlerAccessUser}
        />
      </form>
      <p className={style.separador}>O</p>
      
      <div className={style.tercerosSignIn}>
        <button> <i className="bx bxl-gmail"></i>Iniciar Sesion con Gmail</button>
        <button> <i className="bx bxl-github"></i>Iniciar Secion Con GitHub</button>
      </div>

      <p className={style.textRegister}>
        No tenes una cuenta?{" "}
        <button onClick={() => createCount()}>Crea una Cuenta</button>
      </p>
    </div>
  );
}

export default SignIn;
