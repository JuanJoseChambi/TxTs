import React, { useState } from "react";
import style from "./UpDateInfo.module.scss";
import Modal from "../Modal/Modal";
function UpDateInfo({ title, info, state, actionPress,textBtn, input }) {
  const [activeModal, setActiveModal] = useState(false);

  return (
    <>
      <div className={style.upDateInfo}>
        <h4>{title}</h4>
        <div className={style.edit}>
          <p>{info}</p>
          <i
            onClick={() => setActiveModal(!activeModal)}
            className="bx bxs-edit"
          ></i>
        </div>
      </div>
      {activeModal ? (
        <Modal
          actionPress={actionPress}
          state={state}
          title={`Modificar ${title}`}
          text={"¡Atención! Estás a punto de realizar cambios en tu perfil de usuario. Asegúrate de revisar cuidadosamente la información antes de guardar los cambios."}
          close={() => setActiveModal(!activeModal)}
          textBtn={textBtn}
          input={input}
        />
      ) : null}
    </>
  );
}

export default UpDateInfo;
