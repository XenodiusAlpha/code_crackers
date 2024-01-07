// declare variable for required router function
const router = require('express').Router();

// call functions from thoughtController to be used in routes
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts route for getThoughts and createThought
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId route for getSingleThought, updateThought and deleteThought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions route for addReaction
router.route('/:thoughtId/reactions').post(addReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId route for deleteReaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// export all userRoutes 
module.exports = router;