// var express = require('express')
//   , routes = require('./routes')
//   , path = require('path'),

// 	bodyParser=require("body-parser");
const buffer = require('node:buffer')


const mysql = require('mysql');
const express = require('express');
const path = require('path');
require('dotenv').config()

const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json({ limit: '100mb' }))


app.use(fileUpload({
	limits: { fileSize: 100 * 1024 * 1024 },
	useTempFiles: true,
	// tempFileDir: (path.join(__dirname + '/tmp'))
}))



const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: "RAKIBUL.11224455",
	// database: process.env.DB
});




connection.connect((err) => {
	if (err) {
		console.log(err.message)

	}


	app.get('/', (req, res) => {
		// var sql = "select * from movie_details.imageDB";
		const sql = 'CRE'

		// var sql = "CREATE TABLE imageDB (name VARCHAR(255), address VARCHAR(255), image CHAR(100))";
		connection.query(sql, function (err, result) {
			// res.redirect('profile/' + result.insertId);
			if (err) {
				err.message
			}

			// const r = result?.filter(f => f.image = req.headers.host + "/images/" + f?.image)


			res.send(result)
		});

	});



})

app.listen(process.env.PORT || 8080, () => console.log(534453453))
