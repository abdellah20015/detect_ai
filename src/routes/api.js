const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyzeController');
const authMiddleware = require('../middleware/auth');

router.post('/analyze', authMiddleware, analyzeController.analyzeText);

module.exports = router;