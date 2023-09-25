import React, {useEffect, useRef} from 'react'
import style from "./Options.module.scss"
import useFadeOnScroll from '../../Hooks/useFadeOnScroll'

function Options({ isOpen }) {
    const options = useRef(null);
  
    if (isOpen) {
        useFadeOnScroll(options, style.optionVisible);
    }
    if (!isOpen) {
      return null;
    }
  
  return (
    <div className={style.options} ref={options}>
        Options
    </div>
  )
}

export default Options