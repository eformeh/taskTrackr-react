// // ColorSlider.js
import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const ColorSlider = ({ hue, onHueChange }) => {
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '20px',
          background: `linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f00)`,
        }}
      ></div>
      <Slider
        min={0}
        max={360}
        value={hue}
        onChange={onHueChange}
      />
    </div>
  );
};

export default ColorSlider;
