import React, { useState, useRef } from 'react';
import style from "./CreatePost.module.scss";
import Button from "../../Components/Button/Button";
import axios from 'axios';
import { alertError, alertSuccess } from '../../Components/Alerts/Alerts';
import useFadeOnScroll from '../../Hooks/useFadeOnScroll';

function CreatePost() {
   // Estado local para el texto y la imagen de la publicación
   const [post, setPost] = useState({
    text: "",
    image: ""
  });

 // Obtiene la información del usuario desde el almacenamiento local
 const info = JSON.parse(localStorage.getItem("info"));

  // Referencia para el efecto de desvanecimiento en el scroll O al verse
  const viewCreatePost = useRef(null);
  useFadeOnScroll(viewCreatePost, style.createPostVisible);

  // Estado local para la vista previa de la imagen y el archivo seleccionado
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Configuración para cargar imágenes en Cloudinary
  const preset_key = "TxTsData";
  const cloud_name = "dth62bdky";
  const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  // Maneja el cambio de archivo seleccionado
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Maneja la selección de la imagen
  async function handlerSelectImage() {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", preset_key);
    const response = await axios.post(URL, formData);
    const secureUrl = response.data.secure_url;
    setPost({ ...post, image: secureUrl });
    alertSuccess("Imagen Seleccionada");
    setSelectedFile(null);
  }

  // Maneja la creación de una nueva publicación
  async function handlerPost() {
    try {
      if (post.image || post.text) {
        const { data } = await axios.post(`/api/post/create/${info.id}`, post);
        if (data.create) {
          alertSuccess(data.message);
          setPost({
            text: "",
            image: ""
          });
          setPreviewImage(null);
        } else {
          alertError(data.message);
        }
      } else {
        alertError("Faltan datos en la publicación");
      }
    } catch (error) {
      console.error("Error en la función handlerPost", error);
    }
  }

  // Referencia para el input de archivo
  const selectImage = useRef(null);

  // Abre el diálogo de selección de archivo
  function hanlderClickInput() {
    if (selectImage.current) {
      selectImage.current.click();
    }
  }

  return (
    <div className={style.viewCreatePost} ref={viewCreatePost}>
        <div className={style.sectionCreate}>
            <h2 className={style.title}>Crear Publicacion</h2>
            <div className={style.containerOptions}>
                <textarea className={style.textarea} placeholder='Ej: Hola Hoy tuve un gran dia' onChange={(e) => setPost({...post, text:e.target.value})}></textarea>
                {selectedFile ? <i onClick={handlerSelectImage} class='bx bx-check'></i> :  <i onClick={hanlderClickInput} className='bx bx-image-add'></i>}
                <input type="file" style={{display:"none"}} onChange={handleFileChange} ref={selectImage}/>
            </div>
            {previewImage
            ? <div className={style.sectionPreviewImage}>
                <div className={style.containerImage}>
                  {previewImage? <img className={style.image} src={previewImage?previewImage:null} alt="" /> : null}
                </div>
              </div>
            :null}
            <Button onClick={(e) => {e.preventDefault(); handlerPost(); }} text={"Crear Publicacion"}/>
        </div>
    </div>
  )
}

export default CreatePost