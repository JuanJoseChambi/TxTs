import React from "react";
import style from "./SideBar.module.scss";
import IconButtons from "../IconButtons/IconButtons";
function SideBar() {
  function handlerExit() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  return (
    <div className={style.sideBar}>
      <IconButtons
        iconButton={[
          { nameIcon: "bx bx-user", directTo: "/home/profile",name:"Perfil" },
          { nameIcon: "bx bx-wallet-alt", directTo: "null", name:"Billetera" },
          { nameIcon: "bx bx-bell", directTo: "null", name:"Notificaciones" },
          { nameIcon: "bx bx-plus-circle", directTo: "null",name:"Crear" },
          { nameIcon: "bx bx-chat", directTo: "null", name:"Mensajes" },
        ]}/>
       <IconButtons iconButton={[
        { nameIcon: "bx bx-log-in", directTo: "null", action: handlerExit, name:"Salir"},
       ]} separationTop={true}/>
    </div>
  );
}

export default SideBar;
