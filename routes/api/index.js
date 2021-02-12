const router = require('express').Router(); 
const userRoutes = require('./user-routes'); 
const thoughRoutes = require('./thought-routes'); 

router.use('/users', userRoutes); 
router.use('/thought', thoughRoutes); 

module.exports = router; 
