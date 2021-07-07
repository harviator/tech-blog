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

// Get One Post - Comments
router.get('/viewpost/:id', async (req, res) => {
  //give me all comments where post id equals something include tue user info and tue post info
  try {
    const userPostData = await Post.findOne({

      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: { 
            model: User 
          }



        }
      ],
      where:{
        id:req.params.id
      }
    });

    const postData = userPostData.get({ plain: true });

    console.log(postData);

    res.render('viewpost', {
      logged_in: true,
      userPostData: postData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//to get the post form when you click the add button
router.get('/post', async (req, res) => {

  res.render('post', {
    logged_in: true
  });
});

//one to get the edit form 
router.get('/editpost/:id', async (req, res) => {
  try {
    const userPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    const postData = userPostData.get({ plain: true });

    console.log(postData);

    res.render('editpost', {
      logged_in: true,
      userPostData: postData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Dashboard - need with auth
router.get('/dashboard', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: {
        user_id: req.session.user_id
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