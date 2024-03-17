// import { useState } from "react";
// import axios from "axios";
// import "./AirConditioner.css";

// function ACControl() {
//   const [temp, setTemp] = useState(25);
//   const [isOn, setIsOn] = useState(false);

//   const handleToggle = async () => {
//     try {
//       const newValue = isOn ? 0 : 1;
//       await axios.post("https://kodessphere-api.vercel.app/devices", {
//         teamid: "Gz4xJSN",
//         device: "ac",
//         value: { state: newValue, temp: temp },
//       });
//       setIsOn(!isOn);
//     } catch (error) {
//       console.error("Error controlling AC:", error);
//     }
//   };

//   const handleTempChange = async (newTemp) => {
//     if (newTemp >= 16 && newTemp <= 32) {
//       try {
//         await axios.post("https://kodessphere-api.vercel.app/devices", {
//           teamid: "Gz4xJSN",
//           device: "ac",
//           value: { state: isOn ? 1 : 0, temp: newTemp },
//         });
//         setTemp(newTemp);
//       } catch (error) {
//         console.error("Error changing AC temperature:", error);
//       }
//     }
//   };

//   return (
//     <div className="ac-control">
//       <h2>AC Control</h2>
//       <button onClick={() => handleTempChange(temp - 1)}>-</button>
//       <span>{temp}°C</span>
//       <button onClick={() => handleTempChange(temp + 1)}>+</button>
//       <button onClick={handleToggle}>{isOn ? "Turn Off" : "Turn On"}</button>
//     </div>
//   );
// }

// export default ACControl;
import { useState } from "react";
import axios from "axios";
import "./AirConditioner.css";

function ACControl() {
  const [temp, setTemp] = useState(25);
  const [isOn, setIsOn] = useState(false);

  const handleToggle = async () => {
    try {
      const newValue = isOn ? 0 : 1;
      await axios.post("https://kodessphere-api.vercel.app/devices", {
        teamid: "Gz4xJSN",
        device: "ac",
        value: { state: newValue, temp: temp },
      });
      setIsOn(!isOn);
    } catch (error) {
      console.error("Error controlling AC:", error);
    }
  };

  const handleTempChange = async (newTemp) => {
    if (newTemp >= 16 && newTemp <= 32) {
      try {
        await axios.post("https://kodessphere-api.vercel.app/devices", {
          teamid: "Gz4xJSN",
          device: "ac",
          value: { state: isOn ? 1 : 0, temp: newTemp },
        });
        setTemp(newTemp);
      } catch (error) {
        console.error("Error changing AC temperature:", error);
      }
    }
  };

  return (
    <div className="air-conditioner">
      <h2>AC Control</h2>
      <button onClick={() => handleTempChange(temp - 1)}>-</button>
      <span>{temp}°C</span>
      <button onClick={() => handleTempChange(temp + 1)}>+</button>
      <button onClick={handleToggle}>{isOn ? "Turn Off" : "Turn On"}</button>
    </div>
  );
}

export default ACControl;
