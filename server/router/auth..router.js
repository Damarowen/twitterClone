const express = require('express');
const router = express.Router();



const {
  LoginPage,
  Login,
  RegisterPage,
  Register,
  Logout
} = require('../controllers/auth.controllers');



router.get('/login', LoginPage).post('/login', Login);
router.get('/register', RegisterPage).post('/register', Register)
router.get('/logout', Logout)






module.exports = router;