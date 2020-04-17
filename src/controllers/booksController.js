const con =  require("../config/connect");
const helper =  require("../helpers/helper");

/*Get All Books*/
function getBooks(req, resp){
    helper.useDB(con)
    con.query(
        `SELECT id, title FROM Books`
        , function(err, result) {
        try{
            if (err) throw err;
            resp.writeHead(200, {'Content-Type': 'application/json'});
            resp.write(JSON.stringify(result));
            resp.end();
            console.log('Getting all existing Books')
        }catch(ex){
            console.log(ex)
            resp.writeHead(200, {'Content-Type': 'application/json'});
            resp.write('NOT FOUND');
            resp.end();
        }
    });
}
/*Get Books By Id*/
function getBooksById(req, resp, path){
    helper.useDB(con)
    let parameter = path.split("/");
    if(parameter[1] === 'book' && (parameter[3]==='html' || parameter[3]==='text')){
        console.log(parameter)
        id = parameter[2];
        format = parameter[3] ==='html'?  'text/html' 
        :( parameter[3] === 'text'? 'text/plain' : 'text/html')
        console.log(format,'parameters')
        con.query(
            `SELECT id, title, content FROM Books WHERE id = ${id} LIMIT 60`
            , function(err, result) {
            try{
                if (err) throw err;
                resp.writeHead(200, {'Content-Type': format});
                if(format === 'text/html')
                resp.write('<p>'+result[0].content.replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>") + '</p>');
                else {
                    resp.write(result[0].content);
                }
                resp.end();
            }catch(ex){
                console.log(ex)
                resp.writeHead(200, {'Content-Type': format});
                resp.write('ERROR');
                resp.end();
            }
        });
    } else {
        getBooksByPage(req, resp, path)
    }
}

/*Get Books By Id & Page*/
function getBooksByPage(req, resp, path){
    helper.useDB(con)
    let parameter = path.split("/");
    if(parameter[1] === 'book' && parameter[3]==='page'){
        console.log(parameter)
        id = parameter[2];
        page = parameter[4] > 1? parameter[4] : 1;
        pagesArray = [];
        format = parameter[5] ==='html'?  'text/html' 
        :( parameter[5] === 'text'? 'text/plain' : 'text/html')
        con.query(
            `SELECT id, title, content FROM Books WHERE id = ${id} LIMIT 60`
            , function(err, result) {
            try{
                let countChar = 3200
                /* Calculate Pages with an Interval */
                let prevPage = page > 1? (page - 1) * countChar : 0
                let currentPage = page * countChar
                console.log(prevPage, currentPage)
                if (err) throw err;
                resp.writeHead(200, {'Content-Type': format});
                if(format === 'text/html'){
                    resp.write('<p>'+result[0].content.substring(prevPage,currentPage).replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>") + '</p>');
                }
                else {
                    resp.write(result[0].content.substring(prevPage,currentPage));
                }
                resp.end();
            }catch(ex){
                console.log(ex)
                resp.writeHead(200, {'Content-Type': format});
                resp.write('ERROR');
                resp.end();
            }
        });
    } else {
        resp.writeHead(200, {'Content-Type': 'application/json'});
        resp.write('Wrong Url');
        resp.end();
    }
}

module.exports = {
    getBooks,
    getBooksById, 
    getBooksByPage
}