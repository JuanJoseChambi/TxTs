import React from 'react'
import style from "./Register.module.scss"

function Register() {
  return (
    <div className={style.viewRegister}>
      <div>registro</div>
      <div>Usuarios</div>
      <div className={style.container}>
        <button className={style.btn}>
          <p>Hola</p>
        </button>
      </div>
    </div>
  )
}

export default Register