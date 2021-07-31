/**
 * Prerequisite
 * sudo apt-get install redis-server
 * sudo service redis-server status
 */
const redis = require("redis");
const REDIS_EXP_TIME = 24 * 60 * 60 * 1000;  // 1 Day in milisecoind
const client = redis.createClient({
    port: 6379,
    host: "127.0.0.1"
});

client.on('connect', () => {
    console.log('Client conected to redis...');
})

client.on('ready', () => {
    console.log('Client conected to redis and ready to use...');
})

client.on('error', (err) => {
    console.log(err.message);
})

client.on('end', () => {
    console.log('Client disconected');
})

client.on('SIGINT', () => {
    client.quit();
})

module.exports = client;