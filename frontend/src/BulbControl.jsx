// import { useState } from "react";
// import axios from "axios";
// import "./Bulb.css";

// function BulbControl() {
//   const [isOn, setIsOn] = useState(false);

//   const handleToggle = async () => {
//     try {
//       const newValue = isOn ? 0 : 1;
//       await axios.post("https://kodessphere-api.vercel.app/devices", {
//         teamid: "Gz4xJSN",
//         device: "bulb",
//         value: newValue,
//       });
//       setIsOn(!isOn);
//     } catch (error) {
//       console.error("Error controlling bulb:", error);
//     }
//   };

//   return (
//     <div className="bulb-control">
//       <h2>Bulb Control</h2>
//       <button onClick={handleToggle}>{isOn ? "Turn Off" : "Turn On"}</button>
//     </div>
//   );
// }

// export default BulbControl;
import { useState } from "react";
import axios from "axios";
import "./Bulb.css";

function BulbControl() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = async () => {
    try {
      const newValue = isOn ? 0 : 1;
      await axios.post("https://kodessphere-api.vercel.app/devices", {
        teamid: "Gz4xJSN",
        device: "bulb",
        value: newValue,
      });
      setIsOn(!isOn);
    } catch (error) {
      console.error("Error controlling bulb:", error);
    }
  };

  return (
    <div className="bulb">
      <h2>Bulb Control</h2>
      <button onClick={handleToggle}>{isOn ? "Turn Off" : "Turn On"}</button>
    </div>
  );
}

export default BulbControl;
