import React from 'react'
import style from "./Register.module.scss"
import LogoBackground from "../../assets/LogoBackground.svg"
import SignIn from '../../Components/SignIn/SignIn'

function Register() {
  return (
    <div className={style.viewRegister}>
      <div className={style.containerLogo}>
        <img src={LogoBackground} alt="User" />
      </div>
      <SignIn/>
    </div>
  )
}

export default Register