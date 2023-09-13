import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from "./IconButtons.module.scss"

function IconButtons({iconButton, separationTop, separationBottom}) {
    const navigate = useNavigate()

    function handlerButton (directTo) {
        navigate(directTo)
    }

  return (
    <>
    {separationTop? <div className={style.line}/> : null}
    {iconButton?.map((icon, i) => (
        <>
        <button className={style.btn} key={i} >
            <i onClick={icon.action ? icon.action : () => handlerButton(icon.directTo)} className={icon.nameIcon}></i>
        </button>
        </>
    ))}
    {separationBottom? <div className={style.line}/> : null}
    </>
  )
}

export default IconButtons