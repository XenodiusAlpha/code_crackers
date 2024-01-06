// declare variable to use Schema class and model function from mongoose dependency
const { Schema, model } = require('mongoose');
// import Reaction model to be used in thoughtSchema
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStampFormat => new Date(timeStampFormat).toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    },
);

// Virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
});

// instantiate User variable with a name and it's schema properties
const Thought = model('thought', thoughtSchema);

// exports User model to be used
module.exports = Thought;