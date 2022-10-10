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
		const { address, name } = req.body;
		// var sql = "CREATE TABLE imageDB (name VARCHAR(255), address VARCHAR(255), image BLOB)";
		// var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255)),";
		// const blob = new buffer.Blob(files.data, { type: files.mimetype })
		files.mv(__dirname + '/images/' + files?.name, (err, red) => {
			if (err) {
				console.log(err)
				res.send(err)
			}
			const file = files?.name
			// const sql = `INSERT INTO imagedb (name, address) VALUES ('Company Inc', 'Highway 37','${file}')`;
			const sql = `INSERT INTO imagedb (name, address, image) VALUES ('${name}', '${address}','${file}')`;
			connection.query(sql, function (err, result) {
				if (err) {
					console.log(err.message)
				}
				console.log(result)
			});
		})
		res.send({ success: files.name })
	})


	app.get('/', (req, res) => {
		var sql = "select * from imagedb";
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

		var sql = "select * from imagedb";
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

app.listen(process.env.PORT || 8080, () => console.log(534453453))
// connection.connect();

// global.db = connection;

// // all environments
// app.set('port', process.env.PORT || 8080);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload());

// // development only

// app.post('/', routes.index);//call for signup post
// app.get('/profile/:id', routes.profile);
// //Middleware
// app.listen(8080)

// const encryptingPassword = (password) => {


// 	let salt = crypto.randomBytes(Math.ceil(16))
// 		.toString("hex");
// 	// (B2) SHA512 HASH
// 	let hash = crypto.createHmac("sha512", salt);
// 	hash.update(password);
// 	const hashValue = hash.digest("hex")
// 	return {
// 		salt: salt,
// 		hash: hashValue
// 	};
// };
