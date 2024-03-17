const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let deviceStatus = {
  fan: { speed: 0 },
  bulb: { isOn: false },
  led: { isOn: false, color: "#ffffff" },
  ac: { isOn: false, temp: 25 }
};

app.post('/devices', (req, res) => {
  const { teamid, device, value } = req.body;

  if (teamid !== "Gz4xJSN") {
    return res.status(400).json({ error: "Invalid teamid" });
  }

  switch (device) {
    case "fan":
      if (value >= 0 && value <= 5) {
        deviceStatus.fan.speed = value;
        return res.json({ success: true, message: "Fan speed updated successfully" });
      } else {
        return res.status(400).json({ error: "Invalid value for fan speed" });
      }
    case "bulb":
      if (value === 0 || value === 1) {
        deviceStatus.bulb.isOn = value === 1;
        return res.json({ success: true, message: "Bulb status updated successfully" });
      } else {
        return res.status(400).json({ error: "Invalid value for bulb status" });
      }
    case "led":
      if (value === 0 || value === 1) {
        deviceStatus.led.isOn = value === 1;
        return res.json({ success: true, message: "LED status updated successfully" });
      } else {
        return res.status(400).json({ error: "Invalid value for LED status" });
      }
    case "ac":
      if (value.state === 0 || value.state === 1) {
        deviceStatus.ac.isOn = value.state === 1;
        if (value.temp >= 16 && value.temp <= 30) {
          deviceStatus.ac.temp = value.temp;
          return res.json({ success: true, message: "AC status updated successfully" });
        } else {
          return res.status(400).json({ error: "Invalid temperature value for AC" });
        }
      } else {
        return res.status(400).json({ error: "Invalid value for AC status" });
      }
    default:
      return res.status(400).json({ error: "Invalid device type" });
  }
});

app.get('/devices/:id', (req, res) => {
  const { id } = req.params;

  if (id !== "Gz4xJSN") {
    return res.status(400).json({ error: "Invalid teamid" });
  }

  res.json({ success: true, data: deviceStatus });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
