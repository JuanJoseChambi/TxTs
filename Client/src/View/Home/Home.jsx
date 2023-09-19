import React from 'react'
import style from "./Home.module.scss"
import Publications from '../../Components/Publications/Publications'
function Home() {
  return (
    <div className={style.viewHome}>
      <Publications/>
      <Publications image={true}/>
    </div>
  )
}

export default Home