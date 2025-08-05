const express = require('express');

const authController = require('../controllers/auth');
const { signUp, login } = require('../middleware/validation');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/login', login, authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/signup', signUp, authController.postSignup);

router.post('/reset', authController.postReset);

router.post('/new-password', authController.postNewPassword);

module.exports = router;