import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import style from "./Profile.module.scss";
import NotUser from "../../assets/NotUser.png"
import UpDateInfo from "../../Components/UpDateInfo/UpDateInfo";
import { setInfo } from "../../Redux/Slice/info";
import {  alertError, alertSuccess } from "../../Components/Alerts/Alerts";
import UserPosts from "../../Components/UserPosts/UserPosts";
import useFadeOnScroll from "../../Hooks/useFadeOnScroll";
function Profile() {
  // Selector de información de usuario desde el estado global
  const { infoUser } = useSelector((state) => state.info);

  // Estado local para el usuario y datos actualizables
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [upDate, setUpDate] = useState({
    nombre: "",
    apellido: "",
    nombreUsuario: "",
    email: "",
    contraseña: "",
    bio: "",
    image: "",
  });

  // Referencia para el efecto de desvanecimiento en el scroll
  const viewProfile = useRef(null);
  useFadeOnScroll(viewProfile, style.profileVisible);

  // Maneja la actualización de datos de usuario
  async function handlerUpDate() {
    if (upDate.nombre ||upDate.apellido ||upDate.nombreUsuario ||upDate.email ||upDate.contraseña ||upDate.bio ||upDate.image) {
      const { data } = await axios.put(`/api/user/${user.id}`, upDate);
      if (data.update === true) {
        dispatch(setInfo(data.userUpDate));
        alertSuccess(`Tu Información fue Actualizada`);
        setUpDate({
          nombre: "",
          apellido: "",
          nombreUsuario: "",
          email: "",
          contraseña: "",
          bio: "",
          image: "",
        });
        handlerUserProfile();
      } else {
        alertError(data.message);
        setUpDate({
          nombreUsuario: "",
          email: "",
        });
        return;  
      }
    }
  }

  // Referencia para el input de archivo para la imagen del usuario
  const fileInputRef = useRef(null);

  // Abre el diálogo de selección de archivo para cambiar la imagen del usuario
  function handlerEditImage() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // Claves y URL para cargar imágenes en Cloudinary
  const preset_key = "TxTsData";
  const cloud_name = "dth62bdky";
  const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  // Maneja la carga de la nueva imagen del usuario
  async function handlerImage(event) {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      const response = await axios.post(URL, formData);
      const secureUrl = response.data.secure_url;
      setUpDate({ ...upDate, image: secureUrl });
    } catch (error) {
      alert(error);
    }
  }

  // Obtiene el perfil de usuario desde el servidor
  async function handlerUserProfile() {
    const token = localStorage.getItem("token");
    try {
      const headers = {
        Authorization: `${token}`,
      };
      const { data } = await axios.get(`/api/user?id=${infoUser.id}`, {
        headers,
      });
      setUser(data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  }

  // Cargar el perfil de usuario al cargar el componente
  useEffect(() => {
    handlerUserProfile();
  }, []);

  return (
    <div className={style.viewProfile} ref={viewProfile}>
      
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
            <img src={infoUser.image ? infoUser.image : NotUser} alt="NotUserImage" />
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
      
      <UserPosts user={user} upDate={handlerUserProfile}/>

    </div>
  );
}

export default Profile;
