const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());


const requireLogin = require('../middleware/requireLogin')
const { LoginPage, Login, RegisterPage, Register, Logout}   = require('../controllers/auth');

router.get("/", requireLogin, (req, res) => {

    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user.username,
        userImage: req.session.user.profilepic,
        userLoggedInJs: JSON.stringify(req.session.user),
    }

    res.status(200).render("home", payload);
})


router.get('/login', LoginPage).post('/login', Login);
router.get('/register', RegisterPage).post('/register', Register)
router.get('/logout', Logout)





module.exports = router;