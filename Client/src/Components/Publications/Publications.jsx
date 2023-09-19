import React, { useState } from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./Publications.module.scss";
import ModalPublication from '../ModalPublication/ModalPublication';


function Publications({onClick, image, text, nombre, nombreUsuario}) {
 

  return (
    <div className={style.publications}>
      <div className={style.headerPublication}>
        <div className={style.containerImage}>
          <img className={style.image} src={NotUser} alt="" />
        </div>
        <div>
          <p>{nombre}</p>
          <p>@ {nombreUsuario}</p>
        </div>
      </div>
      <div className={style.containerPublication}>
        <p>{text}</p>
        {image
        ?<div className={style.spaceImage}>
          <div className={style.containerImagePublications}>
            <img onClick={() => onClick()} className={style.imagePublication} src={NotUser} alt="" />
          </div>
        </div>
        :null}
      </div>
          
      
    </div>
  )
}

export default Publications