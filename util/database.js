const { MongoClient, Db } = require('mongodb');


/**
 * @type { Db }
 */
let _db;

// @ts-ignore
const mongoConnect = cb => {
  MongoClient.connect('mongodb+srv://ahmed:xr7bfKQ2Qmbf5KS0@cluster0.zzmzliw.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
      console.log('Connected to MongoDB');
      _db = client.db();
      cb();
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error('No database found!');
}

module.exports = { mongoConnect, getDb };