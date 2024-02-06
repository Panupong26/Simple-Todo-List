const express = require('express');
const router = express.Router();
const user = require('../controller/user');
router.use(express.json());
router.use(express.urlencoded({extended: false}));
const passport = require('passport');
const { session } = require('passport');
const authenticate = require('../midlewares/authenticate');

router.post('/login', user.login);
router.post('/register', user.register);
router.get('/profile', authenticate, user.profile);


module.exports = router;