import React from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./Publications.module.scss";


function Publications() {

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
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga obcaecati sequi delectus natus suscipit necessitatibus dignissimos excepturi sapiente, nam optio provident accusamus consectetur assumenda magni a illo maxime dolores exercitationem.</p>
        <div className={style.spaceImage}>
          <div className={style.containerImagePublications}>
            <img className={style.imagePublication} src={NotUser} alt="" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Publications