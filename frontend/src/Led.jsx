import { useState } from "react";
import "./Led.css";

function Led() {
  const [color, setColor] = useState("#ffffff");
  const [isOn, setIsOn] = useState(false);

  const toggleLed = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="led">
      <h2>Led</h2>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={toggleLed}>{isOn ? "Turn Off" : "Turn On"}</button>
    </div>
  );
}

export default Led;
