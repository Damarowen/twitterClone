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

const Posting = async (req, res) => {

  try {
    const {
      textArea
    } = req.body

    let posting = await pool.query(
      "INSERT INTO status (user_id,  text) VALUES ($1, $2) RETURNING *",
      [req.session.user.id, textArea]
    );
    res.send(posting)
  } catch (error) {
    console.log(error)
  }
}

const SeePosting = async (req, res) => {

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


const Likes = async (req, res) => {


  try {
    let postId = req.params.id;
    let userId = req.session.user.id
    const key = req.session.user.likes ? Object.values(req.session.user.likes) : req.session.user.likes
    
    let isLiked = req.session.user.likes && key.includes(Math.floor(postId))

    //* if user already liked

    // console.log('isLiked', postId)

    // // //* add like
    // await pool.query(
    //   `UPDATE status SET likes = array_cat(likes, '{${userId}}') WHERE status_id = ${postId}`
    // )

    await pool.query(
      `UPDATE users SET likes = array_cat(likes, '{${postId}}') WHERE id = '${userId}'`
    )

    // if (isLiked) {
    //   //* pull like
    //   await pool.query(
    //     `UPDATE status SET likes = array_remove(likes, '${userId}')`
    //   )

    //   await pool.query(
    //     `UPDATE users SET likes = array_remove(likes, '${postId}')`
    //   )
    // }

    console.log('isLiked', isLiked)
    res.status(200).send("Like Sent")
  } catch (err) {
    console.error(err)
  }
}


module.exports = {
  Home,
  Session,
  Posting,
  SeePosting,
  Likes
}