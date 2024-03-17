import { useState } from "react";
import "./Fan.css";

function Fan() {
  const [speed, setSpeed] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const increaseSpeed = () => {
    if (speed < 5) {
      setSpeed(speed + 1);
    }
  };

  const decreaseSpeed = () => {
    if (speed > 0) {
      setSpeed(speed - 1);
    }
  };

  const toggleFan = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="fan">
      <h2>Fan</h2>
      <div className="fan-speed">
        <button onClick={decreaseSpeed}>-</button>
        <span>{speed}</span>
        <button onClick={increaseSpeed}>+</button>
      </div>
      <button onClick={toggleFan}>{isOn ? "Turn Off" : "Turn On"}</button>
    </div>
  );
}

export default Fan;
