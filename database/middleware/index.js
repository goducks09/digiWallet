const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
    console.log("Login error. Pleaes try again.");
    res.sendStatus(403);
}

module.exports = middlewareObj;