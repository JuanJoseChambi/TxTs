import React, { useEffect, useState } from 'react'
import style from "./Modal.module.scss"
import Inputs from '../Inputs/Inputs'

function Modal({ title, text, close, state, actionPress, textBtn, input}) {
    const [visibleModal, setVisibleModal] = useState(true)

    function hanlderClose () {
        setVisibleModal(false)
        setTimeout(() => {
            close();
        }, 500); 
    }
    
    useEffect(() => {
    const modal = document.getElementById("modal");
    function callback (entrys) {
        entrys.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(style.modalVisible)
            }
        })}
    const option = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    }
    const observadorModal = new IntersectionObserver(callback, option);
    observadorModal.observe(modal)
},[])

    function handlerModalAction () {
        hanlderClose()
        actionPress()
    }

  return (
    <div className={`${style.viewModal} ${!visibleModal && style.closeModal}`} id='modal'>
       <div className={style.modal}>
        <button className={style.btn} onClick={hanlderClose}><i  className='bx bx-x-circle'></i></button>
        <h2>{title}</h2>
        <p>{text}</p>
        {textBtn ? <Inputs inputs={[{txt:title, typ:input.typ, name:input.name}]} textBtn={textBtn} actionPress={handlerModalAction} state={state} /> : null}


       </div>
    </div>
  )
}

export default Modal