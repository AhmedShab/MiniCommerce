const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    // const password = req.body.password;

    try {
        const user = await User.findOne({ email });

        if (user) {
            req.session.user = user; // Store user in session
            req.session.isLoggedIn = true; // Set logged-in status
            await req.session.save();
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
    }
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
};

exports.postSignup = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;

    try {
        const userDoc =  await User.findOne({ email });

        if (userDoc) {
            return res.redirect('/login');
        }

        const newUser = new User({
            email,
            password,
        });

        await newUser.save();

        res.redirect('/login');

    } catch (err) {
        console.log(err);
    }
};
