import React from 'react'
import style from "./ModalUpDate.module.scss"
import Button from "../Button/Button"

function ModalUpDate({isOpenModalUpDate, onCloseModalUpDate, content}) {
    if(!isOpenModalUpDate) return null;


  return (
    <div className={style.viewModalUpDate}>
        <div className={style.modalUpDate}>
            <i onClick={onCloseModalUpDate} className='bx bx-x'></i>
            <h2 className={style.title}>Editar Post</h2>
            <textarea type="text" placeholder={content}/>
            <Button text={"Actualizar"}/>
        </div>
    </div>
  )
}

export default ModalUpDate