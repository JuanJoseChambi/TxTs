import React from "react";
import style from "./NavBar.module.scss";
import TxTsNavBarLogo from "../../assets/TxTsNavBarLogo.png"
import { useSelector } from "react-redux";
import NotUser from "../../assets/NotUser.png"

function NavBar() {

  const {infoUser} = useSelector(state => state.info)

  return (
    <div className={style.viewNav}>

      <div className={style.containerLogoTxTs}>
          <img className={style.image} src={TxTsNavBarLogo} alt="TxTsLogo" />
      </div>

      <form className={style.inputContainer}>
        <label className={style.icon}><i className='bx bx-search-alt-2'></i></label>
        <input className={style.input} name="search" type="text" placeholder="Buscar"/>
      </form>

      <div className={style.infoUser}>
        <div>
          <p>{infoUser.nombre} {infoUser.apellido}</p>
          <p>@{infoUser.nombreUsuario}</p>
        </div>
        <div className={style.containerImage}>
          <img className={style.image} src={infoUser.image ? infoUser.image : NotUser} alt="NotUserImage" />
        </div> 
      </div>
      
    </div>
  )
}

export default NavBar;
