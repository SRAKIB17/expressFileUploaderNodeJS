
const express = require('express');
require('dotenv').config()

const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
app.use(cors())
app.use(express.json())
app.use(fileUpload({
	limits: { fileSize: 100 * 1024 * 1024 },
	useTempFiles: true,
	// tempFileDir: (path.join(__dirname + '/tmp'))
}))
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('comment.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the in-memory SQlite database.')
})

// db.close()
// var sql = "CREATE TABLE comment (name VARCHAR(255), comment CHAR(226546546546255), u CHAR(1000), time CHAR(100))";

// db.run(sql, function (err) {
// 	if (err) {
// 		console.log(err.message)
// 	}
// })


app.get('/comment', (req, res) => {
	const { u } = req.query;
	const sql = `select * from comment where u='${u}'`
	db.all(sql, (err, row) => {
		if (err) {
			res.send([{ data: err.message }])
		}
		return res.send(row)
	})
});

app.get('/', (req, res) => {
	const index = __dirname + '/index.html'
	res.sendFile(index)
});

app.post('/', (req, res) => {

	const { u } = req.query;
	const { name, body } = req.body;
	console.log(name, body)
	var sql = `INSERT INTO comment (name, comment,u , time) VALUES ('${name || "anonymous"}', '${body}', '${u}', '${Date()}')`;
	db.run(sql, function (err) {
		if (err) {
			res.send(err.message)
		}
		else {
			res.redirect(u)
		}
	})
	// console.log(req.headers)
})

app.get('/js', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/javascript' });
	const fs = require('fs')
	const data = fs.readFileSync(__dirname + '/comment.js')

	res.write(data);
	return res.end();
})
// app.get('/:id', (req, res) => {
// 	const { id } = req.params
// 	res.writeHead(200, { 'Content-Type': 'text/javascript' });
// 	const data =
// 		`
// 	<div>
// 	<iframe src="http://localhost:8080/?id="${id} type="" id="embedComment"></iframe>
// <script>
// 	document.getElementById('embedComment').onload = (event) => {
// 		const iframe = event.target;
// 		const iframeAutoHeight = () => {
// 			iframe.style.height = iframe?.contentWindow?.document?.documentElement?.scrollHeight + 'px'
// 		}
// 		console.log(iframe?.contentWindow?.document?.documentElement?.scrollHeight + 'px')
// 		iframe.contentWindow.onmousemove = () => {
// 			iframeAutoHeight()
// 		}
// 		iframe.contentWindow.onresize = () => {
// 			iframeAutoHeight()
// 		}
// 		iframe.contentWindow.onclick = () => {
// 			iframeAutoHeight()
// 		}
// 	}
// 	</script>
// 	</div>
// 	`
// 	res.write(`document.write('${data}')`);
// 	return res.end();

// })

// db.close()

app.listen(process.env.PORT || 8080, () => console.log(534453453))
