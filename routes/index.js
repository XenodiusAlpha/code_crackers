// declare variable for required router function
const router = require('express').Router();
// declare start position of routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
// if route can't be found, will instruct of wrong route
router.use((req, res) => res.send('Wrong route!'));
// export to be used
module.exports = router;