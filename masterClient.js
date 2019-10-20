const superagent = require('superagent');

superagent
    .post('http://127.0.0.1:8080/master')
    .then(res => {
        console.log('yay got ' + JSON.stringify(res.body));
    });

    
