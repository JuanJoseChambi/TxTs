import React from 'react'
import style from "./Modal.module.scss"
import Inputs from '../Inputs/Inputs'

function Modal({}) {
  return (
    <div className={style.viewModal}>
       <div className={style.modal}>
        <h4>Modificar Email</h4>
       <p>¡Atención! Estás a punto de realizar cambios en tu perfil de usuario. Asegúrate de revisar cuidadosamente la información antes de guardar los cambios.</p>
       <Inputs
        register={true}
        inputs={[{txt:"Enail"}]} 
        textBtn={"Actualizar"}
       />
       </div>
    </div>
  )
}

export default Modal