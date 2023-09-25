import React, { useState, useRef } from 'react';
import style from "./CreatePost.module.scss";
import Button from "../../Components/Button/Button";
import axios from 'axios';
import { alertError, alertSuccess } from '../../Components/Alerts/Alerts';

function CreatePost() {
  const [post, setPost] = useState({
    text:"",
    image:""
  })
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ textValue ,setTextValue] = useState(undefined)
  const preset_key = "TxTsData";
  const cloud_name = "dth62bdky";
  const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file)

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const info = JSON.parse(localStorage.getItem("info"));
  
  async function handlerSelectImage () {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", preset_key);
    const response = await axios.post(URL, formData);
    const secureUrl = response.data.secure_url;
    setPost({ ...post, image: secureUrl });
    alertSuccess("Imagen Selecionada")
    setSelectedFile(null)
  }

  async function handlerPost() {
    try {
        // Crear la publicación
        if (post.image || post.text) {
          const { data } = await axios.post(`/api/post/${info.id}`, post);
          if (data.create) {
            alertSuccess(data.message);
            setPost({
              text: "",
              image: ""
            });
            setPreviewImage(null);
            setTextValue("")
          } else {
            alertError(data.message);
          }
        }else{
          alertError("No esta en el estado")
        }
    } catch (error) {
      console.error("Error en la función handlerPost", error);
    }
  }


  const selectImage = useRef(null)
  function hanlderClickInput () {
    if (selectImage.current) {
      selectImage.current.click()
    }
  }

  return (
    <div className={style.viewCreatePost}>
        <div className={style.sectionCreate}>
            <h2 className={style.title}>Crear Publicacion</h2>
            <div className={style.containerOptions}>
                <textarea className={style.textarea} value={textValue} placeholder='Ej: Hola Hoy tuve un gran dia' onChange={(e) => setPost({...post, text:e.target.value})}></textarea>
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