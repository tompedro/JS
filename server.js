let express = require("express");
let myParser = require("body-parser");
let mysql = require('mysql');
let app = express();

let p = [];
let con = mysql.createConnection({
    host:"localhost",
    user:"admin",
    password:"admin",
    database:"db"
});

function parse(json,n,int){
    let _j = JSON.stringify(json);
    _j = _j.replace("{","");
    _j = _j.replace("}","");
    return( _j.split(",")[n].split(":")[int]);
}

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

app.post("/login",function(request,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    con.connect(function(err){
        if(err) throw err;
        console.log("connected to db");
        let str;
        str = parse(request.body,0,0) + "," +parse(request.body,0,1) + ","+parse(request.body,1,0) + ","+"true";
        console.log(str);
        let sql = "INSERT INTO Accounts(Users,Password,Ip,Connected) VALUES("+str+")";
        con.query(sql,function(err){
            if(err) throw err;
            console.log("done");
        });
    });
});

app.get("/", function(request, response) {
    response.setHeader("Access-Control-Allow-Origin","*");
    response.send(JSON.stringify(p));
    console.log(request.body);
    console.log("master client response sended");
});
app.listen(8080);