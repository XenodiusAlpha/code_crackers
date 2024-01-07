// Import Thought and User models to be used in functions
const { Thought, User } = require('../models');

module.exports = {
    // Get all Users
    async getUsers(req, res) {
        try {
            // finds all users and populates their thoughts and friends fields
            const users = await User.find()
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v'});

            res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Get a single User
    async getSingleUser(req, res) {
        try {
            // finds single user and populates their thoughts and friends fields
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v'});
            
            // checks to see if user does not exist and if so throw's an error
            if (!user) {
                return res.status(404).json({ message: 'There is no user with that ID' });
            }

            res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            // checks to see if user does not exist and if so throw's an error
            if (!user) {
                return res.status(404).json({ message: 'There is no user with that ID' });
            }

            res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Delete a User and their thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            // checks to see if user does not exist and if so throw's an error
            if (!user) {
                return res.status(404).json({ message: 'There is no user with that ID' });
            }

            // deletes the user's thoughts
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.status(200).json({ message: 'User and their thoughts have been removed.'});
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Add a User as a friend
    async addFriend(req, res) {
        try {
            const userFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!userFriend) {
                return res.status(404).json({ message: 'There is no user with that ID' });
            }

            res.status(200).json(userFriend);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Delete a friend
    async deleteFriend(req, res) {
        try {
            const userFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );

            // checks to see if user does not exist and if so throw's an error
            if (!userFriend) {
                return res.status(404).json({ message: 'There is no user with that ID' });
            }

            res.status(200).json(userFriend);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};
