const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

class User {
  constructor(id, name, email, cart) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.cart = cart;
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

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp.productId === product._id;
    // });

    const updatedCart = { items: [{ productId: new ObjectId(String(product._id)), quantity: 1 }] };
    const db = getDb();

    return db.collection('users')
      .updateOne(
        { _id: new ObjectId(String(this._id)) },
        { $set: { cart: updatedCart } }
      )
      .then(result => {
        console.log('Cart updated:', result);
      })
      .catch(err => {
        console.error('Error updating cart:', err);
      });
  }

  getCart() {
    const db = getDb();

    return db.collection('users')
      .findOne({ _id: new ObjectId(String(this._id)) })
      .then(user => {
        return user.cart;
      })
      .catch(err => {
        console.error('Error fetching cart:', err);
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
