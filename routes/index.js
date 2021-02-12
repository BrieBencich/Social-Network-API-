
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
   console.log(req);
     res.status(404).send('error');
   });

module.exports = router;
