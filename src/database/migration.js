
const fs =  require('fs');
const path = require('path');
const directory = path.join('./src/', 'books');
const con = require("../config/connect")
const database = con.config
function migrate(req, resp){
    /* Database Queries for Migration */
    let dropDB = `DROP DATABASE IF EXISTS gbhlibrary;`
    let createDB =  `CREATE DATABASE IF NOT EXISTS gbhlibrary;`
    let useDB =  `USE gbhlibrary;`
    let createBooksTable = `CREATE TABLE IF NOT EXISTS Books(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title varchar(500) NOT NULL,
        content MEDIUMTEXT NOT NULL
    )`

    console.log(dropDB, createDB, useDB)
    /* Conecting to DB and making Migrations */ 
        con.connect(function(err) {
            if (err) migrated = true; 
            console.log("Connected to Database");
            /* DROP DATABASE */ 
            con.query(dropDB,function(err){
                if (err) throw err;
                console.log("Database Deleted", err);
            });
            /* Creating DB */ 
            con.query(createDB,function(err){
                if (err) throw err;
            });
            /* USE DB */ 
            con.query(useDB,function(err){
                if (err) throw err;
                console.log("Database 'gbh_bookstore' created and in use");
            });
            /* Creating Books Table */ 
            con.query(createBooksTable, function(err) {
                if (err) throw err;
                migrated = true;
                console.log("'Books' Table Created");
            });
            fs.readdir(directory, function (err, files) {
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                } 
                files.forEach(function (file) {
                    /* Inserting the books in GBH LIBRARY DATABASE */ 
                    let contents = JSON.stringify(fs.readFileSync(`./src/books/${file}`, 'utf8'))
                    pages = [];

                    if(file !== '.DS_Store'){
                        con.query(
                            `INSERT INTO Books (title, content) 
                            VALUES( '${file.replace(".txt","")}','${contents}')`
                            , function(err) {
                            if (err) throw err;
                            migrated = true;
                            console.log("'Books Inserted' Table Created");
                        });
                    }
                });
            });
        });
        resp.writeHead(200, {'Content-Type': 'application/json'});
        resp.write(`Migración Completada`);
        resp.end();
}
exports.migrate =  migrate