const express = require('express');
const router = express.Router();

const requireLogin = require('../middleware/requireLogin')
const { Login,Register}   = require('../controllers/auth');



router.get('/login', Login);
router.get('/Register', Register);




module.exports = router;