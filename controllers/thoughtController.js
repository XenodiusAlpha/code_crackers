// Import Thought and User models to be used in functions
const { Thought, User } = require('../models');

module.exports = {
    // Get all Thoughts
    async getThoughts(req, res) {
        try {
            // finds all thoughts and populates their thoughts and friends fields
            const thoughts = await Thought.find();

            res.status(200).json(thoughts);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Get a single Thought
    async getSingleThought(req, res) {
        try {
            // finds single thought with all it's information
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            
            // checks to see if thought does not exist and if so throw's an error
            if (!thought) {
                return res.status(404).json({ message: 'There is no thought with that ID' });
            }

            res.status(200).json(thought);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Create a thought
    async createThought(req, res) {
        try {
            // creates the thought
            const thought = await Thought.create(req.body);

            // associates it with a user
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                // pushing the created thought's id to the user's thoughs array
                { $push: { thoughts: thought._id }},
                { runValidators: true, new: true }
            )
            res.status(200).json({ thought, user });
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            // checks to see if thought does not exist and if so throw's an error
            if (!thought) {
                return res.status(404).json({ message: 'There is no thought with that ID' });
            }

            res.status(200).json(thought);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Delete a thought and their reactions
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            // checks to see if thought does not exist and if so throw's an error
            if (!thought) {
                return res.status(404).json({ message: 'There is no thought with that ID' });
            }

            res.status(200).json({ message: `Thoughts and it's reactions have been removed.`});
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            // find the thought to add the reaction to
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // if already added, will not re-add $addToSet
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thoughtReaction) {
                return res.status(404).json({ message: 'There is no thought with that ID' });
            }

            res.status(200).json(thoughtReaction);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // removes reaction specified in the params from the selected thought
                { $pull: { reactions: { _id: req.params.reactionId }}},
                { runValidators: true, new: true }
            );

            // checks to see if reaction does not exist and if so throw's an error
            if (!thoughtReaction) {
                return res.status(404).json({ message: 'There is no reaction with that ID' });
            }

            res.status(200).json(thoughtReaction);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};
