import React from 'react'
import style from "./CreatePost.module.scss"
import Button from "../../Components/Button/Button"


function CreatePost() {
  return (
    <div className={style.viewCreatePost}>
        <div className={style.sectionCreate}>
            <h2 className={style.title}>Crear Publicacion</h2>
            <div className={style.containerOptions}>
                <textarea className={style.textarea} placeholder='Ej: Hola Hoy tuve un gran dia'></textarea>
                <i class='bx bx-image-add'></i>
            </div>
            <Button text={"Crear Publicacion"}/>
        </div>
    </div>
  )
}

export default CreatePost