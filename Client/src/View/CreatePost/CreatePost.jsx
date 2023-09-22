import React, { useState, useRef } from 'react';
import style from "./CreatePost.module.scss";
import Button from "../../Components/Button/Button";
import axios from 'axios';
import { alertSuccess } from '../../Components/Alerts/Alerts';

function CreatePost() {
  const [post, setPost] = useState({
    text:"",
    image:""
  })
  const [previewImage, setPreviewImage] = useState(null);
  const [imageAcept, setImageAcept] = useState(null);
  const preset_key = "TxTsData";
  const cloud_name = "dth62bdky";
  const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      if (selectedFile) {
        // Vista previa de la image
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        // Subir Imagen a la Cloudinary
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", preset_key);
        setImageAcept(formData)
      }
    } catch (error) {
        alert(error);
    }
  };
  const info = JSON.parse(localStorage.getItem("info"))

  async function handlerPost () {
    const response = await axios.post(URL, imageAcept);
    const secureUrl = response.data.secure_url;
    setPost({ ...post, image: secureUrl});

    if (post.text || post.image) {
      const {data} = await axios.post(`/api/post/${info.id}`, post)
      if (data.create) {
        alertSuccess(data.message);
      }else{
        data.message
      }
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
                <textarea className={style.textarea} placeholder='Ej: Hola Hoy tuve un gran dia' onChange={(e) => setPost({...post, text:e.target.value})}></textarea>
                <i onClick={hanlderClickInput} className='bx bx-image-add'></i>
                <input type="file" style={{display:"none"}} onChange={handleFileChange} ref={selectImage}/>
            </div>
            {previewImage
            ? <div className={style.sectionPreviewImage}>
                <div className={style.containerImage}>
                  {previewImage? <img className={style.image} src={previewImage?previewImage:null} alt="" /> : null}
                </div>
              </div>
            :null}
            <Button onClick={handlerPost} text={"Crear Publicacion"}/>
        </div>
    </div>
  )
}

export default CreatePost