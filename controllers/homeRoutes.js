const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Get Homepage
router.get('/', async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const userPosts = userPostData.map((post) => post.get({ plain: true }));

    console.log(userPosts);

    res.render('homepage', {
      userPosts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get One Post

// Get Dashboard - need with auth
router.get('/dashboard', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: {
        user_id: 1//req.session.user_id
      }
    })


    const posts = postsData.map(post => post.get({ plain: true }));
    console.log(posts)
    res.render('dashboard', {
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login')
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
  }

  res.render('signup')
});

module.exports = router;