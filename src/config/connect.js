const config =  require("../config/config");
const mysql = require('mysql');
let connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.pass,
});

module.exports = connection;