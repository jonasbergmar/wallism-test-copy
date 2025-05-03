import React from "react";

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
};

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue = (v) => v.toFixed(2),
}: SliderProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{ color: "white" }}>
        {label}: {formatValue(value)}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default Slider;
