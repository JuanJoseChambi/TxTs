import React, { useState, useRef } from 'react'
import style from "./Modal.module.scss"
import Inputs from '../Inputs/Inputs'
import useFadeOnScroll from '../../Hooks/useFadeOnScroll'

function Modal({ title, text, close, state, actionPress, textBtn, input}) {

    const [visibleModal, setVisibleModal] = useState(true)
    const modalUpdate = useRef(null)
    
    useFadeOnScroll(modalUpdate, style.modalVisible);
  document.body.style.overflowY = visibleModal ? 'hidden' : 'auto'
    
    
    function hanlderClose () {
        setVisibleModal(false)
    }
    function handlerModalAction () {
        hanlderClose()
        actionPress()
    }
    function handleTransitionEnd() {
        if (!visibleModal) {
          close();
        }
      }

  return (
    <div className={`${style.viewModal} ${!visibleModal && style.closeModal}`} ref={modalUpdate} onTransitionEnd={handleTransitionEnd}>
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