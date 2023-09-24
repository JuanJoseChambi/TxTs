import React, { useState, useRef, useEffect } from "react";
import style from "./Profile.module.scss";
import UpDateInfo from "../../Components/UpDateInfo/UpDateInfo";
import axios from "axios";
import NotUser from "../../assets/NotUser.png"
import { useSelector, useDispatch } from "react-redux";
import { setInfo } from "../../Redux/Slice/info";
import {  alertError, alertSuccess } from "../../Components/Alerts/Alerts";

function Profile() {
  const { infoUser} = useSelector(state => state.info)
  const [user, setUser] = useState({})
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
      const {data} = await axios.put(`/api/user/${user.id}`, upDate);
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
  async function handlerUserProfile() {
    const token = localStorage.getItem("token")
    try {
      const headers = {
        Authorization: `${token}`,
      };
      const {data} = await axios.get(`/api/user?id=${infoUser.id}`, { headers });
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }
  useEffect(() => {
    handlerUserProfile()
  },[])

  return (
    <div className={style.viewProfile}>
      <div className={style.upDateAndImage}>
        <div className={style.update}>
          <h2 className={style.title}>Modificar Datos</h2>
          <div className={style.block}>
            <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"text", name:"nombre"}} state={{set:setUpDate, stte:upDate}} title={"Nombre"} info={`${user.nombre}`}/>
            <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"text", name:"apellido"}} state={{set:setUpDate, stte:upDate}} title={"Apellido"} info={`${user.apellido}`}/>
          </div>
          <div className={style.block}>
            <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"text", name:"nombreUsuario"}} state={{set:setUpDate, stte:upDate}} title={"Nombre de Usuario"} info={`${user.nombreUsuario}`}/>
            <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"text", name:"email"}} state={{set:setUpDate, stte:upDate}} title={"Email"} info={`${user.email}`}/>
          </div>
          <div className={style.block}>
            <UpDateInfo actionPress={handlerUpDate} textBtn={"Enviar"} input={{typ:"password", name:"contraseña"}} state={{set:setUpDate, stte:upDate}} title={"Password"} info={"*******"}/>
          </div>
        </div>

        <div className={style.imageUser}>
          <div className={style.containerImage}>
            <img src={user.image ? user.image : NotUser} alt="NotUserImage" />
            {upDate.image ? <i onClick={handlerUpDate} class='bx bx-check'></i> : <i onClick={handlerEditImage} className='bx bx-image-add'></i>}
            <input type="file" style={{display:"none"}} onChange={handlerImage} ref={fileInputRef} />
          </div>
          <div className={style.bio}>
            <h2>Bigrafia</h2>
            <textarea placeholder={user.bio? user.bio:"Bigrafia"} onChange={(e) => setUpDate({...upDate, bio:e.target.value})}/>
            {!upDate.bio? <i onClick={handlerUpDate} className="bx bxs-edit"></i>: <i onClick={handlerUpDate} class='bx bx-check'></i>}
          </div>
        </div>  
      </div>      
      <div className={style.containerPosts}>
        <h2 className={style.title}>Publicaciones</h2>
        <div className={style.post}>
          <p className={style.text}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam in ducimus expedita cupiditate ut omnis. Fugiat at consectetur enim, voluptatem tenetur quis delectus veritatis error est praesentium ducimus rem voluptate.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolorem excepturi suscipit delectus ex impedit ipsa iste eum sapiente odit? Sequi culpa incidunt, vero odio ipsa ex unde harum doloribus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam temporibus ea facilis at! Aliquid temporibus dolorum eos, quod magnam qui, est eligendi odit magni laborum delectus vitae voluptate. Est, ex.
          </p>
          <div className={style.containerImagePost}>
            <img className={style.image} src={NotUser} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
