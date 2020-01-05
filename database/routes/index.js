const express = require('express'),
	  router = express.Router(),
	  User = require('../models/user');

//Routes

router.post('/register', function(req, res) {
	let newUser = {username: req.body.username, password: req.body.password};
	User.create(newUser, function(err, user) {
		if(err) {
			console.log(err.errmsg);
		} else {
			res.send("Success!");
		}
	});
});

// router.get('/login', function(req, res) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 	}
// });

module.exports = router;