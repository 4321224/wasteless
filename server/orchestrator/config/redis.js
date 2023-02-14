const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-13055.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13055,
    password: 'vMvyNe1pLmVpqH1F4wzyUwcj6jFGihki'
});

module.exports = redis