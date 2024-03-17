// // import { useState } from "react";
// // import axios from "axios";
// // import "./Led.css";

// // function LedControl() {
// //   const [color, setColor] = useState("#ffffff");
// //   const [isOn, setIsOn] = useState(false);

// //   const handleToggle = async () => {
// //     try {
// //       const newValue = isOn ? 0 : 1;
// //       await axios.post("https://kodessphere-api.vercel.app/devices", {
// //         teamid: "Gz4xJSN",
// //         device: "led",
// //         value: newValue,
// //       });
// //       setIsOn(!isOn);
// //     } catch (error) {
// //       console.error("Error controlling LED:", error);
// //     }
// //   };

// //   const handleColorChange = async (newColor) => {
// //     try {
// //       await axios.post("https://kodessphere-api.vercel.app/devices", {
// //         teamid: "Gz4xJSN",
// //         device: "led",
// //         value: newColor,
// //       });
// //       setColor(newColor);
// //     } catch (error) {
// //       console.error("Error changing LED color:", error);
// //     }
// //   };

// //   return (
// //     <div className="led-control">
// //       <h2>Led Control</h2>
// //       <input
// //         type="color"
// //         value={color}
// //         onChange={(e) => handleColorChange(e.target.value)}
// //       />
// //       <button onClick={handleToggle}>{isOn ? "Turn Off" : "Turn On"}</button>
// //     </div>
// //   );
// // }

// // export default LedControl;
import { useState } from "react";
import axios from "axios";
import "./Led.css";

function LedControl() {
  const [color, setColor] = useState("#ffffff");
  const [isOn, setIsOn] = useState(false);

  const handleToggle = async () => {
    try {
      const newValue = isOn ? 0 : 1;
      await axios.post("https://kodessphere-api.vercel.app/devices", {
        teamid: "Gz4xJSN",
        device: "led",
        value: newValue,
      });
      setIsOn(!isOn);
    } catch (error) {
      console.error("Error controlling LED:", error);
    }
  };

  const handleColorChange = async (newColor) => {
    try {
      await axios.post("https://kodessphere-api.vercel.app/devices", {
        teamid: "Gz4xJSN",
        device: "led",
        value: newColor,
      });
      setColor(newColor);
    } catch (error) {
      console.error("Error changing LED color:", error);
    }
  };

  return (
    <div className="led">
      <h2>Led Control</h2>
      <input
        type="color"
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
      />
      <button onClick={handleToggle}>{isOn ? "Turn Off" : "Turn On"}</button>
    </div>
  );
}

export default LedControl;
