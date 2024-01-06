// declare variable to use Schema class and model function from mongoose dependency
const { Schema, Types } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // using getter method to format the timestamp on query
            get: timeStampFormat => new Date(timeStampFormat).toLocaleString(),
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    },
);

// exports User model to be used
module.exports = reactionSchema;