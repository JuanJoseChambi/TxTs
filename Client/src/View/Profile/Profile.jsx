import React, { useState } from "react";
import style from "./Profile.module.scss";
import UpDateInfo from "../../Components/UpDateInfo/UpDateInfo";
import axios from "axios";
import NotUser from "../../assets/NotUser.png"
import { useSelector, useDispatch } from "react-redux";
import { setInfo } from "../../Redux/Slice/info";
import {  alertError, alertSuccess } from "../../Components/Alerts/Alerts";
import Modal from "../../Components/Modal/Modal";
import Inputs from "../../Components/Inputs/Inputs";
import Button from "../../Components/Button/Button";

function Profile() {
  const { infoUser} = useSelector(state => state.info)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const [upDate, setUpDate] = useState({
    nombre:"",
    apellido:"",
    nombreUsuario:"",
    email:"",
    contraseña:"",
    bio:"",
    image:""
  })
  function handlerEditImage () {
    setIsOpen(true)
  }
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
  const preset_key = "portafolio";
  const cloud_name = "dth62bdky";
  const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  async function hanlderImage (event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      axios.post(URL, formData)
        .then((response) => { setProyects({ ...proyects, imagenes: [...proyects.imagenes, response.data.secure_url ]});
  })
  .catch((err) => alert(err));
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
          <i onClick={handlerEditImage} className='bx bx-image-add'></i>
         
        </div>
        <div className={style.bio}>
          <h2>Bigrafia</h2>
          <textarea placeholder={infoUser.bio? infoUser.bio:"Bigrafia"} onChange={(e) => setUpDate({...upDate, bio:e.target.value})}/>
          {!upDate.bio? <i onClick={handlerUpDate} className="bx bxs-edit"></i>: <i onClick={handlerUpDate} class='bx bx-check'></i>}
        </div>
      </div>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)} title={"Editar Foto de Perfil"} text={"Estas de Acuerdo con Cambiar la Foto de Perfil?"}>
            <input type="file" />
            <Button/>
            {/* <Inputs state={{set:setUpDate, stte:upDate}} inputs={[{typ:"file", txt:"Null", name:"image"}]} textBtn={"Cambiar Imagen"}/> */}
          </Modal>
    </div>
  );
}

export default Profile;
