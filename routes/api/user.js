const express = require('express');
var RedisCache = require("../../middleware/redis-cache");
const userController = require('../../controllers/userController');
const router = express.Router();
router.get('/', RedisCache.getRedisData, userController.userList);
module.exports = router;