require("dotenv").config({path: './.env'});
const axios = require('axios');
const History = require('../models/History');

// Function to validate IP address
function isValidIP(ip) {
  // Updated regex pattern to correctly validate IPv4 addresses
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
  return ipRegex.test(ip);
}

exports.getGeoInfo = async (req, res) => {
  const ip = req.params.ip;

  try {
    const response = await axios.get(`${process.env.IPINFOIO_API_URL}${ip}/geo`);
    const location = response.data.city + ', ' + response.data.region + ', ' + response.data.country;
    const coordinates = response.data.loc;

    // await History.create({ ip, location, userId: req.user.id });

    res.json({ ip, location, coordinates});
  } catch (error) {
    res.status(400).json({ message: 'Invalid IP address' });
  }
};

exports.searchGeoByIP = async (req, res) => {
  const { ip } = req.params;

  if (!isValidIP(ip)) {
    return res.status(400).json({ error: 'Invalid IP address' });
  }

  console.log("valid", ip);

  try {
      // Fetch geo info from external API
      const response = await axios.get(`${process.env.IPINFOIO_API_URL}${ip}/geo`);
      const location = response.data.city + ', ' + response.data.region + ', ' + response.data.country;
      const coordinates = response.data.loc;

      // Save the search history to the database
      const searchHistory = await History.create({ ip, location, coordinates, userId: req.user.id });

      res.json({ ip, location, coordinates, searchHistoryId: searchHistory.id });
  } catch (error) {
      console.error('Error fetching geo information:', error);
      return res.status(500).json({ error: 'Failed to fetch geo information' });
  }
};