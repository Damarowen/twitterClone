let payload = {message: ''}

const LoginPage = async (req, res) => {
  try {
    res.status(200).render('auth/login')
  } catch (err) {
    console.error(err.message);
  }
};

const RegisterPage = async (req, res) => {
  try {
    payload.message = "";
    res.status(200).render('auth/register', payload)
  } catch (err) {
    console.error(err.message);
  }
};

const Register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmpassword
    } = req.body

    if (username && email && password && confirmpassword) {
      console.log('NEXT')
    } else {
      payload.message = "Make sure each field has a valid value.";
      res.status(200).render("auth/register", payload);
    }
  } catch (err) {
    console.error(err.message);
  }
};

const Login = async (req, res) => {
  try {
    console.log(req.body)
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  LoginPage,
  RegisterPage,
  Login,
  Register
}