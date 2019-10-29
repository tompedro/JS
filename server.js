let express = require("express");
let myParser = require("body-parser");
let app = express();

let p = [];

app.use(myParser.urlencoded({extended : true}));
app.post("/", function(request, response) {
    console.log(JSON.stringify(request.body));
    if(request.body === null){
        response.send(JSON.stringify(p));
        console.log("master client response sended");
    }else{
        p.push(request.body);
        console.log(request.body);
    }
    
});
app.get("/", function(request, response) {
    response.setHeader("Access-Control-Allow-Origin","*");
    response.send(JSON.stringify(p));
    console.log(request.body);
    console.log("master client response sended");
});
app.listen(8080);