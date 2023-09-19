import React from 'react'
import NotUser from "../../assets/NotUser.png"
import style from "./ModalPublication.module.scss"

function ModalPublication({isOpen, onClose, image, text}) {
  if(!isOpen) return null;

  return (
    <div className={style.viewModal}>
      <div className={style.modal}>
        <div className={style.containerImage}>
          {image? <img src={NotUser} alt="" /> : null}
        </div>
        <div className={style.containerText}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default ModalPublication