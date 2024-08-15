const express = require('express');
const { getGeoInfo, searchGeoByIP } = require('../controllers/geoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:ip', authMiddleware, getGeoInfo);
router.get('/search/:ip', authMiddleware, searchGeoByIP);

module.exports = router;