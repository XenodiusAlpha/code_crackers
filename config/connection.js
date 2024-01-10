const { connect, connection } = require('mongoose');

// depending on if it's used via heroku or locally, it will use one of these connections
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codeCrackersDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// exports connection to be used for the server connection in index.js via the root folder
module.exports = connection;