const mongoose = require("mongoose");

const rewardsCardSchema = new mongoose.Schema({
	userID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	storeName: String,
	barcode: Number,
	logo: String,
	storeColor: String
});

module.exports = mongoose.model("RewardsCard", rewardsCardSchema);