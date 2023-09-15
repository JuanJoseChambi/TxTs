import React, { useState } from 'react'
import style from "./UpDateInfo.module.scss";
import Modal from '../Modal/Modal';
function UpDateInfo({ title, info, state, action}) {

    const [activeModal, setActiveModal] = useState(false)

  return (
    <>
        <div className={style.upDateInfo}>
            <h4>{title}</h4>
            <div className={style.edit}>
                <p>{info}</p>
                    <i onClick={() => setActiveModal(!activeModal)} class='bx bxs-edit'></i>
            </div>
        </div>
        {activeModal? <Modal close={() => setActiveModal(!activeModal)}/> : null}
    </>
  )
}

export default UpDateInfo