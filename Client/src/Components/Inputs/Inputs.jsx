import React, { useState } from 'react'
import style from "./Inputs.module.scss"

function Inputs({nameInputs, textBtn, state, actionPress}) {
    const [hide, setHide] = useState("password")
  return (
   <>
     {nameInputs?.map((input) => (
        <div key={input.name}>

        {input.typ === "password" 
        ?<div className={style.inputPassword} >
          <input type={hide} name={input.name} placeholder={input.txt} className={style.inputsComponentPassword} onChange={(e) => state.set({...state.stte, [input.name]:e.target.value})}/> 
          <i  onClick={() => hide === "password"?setHide("text"):setHide("password")} className={hide==="password"?'bx bxs-show':'bx bxs-hide'}></i>
          </div> 
        : <input autoComplete='false' type={input.typ} name={input.name} placeholder={input.txt} className={style.inputsComponent} onChange={(e) => state.set({...state.stte, [input.name]:e.target.value})}/>}
        
        </div>
    ))}
    <button className={style.btn} onClick={actionPress}>{textBtn}</button>
   </>
  )
}

export default Inputs