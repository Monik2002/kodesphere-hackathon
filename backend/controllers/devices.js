let deviceStatus = {
  fan: { speed: 0 },
  bulb: { isOn: false },
  led: { isOn: false, color: "#ffffff" },
  ac: { isOn: false, temp: 25 }
};

const getDeviceStatus = (req, res) => {
  const { device } = req.params;
  if (!deviceStatus[device]) {
    return res.status(404).json({ error: "Device not found" });
  }
  res.json({ success: true, data: deviceStatus[device] });
};

const updateDevice = (req, res) => {
  const { device } = req.params;
  const { value, temp } = req.body;
  if (!deviceStatus[device]) {
    return res.status(404).json({ error: "Device not found" });
  }
  if (value !== undefined) {
    deviceStatus[device].isOn = value === 1 ? true : false;
  }
  if (temp !== undefined && temp >= 16 && temp <= 30) {
    deviceStatus[device].temp = temp;
  }
  res.json({ success: true, message: "Device status updated successfully" });
};

module.exports = { getDeviceStatus, updateDevice };
