const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();

    return db.collection('users')
      .insertOne(this)
      .then(result => {
        console.log('User saved:', result);
      })
      .catch(err => {
        console.error('Error saving user:', err);
      });
  }

  static findById(userId) {
    const db = getDb();

    return db.collection('users')
      .findOne({ _id: new ObjectId(String(userId)) })
      .then(user => {
        console.log('User found:', user);
        return user;
      })
      .catch(err => {
        console.error('Error finding user:', err);
      });
  }
}

module.exports = User;
