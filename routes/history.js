const express = require('express');
const { getHistory, deleteSearchHistory } = require('../controllers/historyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getHistory);

router.delete('/', authMiddleware, deleteSearchHistory);

module.exports = router;
