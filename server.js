let express = require("express");
let myParser = require("body-parser");
let mysql = require('mysql');
let app = express();

let p = [];
let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"fdO0,s7mOgR;",
    database:"db"
});

function parse(json,n,int){
    let _j = JSON.stringify(json);
    _j = _j.replace("[","");
    _j = _j.replace("]","");
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
        let info = [parse(request.body,0,0),parse(request.body,0,1),parse(request.body,1,0),"true"];
        let sql = "SELECT user,password,ip FROM Accounts WHERE ip ="+info[2]+" AND user = "+info[0]+" AND password = "+info[1];
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            if(result != null){
                response.send("true");
                return;
            }else{
                let str = info[0] + "," + info[1] + "," + info[2] + "," + info[3];
                console.log(str);
                sql = "INSERT INTO Accounts(user,password,ip,connected) VALUES("+str+")";
                con.query(sql,function(err){
                    if(err) throw err;
                    console.log("done");
                });
            }
        });

    });
});

app.post("/master", function(request, response) {
    response.setHeader("Access-Control-Allow-Origin","*");
        if(err) throw err;
        let sql = "SELECT user FROM Accounts WHERE ip = ";
        let count = 0;
        for(let key in p[count]){
            sql += "'" + key + "'";
            if(count < p.length-1){
                sql += " OR ip = ";
            }
            count += 1;
        }
        console.log("command is : " + sql);
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            let res;
            let s = JSON.stringify(result);
            for(let i = 0;i < result.length;i++){
                res += parse(s,i,1) + " : " + parse(JSON.stringify(p),i,1) + "\n";
            }
            response.send(res);
            console.log("master client response sended");
        });
    
});

app.post("/mainStart", function(request,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    console.log(response.body);
    let ip = JSON.stringify(response.body)
    ip = ip.replace("{","").replace("}","").split(":")[0]
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT connected FROM Accounts WHERE ip = '"+ip+"'", function (err, result) {
            if (err) throw err;
            console.log(result);
            response.send(result);
        });
    });
    console.log("logged in");
});
app.listen(8080);