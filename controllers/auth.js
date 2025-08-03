const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    // const password = req.body.password;

    try {
        req.session.isLoggedIn = true; // Set session variable
        const user = await User.findOne({ email: email });

        if (user) {
            req.session.user = user; // Store user in session
            req.session.isLoggedIn = true; // Set logged-in status
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
    }
}
