import React from "react";
import style from "./SideBar.module.scss";
import IconButtons from "../IconButtons/IconButtons";
import TxTsNavBarLogo from "../../assets/TxTsNavBarLogo.png"

function SideBar() {
  function handlerExit() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  return (
    <div className={style.sideBar}>
      <div className={style.containerLogoTxTs}>
          <img className={style.image} src={TxTsNavBarLogo} alt="TxTsLogo" />
      </div>
      <IconButtons
        iconButton={[
          { nameIcon: "bx bx-user", directTo: "/home/profile" },
          { nameIcon: "bx bx-wallet-alt", directTo: "null" },
          { nameIcon: "bx bx-bell", directTo: "null" },
          { nameIcon: "bx bx-plus-circle", directTo: "null" },
          { nameIcon: "bx bx-chat", directTo: "null" },
        ]}/>
       <IconButtons iconButton={[ {nameIcon:"bx bx-help-circle", directTo:"null"}, { nameIcon: "bx bx-log-in", directTo: "null", action: handlerExit}]} separationTop={true}/>
    </div>
  );
}

export default SideBar;
