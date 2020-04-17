const migration = require("./database/migration");
const books =  require("./controllers/booksController");
const readme =  require("./controllers/readmeController");
function route (path,req, resp, url) {
    if(path === "/"){
        resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.write(
            `<h1 style="text-align:center;"> WELCOME TO GBH LIBRARY API
            </h1>`);
        resp.write(
            `<h3 style="text-align:center;"> 
                Use the README instruction file to manage the endpoints
            </h3>`);
        resp.end();
    }
    else if(path === "/migrate"){
        migration.migrate(req, resp)
    }
    else if(path === "/books"){
        books.getBooks(req, resp);
    }    
    else if(path!== null){
        books.getBooksById(req, resp, path)
    }
     else{
        console.log(path)
        resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.write(
            `<h1 style="text-align:center;">
                NOT FOUND
            </h1>`
        );
        resp.end();
    }    
}   
exports.route = route