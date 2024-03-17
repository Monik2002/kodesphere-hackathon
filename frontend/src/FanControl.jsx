// import { useState } from "react";
// import axios from "axios";
// import "./Fan.css";

// function FanControl() {
//   const [speed, setSpeed] = useState(0);
//   const [isOn, setIsOn] = useState(false);

//   const handleToggle = async () => {
//     try {
//       const newValue = isOn ? 0 : 1;
//       await axios.post("https://kodessphere-api.vercel.app/devices", {
//         teamid: "Gz4xJSN",
//         device: "fan",
//         value: { state: newValue, speed: speed },
//       });
//       setIsOn(!isOn);
//     } catch (error) {
//       console.error("Error controlling fan:", error);
//     }
//   };

//   const handleSpeedChange = async (value) => {
//     if (value >= 0 && value <= 5) {
//       try {
//         await axios.post("https://kodessphere-api.vercel.app/devices", {
//           teamid: "Gz4xJSN",
//           device: "fan",
//           value: value,
//         });
//         setSpeed(value);
//       } catch (error) {
//         console.error("Error controlling fan:", error);
//       }
//     }
//   };

//   return (
//     <div className="fan-control">
//       <h2>Fan Control</h2>
//       <button onClick={() => handleSpeedChange(speed - 1)}>-</button>
//       <span>{speed}</span>
//       <button onClick={() => handleSpeedChange(speed + 1)}>+</button>
//       <button onClick={handleToggle}>{isOn ? "Turn Off" : "Turn On"}</button>
//     </div>
//   );
// }

// export default FanControl;
import { useState, useEffect } from "react";
import axios from "axios";
import "./Fan.css";

function FanControl() {
  const [speed, setSpeed] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://kodessphere-api.vercel.app/devices/Gz4xJSN"
      );
      const fanData = response.data.fan;
      setSpeed(fanData.speed);
      setIsOn(fanData.speed > 0); // Fan is considered on if speed is greater than 0
    } catch (error) {
      console.error("Error fetching fan data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = async () => {
    try {
      const newValue = isOn ? 0 : 1;
      await axios.post("https://kodessphere-api.vercel.app/devices", {
        teamid: "Gz4xJSN",
        device: "fan",
        value: { state: newValue, speed: speed },
      });
      setIsOn(!isOn);
    } catch (error) {
      console.error("Error controlling fan:", error);
    }
  };

  const handleSpeedChange = async (value) => {
    if (value >= 0 && value <= 5) {
      try {
        await axios.post("https://kodessphere-api.vercel.app/devices", {
          teamid: "Gz4xJSN",
          device: "fan",
          value: value,
        });
        setSpeed(value);
      } catch (error) {
        console.error("Error controlling fan:", error);
      }
    }
  };

  return (
    <div className="device-container">
      <div className="device fan">
        <h2>Fan Control</h2>
        <button onClick={() => handleSpeedChange(speed - 1)}>-</button>
        <span>{speed}</span>
        <button onClick={() => handleSpeedChange(speed + 1)}>+</button>
        <button onClick={handleToggle}>{isOn ? "Turn Off" : "Turn On"}</button>
      </div>
    </div>
  );
}

export default FanControl;
