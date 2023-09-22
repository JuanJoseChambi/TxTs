import React, { useState, useRef } from 'react'
import style from "./CreatePost.module.scss"
import Button from "../../Components/Button/Button"


function CreatePost() {
  const [post, setPost] = useState({
    text:"",
    image:""
  })
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
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
            </div>
            <div className={style.sectionPreviewImage}>
              <div className={style.containerImage}>
                  {previewImage? <img className={style.image} src={previewImage?previewImage:null} alt="" /> : null}
                  {/* <p>{file.name?file.name:null}</p> */}
                  {/* <p>{file.type?file.type:null}</p> */}
                  {/* <p>{file.size?file.size:null}</p> */}
              </div>
            </div>
            <Button text={"Crear Publicacion"}/>
        </div>
    </div>
  )
}

export default CreatePost