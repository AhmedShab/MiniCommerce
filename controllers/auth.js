const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const { validationResult } = require('express-validator');

const User = require('../models/user')

const { randomBytes } = require('crypto');
const { promisify } = require('util');

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

exports.getReset = (req, res, next) => {
    const errorMessage = req.flash('error')[0] || null;

    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage,
    });
};

exports.getNewPassword = async(req, res, next) => {
    const { token } = req.params;
    const errorMessage = req.flash('error')[0] || null;
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

    if (!token) {
        return res.redirect('/login');
    }

    if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
    }

    res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage,
        userId: user._id,
        token: user.resetToken
    });
};

exports.postNewPassword = async(req, res, next) => {
    const { password, userId, token } = req.body;

    try {
        const user = await User.findOne({ _id: userId, resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);
        
        user.password = hashPassword;
        user.resetToken = undefined; // Clear reset token
        user.resetTokenExpiration = undefined; // Clear expiration date

        await user.save();
        return res.redirect('/login');
    } catch (err) {
        console.log(err);
    }
};

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
        });
    }
    res.redirect('/');
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: errors.array()[0].msg,
        });
    }

    try {
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

exports.postReset = async (req, res, next) => {
    const promisifyRandomBytes = promisify(randomBytes);
    const { email } = req.body;

    try {
        const buffer = await promisifyRandomBytes(32);
        const token = buffer.toString('hex');
        const user = await User.findOne({ email });

        if (!user) {
            req.flash('error', 'No account with that email found.');
            return res.redirect('/reset');
        }

        user.resetToken = token;
        user.resetTokenExpiration = new Date(Date.now() + 3600000); // Token valid for 1 hour
        await user.save();

        await transporter.send({
            to: email,
            from: 'ahmed.vuw@gmail.com',
            subject: 'Password Reset',
            html: `
                <h1>Password Reset</h1>
                <p>You requested a password reset</p>
                <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
            `
        });

        res.redirect('/login');

    } catch (err) {
        console.log(err);
        return res.redirect('/reset');
    }
};