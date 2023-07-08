import { useRef } from "react";

function ColorPicker({ setStrokeProps }) {
  const colorsRef = useRef([]);
  return (
    <fieldset>
      <legend>Popular Colors</legend>
      <div className="colors_container">
        <div className="popular_colors">
          {["red", "green", "blue", "purple", "black", "cyan", "wheat"].map(
            (el, index) => (
              <div
                key={el}
                ref={(el) => (colorsRef.current[index] = el)}
                className={el == "red" ? "color active" : "color"}
                style={{ backgroundColor: el }}
                onClick={(event) => {
                  colorsRef.current.forEach((e) => {
                    e == event.target
                      ? e.classList.add("active")
                      : e.classList.remove("active");
                  });
                  setStrokeProps((prop) => {
                    return { ...prop, strokeStyle: el };
                  });
                }}
              ></div>
            )
          )}
        </div>
      </div>
    </fieldset>
  );
}

export default ColorPicker;
