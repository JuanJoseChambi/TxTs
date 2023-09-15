import React from "react";
import style from "./NavBar.module.scss";
import TxTsNavBarLogo from "../../assets/TxTsNavBarLogo.png"

function NavBar() {
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
          <p>Juan Jose Chambi</p>
          <p>@Jotta</p>
        </div>
        <div className={style.containerImage}>
          <img className={style.image} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFogB3c0aNtnWrl9WPR9VHd4RZXjx5ZAT4Dw&usqp=CAU" alt="UserImage" />  
        </div> 
      </div>
      
    </div>
  )
}

export default NavBar;
