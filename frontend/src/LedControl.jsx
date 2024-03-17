import { useState } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import "./Led.css";

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
      <span style={{ marginBottom: "10px" }}></span>
      <IOSSwitch
        checked={isOn}
        onChange={handleToggle}
        inputProps={{ "aria-label": "Toggle fan switch" }}
      />
    </div>
  );
}

export default LedControl;
