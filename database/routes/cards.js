const express = require('express'),
	  router = express.Router(),
	  User = require('../models/user'),
	  Giftcard = require('../models/giftcard'),
	  RewardsCard = require('../models/rewardsCard');

// TODO change routes to be '/cards/....'?
//Giftcards Routes
	//Index
router.get("/cards/giftcards", function(req,res) {
	Giftcard.find({}, function(err, allGiftcards) {
		if(err) {
			console.log("Giftcard find error: ", err)
		} else {
			res.json(allGiftcards);
		}
	});
});

	//Show single card info
router.get("/cards/giftcards/:id", function(req, res) {
	Giftcard.findById(req.params.id, function(err, giftcard) {
		if(err) {
			console.log("Find card Express error: ", err)
		} else {
			res.json(giftcard);
		}
	});
});
	
	//Add transaction
router.put("/cards/giftcards/:id", function(req, res) {
	const date = new Date();
	date.setHours(0,0,0,0);

	const balance = req.body.balance;
	const transaction = {
		date: date,
		amount: req.body.amount
	};

	Giftcard.findByIdAndUpdate(req.params.id, {balance: balance, $push: {transactions: transaction}}, function(err, giftcard) {
		if(err) {
			console.log("Error: ", err);
		} else {
			res.send("Transaction added!");
		}
	});
});

	//Show transactions
router.get("/cards/giftcards/:id/transactions", function(req, res) {
	Giftcard.findById(req.params.id, function(err, giftcard) {
		if(err) {
			console.log("Transactions query error: ", err)
		} else if(giftcard.transactions != null) {
			res.json(giftcard.transactions);
		} else {
			res.send("No transactions");
		}
	});
});

	//Edit and Update
router.put("/cards/:cardType/:id/edit", function(req, res) {
	if(req.params.cardType === 'giftcards') {
		const card = {
			storeName: req.body.storeName,
			amount: req.body.amount,
			balance: req.body.balance,
			barcode: req.body.barcode,
			pin: req.body.pin
		};
		
		Giftcard.findByIdAndUpdate(req.params.id, card, function(err, giftcard) {
			if(err) {
				console.log("Error: ", err);
			} else {
				res.send("Card updated!");
			}
		});
	} else if (req.params.cardType === 'rewards') {
		const card = {
			storeName: req.body.storeName,
			barcode: req.body.barcode
		};
		
		RewardsCard.findByIdAndUpdate(req.params.id, card, function(err, rewardsCard) {
			if(err) {
				console.log("Error: ", err);
			} else {
				res.send("Card updated!");
			}
		});
	}
});

router.put("/giftcards/:id", function(req, res) {
	res.send("Update DB then back to store page");
});

	//Destroy
router.delete("/cards/:cardType/:id/delete", function(req, res) {
	console.log("delete route. ", req.params.id);
	if(req.body.cardType === 'giftcard') {
		Giftcard.findByIdAndRemove(req.params.id, function(err) {
			if(err) {
				res.send("Error: ", err);
			} else {
				res.send("Deleted");
			}
		});
	} else if (req.body.cardType === 'rewardsCard') {
		RewardsCard.findByIdAndRemove(req.params.id, function(err) {
			if(err) {
				res.send("Error: ", err);
			} else {
				res.send("Deleted");
			}
		});
	}
});


//Rewards card routes
	//Index
router.get("/cards/rewards", function(req, res) {
	RewardsCard.find({}, function(err, allRewardsCards) {
		if(err) {
			console.log("Rewards card find error: ", err)
		} else {
			res.json(allRewardsCards);
		}
	});
});

	//Show
router.get("/rewards/:id", function(req,res) {
	res.send("View store page");
});

	//Edit and Update
router.get("/rewards/:id/edit", function(req, res) {
	res.send("Edit rewards card page");
});

router.put("/rewards/:id", function(req, res) {
	res.send("Update DB then back to store page");
});

	//Destroy
router.delete("/rewards/:id", function(req, res) {
	res.send("Delete rewards card from DB");
});

//Show all cards
router.get("/cards", async function(req, res) {
	const data = {
		giftcards: [],
		rewardsCards: []
	};

	const findGCs = Giftcard.find({}, function(err, allGiftcards) {
		if(err) {
			console.log("Giftcard query error: ", err)
		} else {
			data.giftcards = allGiftcards;
		}
	});

	const findRewards = RewardsCard.find({}, function(err, allRewardsCards) {
		if(err) {
			console.log("Rewards query error: ", )
		} else {
			data.rewardsCards = allRewardsCards;
		}
	});

	await findGCs.catch(err => console.log(err));
	await findRewards.catch(err => console.log(err));
	res.json(data);
});

//Create new card
router.post("/cards", function(req, res) {
	let newCard = {
		username: req.body.username,
		cardType: req.body.cardType,
		storeName: req.body.storeName,
		amount: req.body.amount,
		balance: req.body.balance,
		barcode: req.body.barcode,
		pin: req.body.pin
	};

	if(newCard.cardType === "giftcard") {
		Giftcard.create(newCard, function(err, card) {
			if(err) {
				console.log(err.errmsg);
			} else {
				res.send("Success!");
			}
		});
	} else {
		RewardsCard.create(newCard, function(err, card) {
			if(err) {
				console.log(err.name);
			} else {
				res.send("Success!");
			}
		});
	}
});

module.exports = router;