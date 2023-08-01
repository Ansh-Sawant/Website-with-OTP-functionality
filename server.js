const express = require('express');
const nodemailer = require('nodemailer');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

const mailTransporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
  	port: 587,
  	secure: false,
	auth: {
		user: 'xyz@gmail.com',
		pass: '*************'
	}
});

const sendMail = (req, res) => {
	let mailDetails = {
		from: 'xyz@gmail.com',
		to: 'abc@gmail.com',
		subject: 'Test mail',
		text: 'Node.js testing mail'
	};

	const { otp } = req.body;

	console.log('Hi Ansh', otp);
	
	// mailTransporter.sendMail(mailDetails, function(err, data) {
	// 	if(err) {
	// 		console.log('Error Occurs');
	// 	} else {
	// 		console.log('Email sent successfully');
	// 	}
	// });
}

app.use('/email', () => {
	router.post("/sendEmail", sendMail);
});

app.get("/", (req, res) => {
	res.send("Hello World!");
  });

app.listen(8000, () => {
	console.log('Server is running on http://localhost:8000');
});