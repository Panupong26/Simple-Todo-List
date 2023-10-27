const express = require('express');
const app = express();
const list = require('../controller/list');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: false}));
const passport = require('passport');
const { session } = require('passport');

const authentication = passport.authenticate('Jwt', {session : false});


router.get('/getlist', authentication, list.getList);
router.post('/add', authentication, list.postList);
router.patch('/edit', authentication, list.updateList);
router.delete('/delete', authentication, list.deleteList);


module.exports = router;