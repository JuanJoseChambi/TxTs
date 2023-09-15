import React, { useEffect, useState } from 'react'
import style from "./Modal.module.scss"
import Inputs from '../Inputs/Inputs'

function Modal({update, title, text, close}) {
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
        })
    }
    const option = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    }
    const observadorModal = new IntersectionObserver(callback, option);
    observadorModal.observe(modal)
},[])

  return (
    <div className={`${style.viewModal} ${!visibleModal && style.closeModal}`} id='modal'>
       <div className={style.modal}>
        <button className={style.btn} onClick={hanlderClose}><i  class='bx bx-x-circle'></i></button>

        {update?<h2>Modificar {title}</h2>:<h2>{title}</h2>}

        {update
        ? <p>¡Atención! Estás a punto de realizar cambios en tu perfil de usuario. Asegúrate de revisar cuidadosamente la información antes de guardar los cambios.</p> 
        : <p>{text}</p>}

       {update
       ? <Inputs
        register={true}
        inputs={[{txt:`${title}`}]} 
        textBtn={`Actualizar ${title}`}/> 
        : <Inputs
        register={true}
        inputs={[{txt:`${title}`}]} 
        textBtn={`Enviar`}/>}

       </div>
    </div>
  )
}

export default Modal