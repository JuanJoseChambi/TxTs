import React, { useState, useRef } from 'react'
import style from "./CreatePost.module.scss"
import Button from "../../Components/Button/Button"


function CreatePost() {
  const [post, setPost] = useState({
    text:"",
    image:""
  })
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

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
                <p>{file.name?file.name:null}</p>
                <p>{file.type?file.type:null}</p>
                <p>{file.size?file.size:null}</p>
                <img src={previewUrl?previewUrl:null} alt="" />
            </div>
            <Button text={"Crear Publicacion"}/>
        </div>
    </div>
  )
}

export default CreatePost