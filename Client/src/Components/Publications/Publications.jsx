import React, { useRef, useState } from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./Publications.module.scss";
import ModalPublication from '../ModalPublication/ModalPublication';
import useFadeOnScroll from '../../Hooks/useFadeOnScroll';


function Publications({image, text, nombre, nombreUsuario, imageProfile}) {
  const [isOpen, setIsOpen] = useState(false);
  const publicationsRef = useRef(null)
  function handlerModal () {
    setIsOpen(!isOpen)
  }
  useFadeOnScroll(publicationsRef, style.publicationsVisible)
  document.body.style.overflowY = isOpen ? 'hidden' : 'auto'

  return (
    <div className={style.publications} ref={publicationsRef}>
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