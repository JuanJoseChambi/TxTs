import { useRef } from "react";
import style from "./Options.module.scss"
import useFadeOnScroll from "../../Hooks/useFadeOnScroll";

function Options({ isOpenOptions }) {
    const options = useRef(null);

    if(!isOpenOptions) return null;
    if (isOpenOptions) useFadeOnScroll(options, style.optionVisible);  
    
  return (
    <div className={style.options} ref={options}>
        Options
    </div>
  )
}

export default Options;