import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import style from "./NavBar.module.scss";
import TxTsNavBarLogo from "../../assets/TxTsNavBarLogo.png"
import { useSelector, useDispatch} from "react-redux";
import NotUser from "../../assets/NotUser.png"
import { setSearch } from "../../Redux/Slice/searchPost";

function NavBar() {
   // Obtener funciones y datos necesarios de React Router y Redux
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { pathname } = useLocation();
   const home = pathname === "/home";
 
   // Crear una referencia para el input
   const inputRef = useRef(null);
 
   // Estado local para el texto de búsqueda
   const [searchPost, setSearchPost] = useState({
     wanted: ""
   });
 
   // Manejar el envío de búsqueda
   function handlerSend(e) {
     e.preventDefault(); // Prevenir la recarga de la página
     dispatch(setSearch(searchPost.wanted)); // Actualizar el estado global de búsqueda
     if (!home) {
       navigate("/home"); // Navegar a la página de inicio si no se encuentra allí
     }
   }
 
   // Borrar el texto de búsqueda y restablecer el input
   function deleteSearch() {
     dispatch(setSearch(null)); // Limpiar el estado global de búsqueda
     setSearchPost({ wanted: "" }); // Limpiar el estado local de búsqueda
     inputRef.current.value = ""; // Limpiar el valor del input
   }
 
   // Obtener información del usuario desde el estado global
   const { infoUser } = useSelector(state => state.info);
  return (
    <div className={style.viewNav}>

      <div className={style.containerLogoTxTs}>
          <img className={style.image} src={TxTsNavBarLogo} alt="TxTsLogo" />
      </div>

      <form className={style.inputContainer}>
        <label className={style.icon}><i onClick={(e) => handlerSend(e)} className='bx bx-search-alt-2'></i></label>
        <input ref={inputRef} className={style.input} name="search" type="text" placeholder="Buscar Post" onKeyDown={(e) => {if(e.key === "Enter"){ handlerSend(e)}}} onChange={(e) => setSearchPost({wanted:e.target.value})}/>
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
