import React from 'react'
import style from "./Home.module.scss"
import NavBar from '../../Components/NavBar/NavBar'
import SideBar from '../../Components/SideBar/SideBar'
function Home() {
  return (
    <div className={style.viewHome}>
      <NavBar/>
      <SideBar/>
      Hola
    </div>
  )
}

export default Home