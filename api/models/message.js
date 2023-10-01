const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		recepientId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		messageType: {
			type: String,
			enum: ["text", "image"],
		},
		messageText: String,
		imageUrl: String,
	},
	{
		timestamps: true,
	}
);

const messageModel =
	mongoose.models.message || mongoose.model("message", Schema);
module.exports = messageModel;
