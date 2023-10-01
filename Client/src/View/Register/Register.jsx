import React, { useState } from 'react'
import style from "./Register.module.scss"
import TxTsRegister from "../../assets/TxTsRegister.png"
import SignIn from '../../Components/SignIn/SignIn'
import CreateAcount from '../../Components/CreateAcount/CreateAcount'

function Register() {
 // Estado local para cambiar entre el inicio de sesión y la creación de cuenta
 const [change, setChange] = useState(true);
  return (
    <div className={style.viewRegister}>
      <div className={style.containerLogo}>
        <img className={style.logo} src={TxTsRegister} alt="User" />
      </div>
      {change
      ?<SignIn createCount={() => setChange(false)}/>
      :<CreateAcount signIn={() => setChange(true)}/>}
    </div>
  )
}

export default Register