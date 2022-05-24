class AuthorizationController {
	getLogin(req, res) {
			res.render('auth/login', {
			title: 'Log In'
		});
	}
	getRegistration(req, res) {
		res.render('auth/registration', {
			title: 'Registration'
		});
	}
}

module.exports = new AuthorizationController();