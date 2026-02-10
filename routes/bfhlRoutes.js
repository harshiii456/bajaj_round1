const express = require('express');
const { handleBFHL } = require('../controllers/bfhlController');

const router = express.Router();

// POST /bfhl
router.post('/', handleBFHL);

module.exports = router;
