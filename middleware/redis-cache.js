const client = require('../core/redis-connection')
const SendResponse = require('../helpers/responseHandler');
module.exports = {
    getRedisData: async (req, res, next) => {
        try {
            const { key } = req.query;
            console.log(key);

            client.get(key, (err, data) => {
                if (err) {
                    console.log("throw err", err);
                    throw err;
                }
                if (data !== null) {
                    console.log("**********fething data from redis***********");
                    return SendResponse(res, JSON.parse(data))
                }
                else {
                    next();
                }
            });
        } catch (error) {
            console.log("catch block error in set data to redis", error);
            return SendResponse(res, error, 'Erroe in user list');
        }
    },
    addRedisData: async (req, res, data) => {
        try {
            console.log(".. fething data from db & set to redis");
            const { key } = req.query;
            client.setex(key, REDIS_EXP_TIME, JSON.stringify(data));
            return SendResponse(res, data, "Feed list from db");
        } catch (error) {
            console.log(error);
            return SendResponse(res, error, 'Erroe in adding cache');
        }
    }
}