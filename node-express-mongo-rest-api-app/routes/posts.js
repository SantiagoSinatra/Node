const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { remove } = require('../models/Post');

//GETS BACK ALL THE POSTS FROM THE DATABASE
router.get('/', async (req, res) => { //This is the handler for all the /post requrests. It doesnt say / post because it is already /post.
  //get the data from the database
  try {
    const posts = await Post.find(); //Mongoose method to get documents in this case is applied to the model Post therefore it will return all the Posts in the database.
    res.json(posts);
  } catch (error) {
    res.json({message:error});
  }
});


router.get('/specific', (req, res) => { //In this case this is /post/specific. 
  res.send('We are on a specific post');
});

//GETS BACK A SPECIFIC POST
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);   
  } catch (error) {
    res.json({ message:err });
  }
});

//SUBMITS A POST ASYNC
//Asynchronous
router.post('/', async (req, res) => {
  /* console.log(req.body); Test if the info is ariving properly*/
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  //save a post into the database async way.
  try {
  const savedPost = await post.save();
  res.json(savedPost);
  } catch(err) {
    res.json(savedPost);
  }
});

//SUBMITS A POST SYNC
// not asynchronous (just for showing)
router.post('/test', (req, res) => {
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

//UPDATE A POST
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true});
    res.send(updatedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE POST
//Useful url https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas
router.delete('/:postId', async (req,res) => {
  try {
    const removedPost = await Post.findByIdAndDelete(req.params.postId);
    if(!removedPost) res.status(404).send('No item found');
    res.status(200).send('The post has been deleted from the face of the earth');
  } catch (error) {
    res.status(500).send(err);
  }
});

module.exports = router;