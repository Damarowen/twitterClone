const express = require('express');
const router = express.Router();

//*middleware
const requireLogin = require('../middleware/requireLogin')

const {
  Home, Session, Posting, SinglePostingPage, SeePosting, Likes, Retweet, Reply
} = require('../controllers/home.controllers');


router.get("/", (req,res) => {
    return res.redirect('/home')
  })
  
  router.get("/home", requireLogin, Home)
  router.get('/session', Session)
  router.get('/see_posting', SeePosting)
  router.get('/post/:id', SinglePostingPage )


  router.put('/:id/like', Likes )
  router.post('/posting', Posting )
  router.post('/:id/retweet', Retweet )
  router.post('/post/:id', Reply )

  module.exports = router;