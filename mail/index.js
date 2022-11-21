
const express = require('express');
require('dotenv').config()

const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
app.use(cors())
app.use(express.json())

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'rakibulssc5@gmail.com',
		pass: 'RAKIBUL.610204'
	}
});
const message = {
	from: "from-example@email.com",
	to: "rakibulssc5@gmail.com",
	subject: "Subject",
	text: "Hello SMTP Email"
}


app.get('/', (req, res) => {
	transporter.sendMail(message, (err, info) => {
		if (err) {
			console.log(err)
		}
		console.log(5345)
	})
	res.send('fsdf')
})
app.listen(process.env.PORT || 8080, () => console.log(534453453))
