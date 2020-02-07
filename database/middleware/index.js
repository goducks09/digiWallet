const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
    res.status(403).send("Login error. Pleaes try again.");
}

module.exports = middlewareObj;