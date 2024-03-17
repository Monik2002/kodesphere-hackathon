import { useState } from "react";
import "./Bulb.css";

function Bulb() {
  const [isOn, setIsOn] = useState(false);

  const toggleBulb = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="bulb">
      <h2>Bulb</h2>
      <button onClick={toggleBulb}>{isOn ? "Turn Off" : "Turn On"}</button>
    </div>
  );
}

export default Bulb;
