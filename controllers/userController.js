const SendResponse = require('../helpers/responseHandler');
var RedisCache = require("../middleware/redis-cache");
module.exports = {
    userList: async (req, res) => {
        try {
            let pearls = [];
            let totalPearls = pearls.length;
            let { id } = req.params;
            console.log(RedisCache);
            
            RedisCache.addRedisData(req, res, { total: totalPearls, pearls: pearls });
            return SendResponse(res, { total: totalPearls, pearls: pearls }, 'All user list');
        } catch (error) {
            console.log(error);

            return SendResponse(res, error, 'Erroe in user list');
        }
    }
}