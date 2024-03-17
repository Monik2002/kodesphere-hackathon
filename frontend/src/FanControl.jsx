import { useState, useEffect } from "react";
import axios from "axios";
import "./Fan.css";

const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function FanControl() {
  const [speed, setSpeed] = useState(0);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleToggle = async (event, newValue) => {
    try {
      await axios.post("https://kodessphere-api.vercel.app/devices", {
        teamid: "Gz4xJSN",
        device: "fan",
        value: { state: newValue ? 1 : 0, speed: speed },
      });
      setIsOn(newValue);
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
