const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

//localhost3001/api/post etc...
router.use('/users', userRoutes);
router.use('/post', postRoutes);

module.exports = router;