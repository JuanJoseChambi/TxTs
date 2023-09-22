import React, { useState, useRef } from "react";
import style from "./Profile.module.scss";
import UpDateInfo from "../../Components/UpDateInfo/UpDateInfo";
import axios from "axios";
import NotUser from "../../assets/NotUser.png"
import { useSelector, useDispatch } from "react-redux";
import { setInfo } from "../../Redux/Slice/info";
import {  alertError, alertSuccess } from "../../Components/Alerts/Alerts";

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
      if (data.update === false) {
        alertError(data.message)
        setUpDate({
          nombreUsuario:"",
          email:"",
        })
        return
      }else{
        dispatch(setInfo(data));
        alertSuccess(`Tu Informacion fue Actualizada`)
        setUpDate({
          nombre:"",
          apellido:"",
          nombreUsuario:"",
          email:"",
          contraseña:"",
          bio:"",
          image:""
        })
      }
    }
  }
  const fileInputRef = useRef(null);
  function handlerEditImage () {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const preset_key = "TxTsData";
  const cloud_name = "dth62bdky";
  const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  async function handlerImage(event) {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      const response = await axios.post(URL, formData);
      const secureUrl = response.data.secure_url;
      setUpDate({ ...upDate, image: secureUrl});
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={style.viewProfile}>
      <div className={style.update}>
      <h2 className={style.title}>Modificar Datos</h2>
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
          {upDate.image ? <i onClick={handlerUpDate} class='bx bx-check'></i> : <i onClick={handlerEditImage} className='bx bx-image-add'></i>}
          <input type="file" style={{display:"none"}} onChange={handlerImage} ref={fileInputRef} />
        </div>
        <div className={style.bio}>
          <h2>Bigrafia</h2>
          <textarea placeholder={infoUser.bio? infoUser.bio:"Bigrafia"} onChange={(e) => setUpDate({...upDate, bio:e.target.value})}/>
          {!upDate.bio? <i onClick={handlerUpDate} className="bx bxs-edit"></i>: <i onClick={handlerUpDate} class='bx bx-check'></i>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
