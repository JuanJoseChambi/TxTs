import React, { useState } from 'react'
import style from "./UpDateInfo.module.scss";
import Modal from '../Modal/Modal';
function UpDateInfo({ title, info, state, actionPress}) {
   

    const [activeModal, setActiveModal] = useState(false)

  return (
    <>
        <div className={style.upDateInfo}>
            <h4>{title}</h4>
            <div className={style.edit}>
                <p>{info}</p>
                    <i onClick={() => setActiveModal(!activeModal)} className='bx bxs-edit'></i>
            </div>
        </div>
        {activeModal? <Modal actionPress={actionPress} state={state} update={true} title={title} text={"Hola"} close={() => setActiveModal(!activeModal)}/> : null}
    </>
  )
}

export default UpDateInfo