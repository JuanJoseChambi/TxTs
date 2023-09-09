import React, { useEffect } from 'react'
import style from "./SignIn.module.scss"
import Button from '../Button/Button';
import Inputs from '../Inputs/Inputs';

function SignIn({createCount}) {

useEffect(() => {
    const SignIn = document.getElementById("SignIn");
    function callback (entrys) {
        entrys.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(style.visibleSignIn)
            }
        })
    }
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1
    }
    const observadorSignIn = new IntersectionObserver(callback, options);

    observadorSignIn.observe(SignIn)
    
},[])

  return (
    <div className={style.containerSignIn} id='SignIn'>
        <div className={style.header}>
            <p >Iniciar Sesion</p>
            <p >Bienvenido de nuevo a <b>TxTs</b></p>
        </div>
        <form className={style.containerInputs}>
            <Inputs nameInputs={ [ {txt:"Email", typ:"text"}, {txt:"Contraseña",typ:"text"} ]}/>
            <Button text="Acceder"/>
        </form>
        <p className={style.separador}>O</p>
        <div className={style.tercerosSignIn}>
            <button><i className='bx bxl-gmail'></i>Iniciar Sesion con Gmail</button>
            <button><i className='bx bxl-github'></i>Iniciar Secion Con GitHub</button>
        </div>
        <p className={style.textRegister}>No tenes una cuenta? <button onClick={() => createCount()}>Crea una Cuenta</button></p>
    </div>
  )
}

export default SignIn