import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import style from "./NavBar.module.scss";
import TxTsNavBarLogo from "../../assets/TxTsNavBarLogo.png"
import { useSelector } from "react-redux";
import NotUser from "../../assets/NotUser.png"
import axios from "axios"

function NavBar() {
  const [searchPost, setSearchPost] = useState({
    searchPost:""
  })
  const navigate = useNavigate()

  async function handlerSearchPost () {
    const {data} = await axios.get(`/api/post?searchPost=${searchPost.searchPost}`)
    // console.log(data);

  }
  function handlerSend (e) {
    if (e.key === "Enter") {
      handlerSearchPost()
      e.preventDefault()
      navigate("/home")
    }
  }

  const {infoUser} = useSelector(state => state.info)

  return (
    <div className={style.viewNav}>

      <div className={style.containerLogoTxTs}>
          <img className={style.image} src={TxTsNavBarLogo} alt="TxTsLogo" />
      </div>

      <form className={style.inputContainer}>
        <label className={style.icon}><i className='bx bx-search-alt-2'></i></label>
        <input className={style.input} name="search" type="text" placeholder="Buscar" onKeyDown={(e) => handlerSend(e)} onChange={(e) => setSearchPost({searchPost:e.target.value})}/>
      </form>

      <div className={style.infoUser}>
        <div className={style.containerImage}>
          <img className={style.image} src={infoUser.image ? infoUser.image : NotUser} alt="NotUserImage" />
        </div> 
      </div>
      
    </div>
  )
}

export default NavBar;
