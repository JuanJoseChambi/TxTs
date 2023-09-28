import React, { useRef } from 'react'
import style from "./ModalUpDate.module.scss"
import useFadeOnScroll from '../../Hooks/useFadeOnScroll';

function ModalUpDate({isOpenModalUpDate, onCloseModalUpDate, title, children}) {
    if(!isOpenModalUpDate) return null;
    const modalUpdate = useRef(null)

  useFadeOnScroll(modalUpdate, style.upDateModalVisible)
  return (
    <div className={style.viewModalUpDate} ref={modalUpdate}>
        <div className={style.modalUpDate}>
            <i onClick={onCloseModalUpDate} className='bx bx-x'></i>
            <h2 className={style.title}>{title}</h2>
            {children}
        </div>
    </div>
  )
}

export default ModalUpDate