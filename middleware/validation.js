const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.signUp = [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(async (value, { req }) => {
            const userDoc =  await User.findOne({ email: value });

            if (userDoc) {
                return Promise.reject('Email already exists');
            }
        })
    ,

    body('password', 'Please enter a password with numbers and text and at least 5 characters')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
    ,
    body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Your passwords do not match');
            }
            return true;
        })
];

exports.login = [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .trim()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value });
    
            if (!user) {
                return Promise.reject('Invalid email or password');
            }
        })
    ,
    body('password')
        .trim()
        .custom(async (value, { req }) => {

            const user = await User.findOne({ email: req.body.email });
            const isValidPassword = await bcrypt.compare(value, user.password);

            if (!isValidPassword) {
                return Promise.reject('Invalid email or password');
            }
    
            req.session.user = user; // Store user in session
            req.session.isLoggedIn = true; // Set logged-in status
            await req.session.save();
        })
]

exports.productForm = [
    body('title')
        .trim()
        .isLength({ min: 3 })
        .isString()
        .trim()
        .withMessage('Title must be at least 3 characters long'),
    body('imageUrl')
        .isURL()
        .withMessage('Please enter a valid URL'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),
    body('description')
        .trim()
        .isLength({ min: 5, max: 400 })
        .withMessage('Description must be between 5 and 400 characters long')
];
