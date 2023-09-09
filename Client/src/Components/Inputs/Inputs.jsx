import React, { useState } from 'react'
import style from "./Inputs.module.scss"

function Inputs({nameInputs}) {
    const [hide, setHide] = useState("password")
    const [login, setLogin] = useState({
      nombre: "",
      apellido: "",
      nombreUsuario: "",
      email: "",
      contraseña: "",
      verificarContraseña: "",
    })

  return (
   <>
     {nameInputs?.map((input) => (
        <>
        {input.typ === "password" 
        ?
        <div className={style.inputPassword}>
        <input type={hide} placeholder={input.txt} className={style.inputsComponentPassword} onChange={(e) => setLogin({...login, [input.name]:e.target.value})}/> 
        <i onClick={() => hide === "password"?setHide("text"):setHide("password")} className={hide==="password"?'bx bxs-show':'bx bxs-hide'}></i>
        </div> 
        : <input type={input.typ} placeholder={input.txt} className={style.inputsComponent} onChange={(e) => setLogin({...login, [input.name]:e.target.value})}/>}
        
        </>
    ))}
   </>
  )
}

export default Inputs