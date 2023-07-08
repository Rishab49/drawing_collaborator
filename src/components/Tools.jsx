import { useRef } from "react";

function Tools({ setIsErasing }) {
  const toolsRef = useRef([]);

  return (
    <div className="tools">
      {["brush", "ink_eraser"].map((el, index) => (
        <span
          className={
            el == "brush"
              ? "material-symbols-outlined active"
              : "material-symbols-outlined"
          }
          key={el}
          onClick={(event) => {
            toolsRef.current.forEach((e) => {
              event.target == e
                ? e.classList.add("active")
                : e.classList.remove("active");
            });

            el == "ink_eraser" ? setIsErasing(true) : setIsErasing(false);
          }}
          ref={(el) => (toolsRef.current[index] = el)}
        >
          {el}
        </span>
      ))}
    </div>
  );
}

export default Tools;
