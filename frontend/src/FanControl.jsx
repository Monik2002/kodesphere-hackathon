import { useState, useEffect } from "react";
import axios from "axios";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
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
        <div className="fan-speed">
          <button onClick={() => handleSpeedChange(speed - 1)}>-</button>
          <span>{speed}</span>
          <button onClick={() => handleSpeedChange(speed + 1)}>+</button>
        </div>
        <ToggleButtonGroup
          value={isOn}
          exclusive
          onChange={handleToggle}
          aria-label="fan toggle button"
        >
          <ToggleButton value={true} aria-label="fan on">
            Turn On
          </ToggleButton>
          <ToggleButton value={false} aria-label="fan off">
            Turn Off
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

export default FanControl;
