const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const messageModel = require("./models/message");

// INITIALIZING APP!
const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

// CONNECTING TO DATABASE!
mongoose
	.connect(
		"mongodb+srv://awaismumtaz0099:778677867786a..@cluster0.sdtswhc.mongodb.net/",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log("Connected To Mongodb!"))
	.catch((err) => console.log("Error while connecting to db:", err));

// CREATE TOKEN FUNCTION!
const createToken = (userId) => {
	const payload = {
		userId,
	};
	// GENERATE TOKEN WITH A SECRET-KEY!
	const token = jwt.sign(payload, "123456789awais", { expiresIn: "1hr" });

	return token;
};

// END POINT FOR REGISTRATION !!
app.post("/register", async (req, res) => {
	// DESTRUCTURING DATA FROM BODY!
	const { email, name, password, image } = req.body;

	console.log(email, name, password, image);

	// SAVING DATA TO DATABASE MONGODB!
	const newDoc = new User({
		email,
		name,
		password,
		image,
	});

	newDoc.save();

	// SENDING BACK THE RESPONSE!
	res
		.status(200)
		.json({ newUser: newDoc, success: true, message: "User Registered!" });
});

// LOGIN END-POINT!
app.post("/login", async (req, res) => {
	try {
		const { password, email } = req.body;
		// CHECK IF EMAIL AND PASSWORD IS NULL!
		if ((!password, !email)) {
			res.status(404).json({ message: "email and password required!" });
		}
		// FIND USER IN DATABASE!
		const user = await User.findOne({ email });

		console.log("LOGIN USER-> ", user);

		if (!user) {
			res.status(404).json({ message: "User not found!" });
		}

		if (user) {
			// PASSWORDS ARE SAME!!
			if (user.password !== password) {
				res.status(404).json({ message: "Invalid password!" });
			}
			// OK!
			const token = createToken(user._id);
			res.status(200).json({ token });
		}
	} catch (err) {
		console.log("Error: ", err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// LISTEN THE APP ON THE PRT 8080!
app.listen(port, () => console.log(`Listening on port ${port}!`));
