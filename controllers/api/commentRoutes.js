const router = require('express').Router();
const { Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// Creat New Post Route
router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.body.id
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Put route to update post
router.put('/:id', async (req, res) => {
    try {
      const postData = await Post.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      console.log(postData);

      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;

// Delete route to delete post
router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;