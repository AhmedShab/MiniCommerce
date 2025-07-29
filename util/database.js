const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = cb => {
  MongoClient.connect('mongodb+srv://ahmed:xr7bfKQ2Qmbf5KS0@cluster0.zzmzliw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
      console.log('Connected to MongoDB');
      cb(client);
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
    });
}

module.exports = mongoConnect;