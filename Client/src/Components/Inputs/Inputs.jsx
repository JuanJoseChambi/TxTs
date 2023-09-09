import React from 'react'
import style from "./Inputs.module.scss"

function Inputs({nameInputs}) {

  return (
   <>
     {nameInputs?.map((input) => (
        <input type={input.typ} placeholder={input.txt} className={style.inputsComponent}/>
    ))}
   </>
  )
}

export default Inputs