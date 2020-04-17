
let query =  `USE gbhlibrary;`
function useDB( con ){
    /* USE DB */ 
    con.query(query,function(err){
        if (err) throw err;
            console.log("Database 'gbh_bookstore' created and in use");
    });
}

exports.useDB = useDB