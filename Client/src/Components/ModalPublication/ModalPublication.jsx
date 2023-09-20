import React, {useEffect, useRef}from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./ModalPublication.module.scss"
import useIntersection from '../../Hooks/useIntersection';

function ModalPublication({isOpen, onClose, image, text}) {
  if(!isOpen) return null;
  
  const modal = useRef(null);
  useIntersection(modal, style.activeModal);

  return (
    <div className={style.viewModal} ref={modal}>
      <div className={style.modal}>
        <div className={style.containerImage}>
          {/* {image? <img src={NotUser} alt="" /> : null} */}
          <img src={NotUser} alt="" />
        </div>
        <div className={style.containerText}>
          {/* <p>{text}</p> */}
          <p>Holaa</p>
        </div>
      </div>
    </div>
  )
}

export default ModalPublication