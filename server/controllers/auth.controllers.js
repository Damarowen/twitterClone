const bcrypt = require('bcrypt')
const pool = require('../db/config');

//* to display message
class Message {
  constructor(message) {
    this.message = message
  }
}


//**RENDER login page
//** @route  /login
//** @access  public

const LoginPage = async (req, res) => {
  try {
    res.status(200).render('auth/login')
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(' something error')

  }
};


//**RENDER register page
//** @route  /register
//** @access  public

const RegisterPage = async (req, res) => {
  try {
    res.status(200).render('auth/register')
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(' something error')

  }
};



//**POST REGISTER
//** @route  /register
//** @access  public

const Register = async (req, res) => {
  try {

    //*1 dessutcure the req.body

    const {
      username,
      email,
      password,
      confirmpassword
    } = req.body

    //*2 check if user exist
    const user = await pool.query(" SELECT * FROM users WHERE email = $1 OR username =$2", [email, username]);
    if (user.rows.length > 0) {
      if (user.rows[0].email == email) {
        let message = new Message("Email Already Exist")
        return res.status(400).render('auth/register', message)
      }
      if (user.rows[0].username == username) {
        let message = new Message("Username Already Exist")
        return res.status(400).render('auth/register', message)
      }
    }

    //*3 bcrypt the pass

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    if (password !== confirmpassword) {
      let message = new Message("Pass not same")
      res.status(200).render("auth/register", message);
    }
    const bcryptPassword = await bcrypt.hash(confirmpassword, salt)

    //*4. insert new user and give req.session
    const User = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, bcryptPassword]
    );
    req.session.user = User.rows[0];
    res.status(201).redirect('/')

    // if (username && email && password && confirmpassword) {
    //   return res.redirect('/')
    // } else {
    //   let message = new Message("Username Already Exist")
    //    res.status(401).render("auth/register", message);
    // }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(' something error')

  }
};


//**POST LOGIN
//** @route  /login
//** @access  public

const Login = async (req, res) => {
  try {

    //*1. Destructure the req.body
    const {
      email,
      password
    } = req.body

    //* 2 check if user exist
    const user = await pool.query(' SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length == 0) {
      let message = new Message('Email is not registered')
      return res.status(401).render('auth/login', message)
    }


    //* 3 check if incoming pass same to the db pass

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      let message = new Message('Password incorect')
      console.log('valid', validPassword)
      return res.status(401).render('auth/login', message)
    }
    console.log('valid', validPassword)
    //*4. give login user session

    req.session.user = user.rows[0];
    return res.redirect('/')

  } catch (err) {
    console.error(err.message);
    return res.status(500).send(' something error')

  }
};


//**GET LOGOUT
//** @route  /logout
//** @access  private

const Logout = async (req, res) => {
  try {

    // req.session.destroy(() => {
    //   res.redirect('/login')
    // })
    req.session = null
    res.redirect('/login')


  } catch (err) {
    console.error(err.message);
    return res.status(500).send(' something error')
  }
};



module.exports = {
  LoginPage,
  RegisterPage,
  Login,
  Register,
  Logout
}