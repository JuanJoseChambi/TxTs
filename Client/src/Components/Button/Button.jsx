import React from 'react'
import style from "./Button.module.scss"

function Button({text, onClick}) {
  return (
    <button onClick={onClick} className={style.btnComponent}>
      {text}
    </button>
  )
}

export default Button