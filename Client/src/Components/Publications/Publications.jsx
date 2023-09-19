import React from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./Publications.module.scss";


function Publications({image}) {

  return (
    <div className={style.publications}>
      <div className={style.headerPublication}>
        <div className={style.containerImage}>
          <img className={style.image} src={NotUser} alt="" />
        </div>
        <div>
          <p>Juan Jose</p>
          <p>@Jotta</p>
        </div>
      </div>
      <div className={style.containerPublication}>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga obcaecati sequi delectus natus suscipit necessitatibus dignissimos excepturi sapiente, nam optio provident accusamus consectetur assumenda magni a illo maxime dolores exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. At praesentium, vitae beatae nemo nulla fugiat eum libero possimus, pariatur doloribus officia velit sed perspiciatis ex rem dicta! Omnis, atque laboriosam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse iste sunt accusamus quos fugit consectetur amet, voluptate, atque ab quibusdam minus suscipit enim a veniam necessitatibus eius recusandae corrupti rem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt est animi fugit vel accusantium, sapiente corrupti eaque odio natus repellendus minima quam delectus facilis adipisci earum! Ipsa, et omnis. Recusandae?</p>
        {image
        ?<div className={style.spaceImage}>
          <div className={style.containerImagePublications}>
            <img className={style.imagePublication} src={NotUser} alt="" />
          </div>
        </div>
        :null}
      </div>

    </div>
  )
}

export default Publications