import React from 'react'
import style from "./SideBar.module.scss"
function SideBar() {
  function handlerExit ()  {
    localStorage.removeItem("token")
    window.location.reload()
  }
  return (
    <div className={style.sideBar}>
      <button className={style.icon} onClick={handlerExit}><i className='bx bx-log-in' ></i></button>
    </div>
  )
}

export default SideBar