import { useEffect, useRef } from "react";

export default function useClickOutside(onClickOutSide)
{
  const ref = useRef(null);

  useEffect(() =>{
    function handleClickOutSide(event){
      if(ref.current && !ref.current.contains(event.target)){
        onClickOutSide();
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide);
    return () =>{
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide);
    }
  }, [onClickOutSide]);

  return ref;
}
