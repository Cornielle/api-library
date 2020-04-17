//Servidor.js
const server = require('http').createServer();
const url = require('url');

function initialize( route ) {
    function controlRoute(req, resp) {
        let pathName = url.parse(req.url).pathname;
        route(pathName, req, resp);
        }
    server.on('request', controlRoute).listen(8080);
    console.log('Server Initialize');
}
exports.initialize = initialize;