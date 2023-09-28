import React, { useRef } from "react";
import style from "./Options.module.scss"
import useFadeOnScroll from "../../Hooks/useFadeOnScroll";

function Options({ isOpen, children }) {
  if(!isOpen) return null;

  const optionsPost = useRef(null);
  useFadeOnScroll(optionsPost, style.optionVisible);      
  
  return (
    <div className={style.optionsView} ref={optionsPost}>
        {children}
    </div>
  )
}

export default Options;