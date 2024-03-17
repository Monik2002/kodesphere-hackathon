const express = require('express');
const router = express.Router();
const { getDeviceStatus, updateDevice } = require('../controllers/devices');

router.get('/:device', getDeviceStatus);
router.post('/:device', updateDevice);

module.exports = router;
