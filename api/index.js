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

// MULTER PART!
const multer = require("multer");
// CONFIGURE MULTER FOR HANDLING FILE UPLOADS!
const storage = multer.diskStorage({
	destination: function (req, file, cal) {
		cal(null, "files/"); // SPECEIFY THE STORAGE DESTINATION!
	},
	filename: function (req, file, cal) {
		// GENERATE A UNIQUE FILE NAME FOR UPLOADING FILES!
		const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cal(null, uniqueName + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });


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

		console.log(password, email);
		// CHECK IF EMAIL AND PASSWORD IS NULL!
		if (!password || !email) {
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

// GET ALL USERS EXCEPT LOGGED-IN USER!
app.get("/users/:userId", async (req, res) => {
	try {
		const loggedInUser = req.params.userId;

		const userDocs = await User.find({ _id: { $ne: loggedInUser } });
		res.status(200).json({ userDocs, success: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "Internal server error" });
	}
});

// SEND A REQUEST TO USER!
app.post("/send-request", async (req, res) => {
	try {
		const { currentUserId, selectedUserId } = req.body;

		// SAVING IN SENDER!
		await User.findByIdAndUpdate(selectedUserId, {
			$push: { friendRequests: currentUserId },
		});

		// SAVING IN SENT-REQUEST_ID!
		await User.findByIdAndUpdate(currentUserId, {
			$push: { setRequests: selectedUserId },
		});

		// SENDING RESPONSE!
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(504).json({ error: true });
	}
});

// GET ALL FRIENDS REQUESTS FOR PARTICULAR USER !!
app.get("/friend-requests/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;

		// console.log('currentUser-> ',userId)

		const Doc = await User.findById(userId)
			.populate("friendRequests", "name email image")
			.exec();
		res.status(200).json({
			friendRequests: Doc.friendRequests,
			success: true,
			message: "init",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "Internal server error" });
	}
});

// ACCEPT REQUEST !
app.post("/accept-request/accept", async (req, res) => {
	try {
		const { userId, acceptId } = req.body;

		const userDoc = await User.findById(userId);
		const friendDoc = await User.findById(acceptId);

		userDoc.friends.push(acceptId);
		friendDoc.friends.push(userId);

		userDoc.friendRequests = userDoc.friendRequests.filter(
			(f, i) => f.toString() !== acceptId.toString()
		);
		friendDoc.setRequests = friendDoc.setRequests.filter(
			(f, i) => f.toString() !== userId.toString()
		);

		userDoc.save();
		friendDoc.save();

		res.status(200).json({
			userDoc,
			friendDoc,
			success: true,
			message: "Request accepted",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "Internal server error" });
	}
});

// GET ALL FRIENDS OF USER:!
app.get("/get-friends/:id", async (req, res) => {
	try {
		const currentUser = req.params.id;
		const friends = await User.findById(currentUser).populate(
			"friends",
			"name email image"
		);

		const allFriends = friends.friends;

		res.status(200).json({ success: true, friends: allFriends });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "Internal server error" });
	}
});


// POST MESSAGE REQUEST !!
app.post("/post-message", upload.single("file"), async (req, res) => {
	try {
		const { senderId, recepientId, messageText, messageType } = req.body;


		const newMessage = new messageModel({
			senderId,
			recepientId,
			messageText,
			messageType,
			timestamp: new Date(),
			imageUrl: messageType === "image",
		});

		await newMessage.save(); 

		res
			.status(200)
			.json({ success: true, message: "Message sent" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal server error" });
	}
});

// GET USER DETAILS!
app.get("/user/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findById(userId).select("-password");
		res.status(200).json({ success: true, recepientId: user });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal server error" });
	}
});

// RETERVE MESSAGES!!
app.get("/messages/:senderId/:recepientId", async (req, res) => {
	try {
		const { senderId, recepientId } = req.params;

		const messages = await messageModel
			.find({
				$or: [
					{ senderId: senderId, recepientId: recepientId },
					{ senderId: recepientId, recepientId: senderId },
				],
			})
			.populate("senderId", "_id name");

		res.status(200).json({ success: true, messages });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal server error" });
	}
});

// LISTEN THE APP ON THE PRT 8080!
app.listen(port, () => console.log(`Listening on port ${port}!`));
