const express = require('express'),
	  router = express.Router(),
	  passport = require('passport'),
	  User = require('../models/user'),
	  middleware = require('../middleware/index');

router.post('/register', function(req, res) {
	let newUser = {username: req.body.username};
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err.errmsg);
		}

		passport.authenticate('local')(req, res, function() {
			res.json(user)
		});
	});
});

router.post('/login', passport.authenticate('local'), function (req, res) {
	res.json(req.user);
});

router.get('/authenticate', middleware.isLoggedIn, function(req, res) {
	res.json(req.user);
});

router.get('/logout', middleware.isLoggedIn, function(req, res) {
	req.logout();
	res.sendStatus(200);
});

module.exports = router;