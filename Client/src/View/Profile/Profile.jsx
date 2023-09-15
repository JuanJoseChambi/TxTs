import React from "react";
import style from "./Profile.module.scss";
import Inputs from "../../Components/Inputs/Inputs";
import UpDateInfo from "../../Components/UpDateInfo/UpDateInfo";

function Profile() {
  return (
    <div className={style.viewProfile}>
      <div>
        <UpDateInfo/>
      </div>
    </div>
  );
}

export default Profile;
{
  /* <form className={style.formUpdate}>
          <div>
            <input type="text" placeholder='Nombre'/>
            <input type="text" placeholder='Apellido'/>
          </div>
          <div>
            <input type="text" placeholder='Nombre de Usuario'/>
            <input type="text" placeholder='Emial'/>
          </div>
          <div>
            <input type="text" />
          </div>
        </form> */
}
