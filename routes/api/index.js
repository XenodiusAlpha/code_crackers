// declare variable for required router function
const router = require('express').Router();
// declare thought and user routes
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// indicate to the router where to go
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// exports the various routes
module.exports = router;
