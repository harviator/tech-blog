const router = require('express').Router();
const userRoutes = require('./userRoutes');
//const projectRoutes = require('./projectRoutes');

//localhost3001/api/user etc...
router.use('/users', userRoutes);
//router.use('/projects', projectRoutes);

module.exports = router;