import { useEffect } from "react";
import { useRef } from "react";

function StrokeWidth({ setStrokeProps }) {
  const strokesRef = useRef([]);

  return (
    <fieldset>
      <legend>Stroke Widths</legend>
      <div className="stroke_widths">
        {[1, 2, 3, 4, 5].map((el, index) => (
          <div
            key={el}
            ref={(el) => (strokesRef.current[index] = el)}
            className={el * 5 == 5 ? "width active" : "width"}
            style={{ height: `${(index + 1) * 20}%` }}
            onClick={(event) => {
              strokesRef.current.forEach((e) => {
                e == event.target
                  ? e.classList.add("active")
                  : e.classList.remove("active");
              });
              setStrokeProps((val) => {
                return { ...val, lineWidth: (index + 1) * 5 };
              });
            }}
          ></div>
        ))}
      </div>
    </fieldset>
  );
}

export default StrokeWidth;
