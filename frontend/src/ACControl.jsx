import { useState } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import "./AirConditioner.css";

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => handleTempChange(temp - 1)}
          style={{ marginRight: "10px" }}
        >
          -
        </button>
        <span>{temp}°C</span>
        <button
          onClick={() => handleTempChange(temp + 1)}
          style={{ marginLeft: "10px" }}
        >
          +
        </button>
      </div>
      <span style={{ marginBottom: "10px" }}></span>
      <IOSSwitch
        checked={isOn}
        onChange={handleToggle}
        inputProps={{ "aria-label": "Toggle fan switch" }}
      />
    </div>
  );
}

export default ACControl;
