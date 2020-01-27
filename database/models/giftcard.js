const mongoose = require("mongoose");

const giftcardSchema = new mongoose.Schema({
	userID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	storeName: String,
	amount: Number,
	balance: Number,
	barcode: Number,
	pin: Number,
	transactions: [{
		date: Date,
		amount: Number
	}],
	logo: String,
	storeColor: String
});

module.exports = mongoose.model("Giftcard", giftcardSchema);