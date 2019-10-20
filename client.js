const superagent = require('superagent');

superagent
    .post('http://127.0.0.1:8080')
    .send("swda")
    .end(function(err,response){

    });
