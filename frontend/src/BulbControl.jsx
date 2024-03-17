import { useState, useEffect } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { GiLightBulb } from "react-icons/gi";
import { FaRegLightbulb } from "react-icons/fa";
import "./Bulb.css";

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

function BulbControl() {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://kodessphere-api.vercel.app/devices/Gz4xJSN"
      );
      const bulbData = response.data.bulb;
      setIsOn(bulbData.isOn);
    } catch (error) {
      console.error("Error fetching bulb data:", error);
    }
  };

  const handleToggle = async () => {
    try {
      const newValue = !isOn;
      await axios.post("https://kodessphere-api.vercel.app/devices", {
        teamid: "Gz4xJSN",
        device: "bulb",
        value: newValue,
      });
      setIsOn(newValue);
    } catch (error) {
      console.error("Error controlling bulb:", error);
    }
  };

  return (
    <div className="bulb">
      <h2>{isOn ? <GiLightBulb /> : <FaRegLightbulb />} Bulb Control</h2>
      <span style={{ marginBottom: "10px" }}></span>
      <IOSSwitch
        checked={isOn}
        onChange={handleToggle}
        inputProps={{ "aria-label": "Toggle bulb switch" }}
      />
    </div>
  );
}

export default BulbControl;
