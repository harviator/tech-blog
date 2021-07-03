const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Get Homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        
        console.log(posts);

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get One Post

// Get Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
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