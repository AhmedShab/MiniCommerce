const bcrypt = require('bcryptjs');

const sgMail = require('@sendgrid/mail');
const User = require('../models/user')

const transporter = sgMail;
transporter.setApiKey(process.env.SENDGRID_API_KEY);


exports.getLogin = (req, res, next) => {
    const errorMessage = req.flash('error')[0] || null;

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage,
    });
};

exports.getSignup = (req, res, next) => {
    const errorMessage = req.flash('error')[0] || null;
    
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
        errorMessage
  });
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        } else {
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                req.flash('error', 'Invalid email or password');
                console.log('Invalid password');
                return res.redirect('/login');
            }

            req.session.user = user; // Store user in session
            req.session.isLoggedIn = true; // Set logged-in status
            await req.session.save();

            res.redirect('/');
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
            req.flash('error', 'Email already exists');
            return res.redirect('/login');
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashPassword,
        });

        await newUser.save();
        await transporter.send({
            to: email,
            from: 'ahmed.vuw@gmail.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
        });

        res.redirect('/login');

    } catch (err) {
        console.log(err);
    }
};
