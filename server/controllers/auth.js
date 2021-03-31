

const Login = async (req, res) => {
    try {

      res.status(200).render('auth/login')
    } catch (err) {
      console.error(err.message);
    }
  };

  const Register = async (req, res) => {
    try {
  
      res.status(200).render('auth/register')
    } catch (err) {
      console.error(err.message);
    }
  };
  
  module.exports = {
    Login,
    Register
  }