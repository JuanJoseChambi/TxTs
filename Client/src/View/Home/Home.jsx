import React, { useEffect, useRef, useState } from 'react'
import style from "./Home.module.scss"
import Publications from '../../Components/Publications/Publications'
import useFadeOnScroll from '../../Hooks/useFadeOnScroll'
import axios from "axios"

function Home() {
  const viewHome = useRef(null)
  const [posts, setPosts] = useState([])
  async function handlerPosts () {
    const {data} = await axios.get(`/api/post?searchPost=`)
    setPosts(data)
    console.log(data);
  }


  useFadeOnScroll(viewHome, style.homeVisible)
  useEffect(() => {
    handlerPosts()
  },[])

  return (
    <div className={style.viewHome} ref={viewHome}>
      {posts.map(post => (
        <Publications key={post.UserPublications} imageProfile={post.User.image} nombre={post.User.nombre} nombreUsuario={post.User.nombreUsuario} text={post.text} image={post.image}/>
      ))}
    </div>
  )
}

export default Home