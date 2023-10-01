import React, { useEffect, useRef, useState } from 'react'
import style from "./Home.module.scss"
import Publications from '../../Components/Publications/Publications'
import useFadeOnScroll from '../../Hooks/useFadeOnScroll'
import axios from "axios"
import { useSelector } from 'react-redux'

function Home() {
 // Estado local para almacenar las publicaciones
 const [posts, setPosts] = useState([]);

 // Referencia para el elemento DOM viewHome
 const viewHome = useRef(null);

 // Aplicar efecto de desvanecimiento al desplazarse
 useFadeOnScroll(viewHome, style.homeVisible);

 // Obtener el término de búsqueda desde el estado global
 const search = useSelector((state) => state.search);

 // Función para obtener las publicaciones desde la API
 async function handlerPosts() {
   try {
     const { data } = await axios.get(`/api/post?searchPost=${search.search || ''}`);
     // Invertir el orden de las publicaciones
     const postOrder = data.reverse();
     setPosts(postOrder);
   } catch (error) {
     console.error('Error al obtener las publicaciones:', error);
   }
 }

 // Cargar las publicaciones cuando cambia el término de búsqueda
 useEffect(() => {
   handlerPosts();
 }, [search]);

  return (
    <div className={style.viewHome} ref={viewHome}>
      {posts.map(post => (
        <Publications key={post.id} imageProfile={post.User.image} nombre={post.User.nombre} nombreUsuario={post.User.nombreUsuario} text={post.text} image={post.image}/>
      ))}
    </div>
  )
}

export default Home