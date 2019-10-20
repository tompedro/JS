/*
const http = require('http');
let p = [];

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type" : "application/json"});
    res.end(p.toString() + req.);
}).listen(8080);*/
let express = require("express");
let myParser = require("body-parser");
let app = express();

let p = [];

app.use(myParser.urlencoded({extended : true}));
    app.post("/", function(request, response) {
        p.push(request.body);
        response.write("ciao");
        console.log(request.body);
    });
    app.post("/master", function(request, response) {
        response.send(p)
        console.log(request.body);
});
app.listen(8080);