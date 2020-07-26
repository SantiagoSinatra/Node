const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => { //This is the handler for all the /post requrests. It doesnt say / post because it is already /post.
  res.send('We are on posts');
});

router.get('/specific', (req, res) => { //In this case this is /post/specific. 
  res.send('We are on a specific post');
});

router.post('/', (req, res) => {
  /* console.log(req.body); Test if the info is ariving properly*/
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  //save a post into the database
  post.save()
      .then(data => {
        res.status(200).json(data); //if success return the post from the database and status ok
      })
      .catch(err => {
        res.status(400).json({message: err}); //else return the error.
      });
});

module.exports = router;