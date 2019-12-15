const mongoose = require('mongoose');
const config = require('../../config');

// Set up default mongoose connection
const mongoDB = `mongodb+srv://${config.mongo.user}:${config.mongo.pass}@${config.mongo.host}/${config.mongo.database}?retryWrites=true&w=majority`;

const connection = {};
let db = {};

module.exports = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection is disconnected due to application termination');
      process.exit(0);
    });
  });

  if (connection.isConnected) {
    console.log('using existing database connection');
  } else {
    db = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      keepAlive: true,
    });
    connection.isConnected = db.connections[0].readyState;
  }
  return Promise.resolve(db);
};
