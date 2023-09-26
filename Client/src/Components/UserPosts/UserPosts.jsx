import React, { useState } from 'react'
import Options from "../../Components/Options/Options"
import style from "./UserPosts.module.scss";
import axios from 'axios';
import { alertSuccess } from '../Alerts/Alerts';
import ModalUpDate from '../ModalUpDate/ModalUpDate';

function UserPosts({user, upDate}) {
  const [isOpenOptions, setIsOpenOptions] = useState(false)
  const [isOpenModalUpDate, setIsOpenModalUpDate] = useState(false)

  async function handlerDelete (id) {
    const {data} = await axios.delete(`/api/post/delete/${id}`)
    upDate()
    alertSuccess(data.message)
  }
  function handlerUpDate (id) {

  }

  return (
    <div className={style.containerPosts}>
        <h2 className={style.title}>Publicaciones</h2>
          {user.Publications && user.Publications.length > 0
          ? user.Publications.map((post) => {
            const fecha = new Date(post.createdAt);
            const year = fecha.getFullYear();
            const month = fecha.getMonth() + 1;
            const day = fecha.getDate();
            return (
            <div key={post.id} className={style.post}>
              <i onClick={() => setIsOpenOptions(isOpenOptions === post.id ? null : post.id)} className='bx bx-dots-horizontal-rounded'></i>
              {isOpenOptions === post.id && <Options isOpen={isOpenOptions}>
                <p onClick={() => handlerDelete(post.id)}>Borrar</p>
                <p onClick={() => setIsOpenModalUpDate(isOpenModalUpDate === post.id ? null : post.id)}>Editar</p>
                </Options>}
                {post.text 
                ? <p className={style.text}>{post.text}</p> 
                : null}
                {post.image 
                ? <div className={style.containerImagePost}>
                  <img className={style.image} src={post.image} alt="Image Posted" />
                </div> 
                : null}
                <p className={style.createPost}>{day}/{month}/{year}</p>
                {isOpenModalUpDate === post.id && <ModalUpDate isOpenModalUpDate={true} onCloseModalUpDate={() => setIsOpenModalUpDate(false)} content={post.text}/>}
            </div>
            )}) 
          : <p className={style.nullPost}>Sin Publicaciones</p>}
      </div>
  )
}

export default UserPosts