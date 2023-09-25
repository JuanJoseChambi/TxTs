import React, { useRef } from "react";
import style from "./Options.module.scss"
import useFadeOnScroll from "../../Hooks/useFadeOnScroll";

function Options({ isOpen }) {
  if(!isOpen) return null;

  const optionsPost = useRef(null);
  useFadeOnScroll(optionsPost, style.optionVisible);      
  
  return (
    <div className={style.optionsView} ref={optionsPost}>
      Options
    </div>
  )
}

export default Options;