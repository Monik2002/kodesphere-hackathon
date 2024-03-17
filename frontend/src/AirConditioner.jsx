import { useState } from "react";
import "./AirConditioner.css";

function AirConditioner() {
  const [temp, setTemp] = useState(25);
  const [isOn, setIsOn] = useState(false);

  const increaseTemp = () => {
    if (temp < 30) {
      setTemp(temp + 1);
    }
  };

  const decreaseTemp = () => {
    if (temp > 16) {
      setTemp(temp - 1);
    }
  };

  const toggleAc = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="air-conditioner">
      <h2>Air Conditioner</h2>
      <div className="ac-temp">
        <button onClick={decreaseTemp}>-</button>
        <span>{temp}°C</span>
        <button onClick={increaseTemp}>+</button>
      </div>
      <button onClick={toggleAc}>{isOn ? "Turn Off" : "Turn On"}</button>
    </div>
  );
}

export default AirConditioner;
