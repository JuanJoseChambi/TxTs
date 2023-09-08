import React from 'react'
import style from "./SignIn.module.scss"

function SignIn() {
  return (
    <div className={style.containerSignIn}>
        <div className={style.header}>
            <p >Iniciar Sesion</p>
            <p >Bienvenido de nuevo a <b>TxTs</b></p>
        </div>
        <div className={style.containerInputs}>
            <input type="text" placeholder='Email'/>
            <input type="text" placeholder='Contraseña'/>
            <button className={style.btnAccess}>Acceder</button>
        </div>
        <p className={style.separador}>O</p>
        <div className={style.tercerosSignIn}>
            <button><i className='bx bxl-gmail'></i>Iniciar Sesion con Gmail</button>
            <button><i className='bx bxl-github'></i>Iniciar Secion Con GitHub</button>
        </div>
        <p className={style.textRegister}>No tenes una cuenta? <button>Crea una Cuenta</button></p>
    </div>
  )
}

export default SignIn