const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { getIncomeSummary } = require('../controllers/AdminController');
const verifyRole = require('../middlewares/verifyRole');


const router = express.Router();

router.get('/income-summary',verifyToken,verifyRole('admin','user','staff'),getIncomeSummary);

module.exports = router;
