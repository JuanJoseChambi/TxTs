import React, { useState } from "react";
import style from "./Profile.module.scss";
import UpDateInfo from "../../Components/UpDateInfo/UpDateInfo";

function Profile() {

  const [upDate, setUpDate] = useState({
    nombre:"",
    apellido:"",
    nombreUsuario:"",
    email:"",
    password:""
  })

  return (
    <div className={style.viewProfile}>
      <div>
        <UpDateInfo state={{set:setUpDate, stte:upDate}} title={"Nombre"} info={"Jose"}/>
        <UpDateInfo title={"Apellido"} info={"Chambi"}/>
        <UpDateInfo title={"Nombre de Usuario"} info={"Jotta"}/>
        <UpDateInfo title={"Email"} info={"juan@gmail.com"}/>
        <UpDateInfo title={"Email"} info={"juan@gmail.com"}/>

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
