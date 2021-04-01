const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());


const requireLogin = require('../middleware/requireLogin')
const { LoginPage, Login, RegisterPage, Register }   = require('../controllers/auth');



router.get('/login', LoginPage).post('/login', Login);
router.get('/', (req,res) => {
res.send('post succeed')
})

router.get('/register', RegisterPage).post('/register', Register)




module.exports = router;