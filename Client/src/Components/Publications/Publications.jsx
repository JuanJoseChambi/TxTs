import React, { useEffect, useState } from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./Publications.module.scss";
import ModalPublication from '../ModalPublication/ModalPublication';
import { useSelector } from 'react-redux';


function Publications({image, text, nombre, nombreUsuario, imageProfile}) {
  const [isOpen, setIsOpen] = useState(false);

  function handlerModal () {
    setIsOpen(!isOpen)
  }
  const {infoUser} = useSelector(state => state.info)

  document.body.style.overflowY = isOpen ? 'hidden' : 'auto'

  return (
    <div className={style.publications}>
      <div className={style.headerPublication}>
        <div className={style.containerImage}>
          <img className={style.image} src={imageProfile? imageProfile : NotUser} alt="Profile Image" />
        </div>
        <div>
          <p>{nombre}</p>
          <p>@{nombreUsuario}</p>
        </div>
      </div>
      <div className={style.containerPublication}>
        <p onClick={handlerModal}>{text}</p>
        <div className={style.spaceImage}>
          <div className={style.containerImagePublications}>
            <img onClick={handlerModal} className={style.imagePublication} src={image} alt="" />
          </div>
        </div>
      </div>
          
      <ModalPublication onClose={handlerModal} nombreUsuario={nombreUsuario} text={text} image={image} isOpen={isOpen}/>
      
    </div>
  )
}

export default Publications