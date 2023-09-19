import React, { useState } from 'react'
import style from "./Home.module.scss"
import Publications from '../../Components/Publications/Publications'
import ModalPublication from '../../Components/ModalPublication/ModalPublication'
function Home() {
  
  return (
    <div className={style.viewHome}>
      <Publications nombre={"Juan Jose"} nombreUsuario={"Jotta"} text={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga obcaecati sequi delectus natus suscipit necessitatibus dignissimos excepturi sapiente, nam optio provident accusamus consectetur assumenda magni a illo maxime dolores exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. At praesentium, vitae beatae nemo nulla fugiat eum libero possimus, pariatur doloribus officia velit sed perspiciatis ex rem dicta! Omnis, atque laboriosam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse iste sunt accusamus quos fugit consectetur amet, voluptate, atque ab quibusdam minus suscipit enim a veniam necessitatibus eius recusandae corrupti rem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt est animi fugit vel accusantium, sapiente corrupti eaque odio natus repellendus minima quam delectus facilis adipisci earum! Ipsa, et omnis. Recusandae?"}/>
      <Publications nombre={"Juan Jose"} nombreUsuario={"Jotta"} text={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga obcaecati sequi delectus natus suscipit necessitatibus dignissimos excepturi sapiente, nam optio provident accusamus consectetur assumenda magni a illo maxime dolores exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. At praesentium, vitae beatae nemo nulla fugiat eum libero possimus, pariatur doloribus officia velit sed perspiciatis ex rem dicta! Omnis, atque laboriosam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse iste sunt accusamus quos fugit consectetur amet, voluptate, atque ab quibusdam minus suscipit enim a veniam necessitatibus eius recusandae corrupti rem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt est animi fugit vel accusantium, sapiente corrupti eaque odio natus repellendus minima quam delectus facilis adipisci earum! Ipsa, et omnis. Recusandae?"} image={true}/>
      <Publications nombre={"Juan Jose"} nombreUsuario={"Jotta"} image={true}/>
    </div>
  )
}

export default Home