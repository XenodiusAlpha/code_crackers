// declare variable for required router function
const router = require('express').Router();

// call functions from userController to be used in routes
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/users route for getUsers and createUser
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId route for getSingleUser, updateUser and deleteUser
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId route for addFriend and deleteFriend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// export all userRoutes 
module.exports = router;