const express = require('express');
const app = express();
const list = require('../controller/list');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: false}));
const passport = require('passport');
const { session } = require('passport');
const authenticate = require('../midlewares/authenticate');


router.get('/getlist', authenticate, list.getList);
router.post('/add', authenticate, list.postList);
router.patch('/edit', authenticate, list.updateList);
router.delete('/delete', authenticate, list.deleteList);


module.exports = router;