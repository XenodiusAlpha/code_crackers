// declare variable to use Schema class and model function from mongoose dependency
const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email address, please retry.'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    },
);

// Virtual property `friendCount` that retrieves the length of the user's friends array field on query.
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
});

// instantiate User variable with a name and it's schema properties
const User = model('user', userSchema);

// exports User model to be used
module.exports = User;