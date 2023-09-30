import React, { useEffect, useRef, useState } from 'react'
import style from "./Home.module.scss"
import Publications from '../../Components/Publications/Publications'
import useFadeOnScroll from '../../Hooks/useFadeOnScroll'
import axios from "axios"
import { useSelector } from 'react-redux'

function Home() {
  const [posts, setPosts] = useState([])
  const viewHome = useRef(null)
  const search = useSelector(state => state.search)

  async function handlerPosts () {
    const {data} = await axios.get(`/api/post?searchPost=${search.search || ""}`)
    const postOrder = data.reverse();
    setPosts(postOrder)
    console.log(data);
    console.log(search.search);
  }


  useFadeOnScroll(viewHome, style.homeVisible)
  useEffect(() => {
    handlerPosts()
  },[search])

  return (
    <div className={style.viewHome} ref={viewHome}>
      {posts.map(post => (
        <Publications key={post.id} imageProfile={post.User.image} nombre={post.User.nombre} nombreUsuario={post.User.nombreUsuario} text={post.text} image={post.image}/>
      ))}
    </div>
  )
}

export default Home