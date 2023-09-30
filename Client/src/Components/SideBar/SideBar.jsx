import React from "react";
import style from "./SideBar.module.scss";
import IconButtons from "../IconButtons/IconButtons";

function SideBar() {
  function handlerExit() {
    localStorage.removeItem("token");
    localStorage.removeItem("info")
    window.location.reload();
  }
  return (
    <div className={style.sideBar}>
      
      <IconButtons
        iconButton={[
          { nameIcon: "bx bx-user", directTo: "/profile" },
          { nameIcon: 'bx bx-home-alt-2', directTo: "/home" },
          { nameIcon: "bx bx-plus-circle", directTo: "/createPost" },
        ]}/>
       <IconButtons iconButton={[ {nameIcon:"bx bx-help-circle", directTo:"/about"}, { nameIcon: "bx bx-log-in", directTo: "/register", action: handlerExit}]} separationTop={true}/>
    </div>
  );
}

export default SideBar;
