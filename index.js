// var express = require('express')
//   , routes = require('./routes')
//   , path = require('path'),

// 	bodyParser=require("body-parser");
const buffer = require('node:buffer')




const mysql = require('mysql');
const express = require('express');
const path = require('path');
require('dotenv').config()
const routes = require('./routes')

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
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASS,
	database: process.env.DB
});




connection.connect((err) => {
	if (err) {
		console.log(err.message)

	}
	app.post('/', (req, res) => {
		const files = req?.files?.test;
		// console.log(req.headers)
		console.log(req.files)
		console.log(req.body)
		const { address, name } = req.body;
		// var sql = "CREATE TABLE imageDB (name VARCHAR(255), address VARCHAR(255), image BLOB)";
		// var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255)),";
		// const blob = new buffer.Blob(files.data, { type: files.mimetype })
		// files.mv(__dirname + '/images/' + files?.name, (err, red) => {
		// 	if (err) {
		// 		console.log(err)
		// 		res.send(err)
		// 	}
		// 	const file = files?.name
		// 	// const sql = `INSERT INTO imageDB (name, address) VALUES ('Company Inc', 'Highway 37','${file}')`;
		// 	const sql = `INSERT INTO imageDB (name, address, image) VALUES ('${name}', '${address}','${file}')`;
		// 	connection.query(sql, function (err, result) {
		// 		if (err) {
		// 			console.log(err.message)
		// 		}
		// 		console.log(result)
		// 	});
		// })
		// console.log(req)
		res.send({ success: files?.name })
	})


	app.get('/', (req, res) => {
		var sql = "select * from imageDB";
		// var sql = "CREATE TABLE imageDB (name VARCHAR(255), address VARCHAR(255), image CHAR(100))";
		connection.query(sql, function (err, result) {
			// res.redirect('profile/' + result.insertId);
			if (err) {
				err.message
			}

			// const r = result?.filter(f => f.image = req.headers.host + "/images/" + f?.image)
			console.log(result)

			res.send(result)
		});

	});


	app.get('/images/:name', (req, res) => {
		const { name } = req.params;

		var sql = "select * from imageDB";
		connection.query(sql, function (err, result) {
			// res.redirect('profile/' + result.insertId);
			if (err) {
				err.message
			};
			const fs = require('node:fs')

			const ff = path.resolve(__dirname + '/images/' + name);
			if (fs.existsSync(ff)) {
				res.sendFile(ff)
			}
			else {
				res.writeHead(200, { "content-type": 'text/html' })
				res.write('<h1>File not found</h1>');
				res.end();

			}
		});

	})
})

// 1. Database Create
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('test.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the in-memory SQlite database.')
})


let languages = ['NexJS', 'Typescript', 'ExprssJS', "react hook form"];

let placeholders = languages.map((language) => '(?)').join(',');
let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;

app.get('/sq/all', (req, res) => {
	db.all('select * from customers', (err, row) => {
		if (err) {
			console.log(err.message)
		}
		res.send(row)
	})
})
app.get('/sq/', (req, res) => {
	var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
	db.run(sql, function (err) {
		if (err) {
			console.log(err.message)
		}
		else {
			res.status(200).json(this)
		}
	})
})




app.listen(process.env.PORT || 8080, () => console.log(534453453))
