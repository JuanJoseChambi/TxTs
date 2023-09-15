import React, { useState } from "react";
import style from "./Profile.module.scss";
import UpDateInfo from "../../Components/UpDateInfo/UpDateInfo";
import axios from "axios";
import NotUser from "../../assets/NotUser.png"
import { useSelector } from "react-redux";

function Profile() {
  const {image, bio} = useSelector(state => state.info)

  const [upDate, setUpDate] = useState({
    nombre:"",
    apellido:"",
    nombreUsuario:"",
    email:"",
    password:""
  })

  async function handlerUpDate () {
    if (upDate.nombre || upDate.apellido || upDate.nombreUsuario || upDate.email || upDate.password) {
      await axios.post("/api/update", upDate) 
    }
  }

  return (
    <div className={style.viewProfile}>
      <div className={style.update}>
        <div className={style.block}>
          <UpDateInfo actionPress={handlerUpDate}state={{set:setUpDate, stte:upDate}} title={"Nombre"} info={"Jose"}/>
          <UpDateInfo actionPress={handlerUpDate} state={{set:setUpDate, stte:upDate}} title={"Apellido"} info={"Chambi"}/>
        </div>
        <div className={style.block}>
          <UpDateInfo actionPress={handlerUpDate} state={{set:setUpDate, stte:upDate}} title={"Nombre de Usuario"} info={"Jotta"}/>
          <UpDateInfo actionPress={handlerUpDate} state={{set:setUpDate, stte:upDate}} title={"Email"} info={"juan@gmail.com"}/>
        </div>
        <div className={style.block}>
          <UpDateInfo actionPress={handlerUpDate} state={{set:setUpDate, stte:upDate}} title={"Password"} info={"*******"}/>
        </div>
      </div>
      <div className={style.imageUser}>
        <div className={style.containerImage}>
          <img src={image ? image : NotUser} alt="NotUserImage" />
        </div>
        <div className={style.bio}>
          <h3>Bigrafia</h3>
          <p>
            {bio ? bio : "Agregar Biografia"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
