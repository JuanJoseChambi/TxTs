import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import style from "./NavBar.module.scss";
import TxTsNavBarLogo from "../../assets/TxTsNavBarLogo.png"
import { useSelector, useDispatch} from "react-redux";
import NotUser from "../../assets/NotUser.png"
import { setSearch } from "../../Redux/Slice/searchPost";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const home = pathname === "/home"
  const inputRef = useRef(null)

  const [searchPost, setSearchPost] = useState({
    wanted:""
  })

  function handlerSend (e) {
    if (e.key === "Enter") {
      e.preventDefault()
      dispatch(setSearch(searchPost.wanted))
      if (!home) {
        navigate("/home")
      }
    }
  }
  function deleteSearch () {
    dispatch(setSearch(null))
    setSearchPost({wanted:""})
    inputRef.current.value = ""
  }
  const {infoUser} = useSelector(state => state.info)
  return (
    <div className={style.viewNav}>

      <div className={style.containerLogoTxTs}>
          <img className={style.image} src={TxTsNavBarLogo} alt="TxTsLogo" />
      </div>

      <form className={style.inputContainer}>
        <label className={style.icon}><i className='bx bx-search-alt-2'></i></label>
        <input ref={inputRef} className={style.input} name="search" type="text" placeholder="Buscar Post" onKeyDown={(e) => handlerSend(e)} onChange={(e) => setSearchPost({wanted:e.target.value})}/>
        {searchPost.wanted ? <i onClick={deleteSearch} className='bx bx-x'></i> : null}
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
