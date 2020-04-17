require('dotenv').config();
let config = {
    "user"       : process.env.USERNAME,
    "pass"       :  process.env.PASSWORD,
    "host"       :  process.env.HOST,
}
module.exports = config;