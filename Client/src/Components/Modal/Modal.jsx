import React from 'react'
import style from "./Modal.module.scss"
import Inputs from '../Inputs/Inputs'

function Modal({close}) {
  return (
    <div className={style.viewModal}>
       <div className={style.modal}>
        <button className={style.btn}>
            <i onClick={close} class='bx bx-x-circle'></i>    
        </button>
        <h2>Modificar Email</h2>
       <p>¡Atención! Estás a punto de realizar cambios en tu perfil de usuario. Asegúrate de revisar cuidadosamente la información antes de guardar los cambios.</p>
       <Inputs
        register={true}
        inputs={[{txt:"Email"}]} 
        textBtn={"Actualizar"}
       />
       </div>
    </div>
  )
}

export default Modal