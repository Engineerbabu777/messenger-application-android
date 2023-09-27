const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

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

// LISTEN THE APP ON THE PRT 8080!
app.listen(port, () => console.log(`Listening on port ${port}!`));
