import React, { useRef }from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./ModalPublication.module.scss"
import useFadeOnScroll from '../../Hooks/useFadeOnScroll';

function ModalPublication({isOpen, onClose, image, text}) {
  if(!isOpen) return null;
  
  const modal = useRef(null);
  useFadeOnScroll(modal, style.activeModal);

  return (
    <div className={style.viewModal} ref={modal}>
      <i onClick={onClose} class='bx bx-x'></i>
      <div className={style.modal}>
        {image && text
        ? <>
          <div className={style.containerImage}>
            <img src={NotUser} alt="" /> 
            <p>@Jotta</p>
          </div>
          <div className={style.containerTextImage}>
            <p>{text}</p>
          </div>
        </>
        : 
        (image 
        ? <div className={style.containerImage}>
            <img src={NotUser} alt="" /> 
            <p>@Jotta</p>
          </div> 
        : <div className={style.containerText}>
            <p>{text}</p>
          </div>)}
        
      </div>
    </div>
  )
}

export default ModalPublication