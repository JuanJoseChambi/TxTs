import React, { useEffect } from 'react'
import style from "./CheckIn.module.scss"
import Button from '../Button/Button';

export default function CheckIn ({signIn}) {

    useEffect(() => {
      const CheckIn = document.getElementById("CheckIn");

      function callback (entrys) {
        entrys.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(style.visibleCheckIn)
          }
        });
      }
      const options = {
        root:null,
        rootMargin: "0px",
        threshold: 0.5
      }
      const observadorCheckIn = new IntersectionObserver(callback, options)

      observadorCheckIn.observe(CheckIn)

    },[])

    return (
        <div className={style.containerCheckIn} id="CheckIn">
            <div className={style.header}>
                <p >Crear Cuenta</p>
                <p >Bienvenido de nuevo a <b>TxTs</b></p>
            </div>
            <form className={style.containerInputs}>
                <input name={"input"} type="text" placeholder='Nombre de Usuario'/>
                <input name={"input"} type="text" placeholder='Email'/>
                <input name={"input"} type="text" placeholder='Contraseña'/>
                <input name={"input"} type="text" placeholder='Verificar Contraseña'/>
                <input name={"input"} type="text" placeholder='Edad'/>
                <Button text="Crear Cuenta"/>
            </form>
            <p className={style.textRegister}>No tenes una cuenta? <button onClick={() => signIn()}>Crea una Cuenta</button></p>
        </div>
      )
}