const router = require('./src/router'); 
const server = require('./src/server');
server.initialize(router.route); 

