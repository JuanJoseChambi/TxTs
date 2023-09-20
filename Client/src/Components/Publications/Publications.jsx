import React, { useEffect, useState } from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./Publications.module.scss";
import ModalPublication from '../ModalPublication/ModalPublication';


function Publications({image, text, nombre, nombreUsuario}) {
  const [isOpen, setIsOpen] = useState(false);

  function handlerModal () {
    setIsOpen(!isOpen)
  }
  
  document.body.style.overflowY = isOpen ? 'hidden' : 'auto'

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
        <p onClick={handlerModal}>{text}</p>
        {image
        ?<div className={style.spaceImage}>
          <div className={style.containerImagePublications}>
            <img onClick={handlerModal} className={style.imagePublication} src={NotUser} alt="" />
          </div>
        </div>
        :null}
      </div>
          
      <ModalPublication onClose={handlerModal} text={text} image={image} isOpen={isOpen}/>
      
    </div>
  )
}

export default Publications