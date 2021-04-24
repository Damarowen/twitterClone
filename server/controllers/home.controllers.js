const pool = require('../db/config');


//**GET HOMEPAGE
//** @route  /home
//** @access  private
const Home = async (req, res) => {
  try {

    var payload = {
      pageTitle: "Home",
      userLoggedIn: req.session.user.username,
      userImage: req.session.user.profilepic,
    }

    res.status(200).render("home", payload);
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Something error route /Home')
  }
}

//**GET SESSION
//** @route  /Session
//** @access  private
const Session = async (req, res) => {
  try {
    const user = req.session.user
    res.send(user)
  } catch (error) {
    console.log(error)
  }
}


//**POST POSTING
//** @route  /posting
//** @access  private

const Posting = async (req, res) => {

  try {
    const {
      textArea
    } = req.body

    let posting = await pool.query(
      "INSERT INTO status (user_id,  username, text) VALUES ($1, $2,$3) RETURNING *",
      [req.session.user.id, req.session.user.username, textArea]
    );
    res.send(posting)
  } catch (error) {
    console.log(error)
  }
}


//**GET SINGLE POSTING
//** @route  /post/ID
//** @access  PUBLIC

const SinglePostingPage = async (req, res) => {

  try {
    var payload = {
      pageTitle: "View Post",
      userLoggedIn: req.session.user.username,
      userImage: req.session.user.profilepic,
      postId: req.params.id,
      data: [{name: 'damar', age: 12}, {name: 'seno', age: 12}]
    }
    res.status(200).render("postPage", payload);
  } catch (error) {
    console.log(error)
    return res.redirect('/')
  }
}


//**GET ALL POSTING
//** @route  /see_posting
//** @access  private
const SeePosting = async (req, res) => {

  try {

    const postId = req.query.ID

    //* using this for rendering 1 post for reply
    if (req.query.ID) {
      let query = await pool.query(`SELECT * FROM status WHERE status_id = $1`, [postId])
      return res.status(200).send(query.rows[0])
    } else {

      //* using this for rendering all postX
      let allPosting = await pool.query(
        " SELECT * FROM status ORDER BY datetime"
      );

      return res.send(allPosting)
    }


  } catch (error) {
    console.log(error)
  }
}



//**PUT LIKE BUTTON
//** @route  /:ID/LIKE
//** @access  private
const Likes = async (req, res) => {


  try {
    let postId = req.params.id;
    let userId = req.session.user.id


    //* check if user already liked
    let query = await pool.query(`SELECT likes FROM users WHERE id = $1`, [userId])
    const isLiked = query.rows[0].likes.includes(parseInt(postId))


    if (isLiked) {
      //* pull like
      await pool.query(
        `UPDATE status SET likes = array_remove(likes, '${userId}') WHERE status_id = ${postId}`
      )

      await pool.query(
        `UPDATE users SET likes = array_remove(likes, '${postId}') WHERE id = '${userId}'`
      )
      query = await pool.query(`SELECT likes FROM status WHERE status_id = $1`, [postId])

      let chunk = [query, userId]
      //* sending to client query and userId
      res.status(200).send(chunk)

      console.log('success pull likes')
    } else {
      //* add like
      await pool.query(
        `UPDATE status SET likes = array_append(likes, '${userId}') WHERE status_id = ${postId}`
      )

      await pool.query(
        `UPDATE users SET likes = array_append(likes, '${postId}') WHERE id = '${userId}'`
      )

      query = await pool.query(`SELECT likes FROM status WHERE status_id = $1`, [postId])
      let chunk = [query, userId]
      //* sending to client query and userId

      res.status(200).send(chunk)
      console.log('success add likes')

    }

  } catch (err) {
    console.error(err)
  }
}

//**POST RETWEET BUTTON
//** @route  /:ID/RETWEET
//** @access  private
const Retweet = async (req, res) => {


  try {
    let postId = req.params.id;
    let userId = req.session.user.id

    //* check if user already rewteets
    let query = await pool.query(`SELECT retweets FROM users WHERE id = $1`, [userId])
    const isRetweet = query.rows[0].retweets.includes(parseInt(postId))


    if (isRetweet) {
      //* pull like
      await pool.query(
        `UPDATE status SET retweetby = array_remove(retweetby  , '${userId}') WHERE status_id = ${postId}`
      )

      await pool.query(
        `UPDATE users SET retweets  = array_remove(retweets   , '${postId}') WHERE id = '${userId}'`
      )
      query = await pool.query(`SELECT * FROM status WHERE status_id = $1`, [postId])

      let chunk = [query, userId]
      //* sending to client query and userId
      res.status(200).send(chunk)

      console.log('success pull retweet')
    } else {
      //* add like
      await pool.query(
        `UPDATE status SET retweetby  = array_append(retweetby , '${userId}') WHERE status_id = ${postId}`
      )

      await pool.query(
        `UPDATE users SET retweets   = array_append(retweets   , '${postId}') WHERE id = '${userId}'`
      )

      query = await pool.query(`SELECT * FROM status WHERE status_id = $1`, [postId])
      let chunk = [query, userId]
      //* sending to client query and userId

      res.status(200).send(chunk)
      console.log('success add retweet')

    }

  } catch (err) {
    console.error(err)
  }
}

//**POST RETWEET BUTTON
//** @route  /:ID/RETWEET
//** @access  private
const Reply = async (req, res) => {

  try {
    let postId = req.params.id;
    let userId = req.session.user.id
    let {
      textArea
    } = req.body

    //*find username
    let usernames = await pool.query(`SELECT username FROM status WHERE status_id = $1`, [postId])

    let posting = await pool.query(
      "INSERT INTO status (user_id,  username, text, replyto) VALUES ($1, $2,$3, $4) RETURNING *",
      [userId, req.session.user.username, textArea, [postId, usernames.rows[0].username]]
    );

    res.status(200).send(posting)


  } catch (err) {
    console.error(err)
  }
}


module.exports = {
  Home,
  Session,
  Posting,
  SinglePostingPage,
  SeePosting,
  Likes,
  Retweet,
  Reply
}