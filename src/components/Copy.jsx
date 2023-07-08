import { useEffect } from "react";
import { useRef } from "react";

function Copy({ id }) {


    const copyRef = useRef(null);

    useEffect(() => {
        copyRef.current.addEventListener("click",() => {
            navigator.clipboard.writeText(id);
        })
    },[]);
  return (
    <div className="copy_container" ref={copyRef}>
      <p>{id}</p>
      <span className="material-symbols-outlined">content_copy</span>
    </div>
  );
}

export default Copy;
