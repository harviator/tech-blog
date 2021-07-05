const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

//localhost3001/api/post etc...
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;