import React, { useState } from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./Publications.module.scss";
import ModalPublication from '../ModalPublication/ModalPublication';


function Publications({image, text, nombre, nombreUsuario}) {
  const [isOpen, setIsOpen] = useState(false);

  function handlerModal () {
    setIsOpen(!isOpen)
  }

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
            <img className={style.imagePublication} src={NotUser} alt="" />
          </div>
        </div>
        :null}
      </div>
          
      
      {isOpen ? <ModalPublication text={text} image={image}/> : null}
    </div>
  )
}

export default Publications