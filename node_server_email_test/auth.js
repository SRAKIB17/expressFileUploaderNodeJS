const express = require('express');

const port = 5002;


const app = express()
const nextMiddle = (req, res, next) => {
    next()
}

app.get('/', nextMiddle, (req, res) => {

    const run = async () => {
        const userpass = await Buffer.from(
            (req.headers.authorization || '').split(' ')[1] || '',
            'base64'
        ).toString();

        // console.log((req.headers && req.headers.authorization) && delete req.headers.authorization)
        console.log(req.headers.authorization)
        console.log(userpass)
        return userpass
    }
    const userpass = run()


    if (userpass !== 'rakib:123456') {
        res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="User Visible Realm"' });
        return res.end('HTTP Error 401 Unauthorized: Access is denied');
    }
    else {
        return res.end('You are in! Yay!!');
    }
})

app.listen(port, () => {
    console.log('running port')
})
// http://rakiblIslam@localhost:5000/
