const express = require('express');

const port = 5000 || process.env.PORT;


const app = express()


app.get('/', (req, res) => {

    const userpass = Buffer.from(
        (req.headers.authorization || '').split(' ')[1] || '',
        'base64'
    ).toString();

    // console.log((req.headers && req.headers.authorization) && delete req.headers.authorization)


 

    if (userpass !== 'rakib:123456') {
        res.writeHead(401, { 'WWW-Authenticate': 'Basic' });
        return res.end('HTTP Error 401 Unauthorized: Access is denied');
    }
    else {
        return res.end('You are in! Yay!!');
    }
    res.send("sorry ")
})

app.listen(port, () => {
    console.log('running port')
})
// http://rakiblIslam@localhost:5000/
