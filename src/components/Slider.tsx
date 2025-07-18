import React from "react";
import Label from "./Label";

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  onChange: (value: number) => void;
  className?: string;
  defaultValue?: number;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min = 0,
  max = 2,
  step = 0.1,
  id,
  onChange,
  className = "",
  defaultValue = 1,
}) => (
  <div className={`input-field ${className}`}>
    <Label>
      {label}
      {value !== defaultValue && (
        <button
          type="button"
          className="slider-reset"
          onClick={() => onChange(defaultValue)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="slider-reset__icon"
          >
            <path
              fillRule="evenodd"
              d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </Label>
    <input
      className="slider"
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);

export default Slider;
