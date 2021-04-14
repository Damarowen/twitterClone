
const pool = require('../db/config');

const Home = async (req, res) => {
    try {

        var payload = {
            pageTitle: "Home",
            userLoggedIn: req.session.user.username,
            userImage: req.session.user.profilepic,
            userLoggedInJs: JSON.stringify(req.session.user),
        }

        res.status(200).render("home", payload);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Something error route /Home')
    }
}


const Session = async (req, res) => {
    try {
        const user = req.session.user
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}

const Posting =  async (req, res) => {

    try {
      const {
        textArea
      } = req.body
  
      let posting = await pool.query(
        "INSERT INTO status (user_id, username, text) VALUES ($1, $2, $3) RETURNING *",
        [req.session.user.id, req.session.user.username, textArea]
      );
      res.send(posting)
    } catch (error) {
      console.log(error)
    }
}

const SeePosting =  async (req, res) => {

    try {
      const data = req.session.user.id

      let allPosting = await pool.query(
       " SELECT * FROM status WHERE user_id = $1", [data]
      );
      res.send(allPosting)
    } catch (error) {
      console.log(error)
    }
}

module.exports = {
    Home, Session, Posting, SeePosting
}