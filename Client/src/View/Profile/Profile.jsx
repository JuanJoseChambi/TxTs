import React, { useState } from "react";
import style from "./Profile.module.scss";
import UpDateInfo from "../../Components/UpDateInfo/UpDateInfo";
import axios from "axios";
import NotUser from "../../assets/NotUser.png"
import { useSelector, useDispatch } from "react-redux";
import { setInfo } from "../../Redux/Slice/info";

function Profile() {
  const { infoUser} = useSelector(state => state.info)
  const dispatch = useDispatch()

  const [upDate, setUpDate] = useState({
    nombre:"",
    apellido:"",
    nombreUsuario:"",
    email:"",
    contraseña:"",
    bio:"",
    image:""
  })

  async function handlerUpDate () {
    if (upDate.nombre || upDate.apellido || upDate.nombreUsuario || upDate.email || upDate.contraseña || upDate.bio || upDate.image) {
      const {data} = await axios.put(`/api/user/${infoUser.id}`, upDate);
      dispatch(setInfo(data))
    }
  }

  return (
    <div className={style.viewProfile}>
      
      <div className={style.update}>
        <div className={style.block}>
          <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"text", name:"nombre"}} state={{set:setUpDate, stte:upDate}} title={"Nombre"} info={`${infoUser.nombre}`}/>
          <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"text", name:"apellido"}} state={{set:setUpDate, stte:upDate}} title={"Apellido"} info={`${infoUser.apellido}`}/>
        </div>
        <div className={style.block}>
          <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"text", name:"nombreUsuario"}} state={{set:setUpDate, stte:upDate}} title={"Nombre de Usuario"} info={`${infoUser.nombreUsuario}`}/>
          <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"text", name:"email"}} state={{set:setUpDate, stte:upDate}} title={"Email"} info={`${infoUser.email}`}/>
        </div>
        <div className={style.block}>
          <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"password", name:"contraseña"}} state={{set:setUpDate, stte:upDate}} title={"Password"} info={"*******"}/>
        </div>
      </div>
      <div className={style.imageUser}>
        <div className={style.containerImage}>
          <img src={infoUser.image ? infoUser.image : NotUser} alt="NotUserImage" />
        </div>
        <div className={style.bio}>
          <h3>Bigrafia</h3>
          <p>
            {infoUser.bio ? infoUser.bio : "Agregar Biografia"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
