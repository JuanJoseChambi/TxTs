import React, { useState } from 'react'
import style from "./Inputs.module.scss"

function Inputs({nameInputs}) {
    const [hide, setHide] = useState("password")

  return (
   <>
     {nameInputs?.map((input) => (
        <>
        {input.typ === "password" 
        ?
        <div className={style.inputPassword}>
        <input type={hide} placeholder={input.txt} className={style.inputsComponentPassword}/> 
        <i onClick={() => hide === "password"?setHide("text"):setHide("password")} className={hide==="password"?'bx bxs-show':'bx bxs-hide'}></i>
        </div> 
        : <input type={input.typ} placeholder={input.txt} className={style.inputsComponent}/>}
        
        </>
    ))}
   </>
  )
}

export default Inputs