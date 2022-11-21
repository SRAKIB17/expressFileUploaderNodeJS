const express = require('express');

const port = 5001;


const app = express()
const nextMiddle = (req, res, next) => {
    next()
}

app.get('/', nextMiddle, (req, res) => {

    const userpass = Buffer.from(
        (req.headers.authorization || '').split(' ')[1] || '',
        'base64'
    ).toString();

    console.log(req.headers.authorization)
    console.log(userpass);
    
    if (userpass !== 'rakib:123456') {
        res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="User Visible Realm"' });
        res.end('HTTP Error 401 Unauthorized: Access is denied');
        return;
    }
    res.end('You are in! Yay!!');
    res.send('fsdlfj')
})

app.listen(port, () => {
    console.log('running port')
})
// http://rakiblIslam@localhost:5000/
