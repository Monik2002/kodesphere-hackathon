// smartHomeController.js

const axios = require('axios');

const BASE_URL = 'https://kodessphere-api.vercel.app';

// Function to control the speed of the fan
async function controlFanSpeed(teamId, value) {
    try {
        const response = await axios.post(`${BASE_URL}/devices`, {
            teamid: teamId,
            device: 'fan',
            value: value
        });
        return response.data;
    } catch (error) {
        console.error('Error controlling fan speed:', error.message);
        throw error;
    }
}

// Function to get the updated device status
async function getDeviceStatus(deviceId) {
    try {
        const response = await axios.get(`${BASE_URL}/devices/${deviceId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting device status:', error.message);
        throw error;
    }
}

module.exports = {
    controlFanSpeed,
    getDeviceStatus
};
