const express = require('express');
const userRoutes = require('./api/user');
const router = express.Router();

router.use('/user', userRoutes);
module.exports = router;