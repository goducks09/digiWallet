const mongoose = require("mongoose");

const rewardsCardSchema = new mongoose.Schema({
	storeName: String,
	barcode: Number,
	logo: String,
	storeColor: String
});

module.exports = mongoose.model("RewardsCard", rewardsCardSchema);