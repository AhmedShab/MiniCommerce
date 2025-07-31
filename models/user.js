const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
});

module.exports = mongoose.model('User', userSchema);

//  /**
//  * @typedef {Object} Order
//  * @property {ObjectId} userId
//  * @property {Object[]} items
//  */


// const { ObjectId, Collection } = require('mongodb');

// class User {
//   constructor(id, name, email, cart) {
//     this._id = id;
//     this.name = name;
//     this.email = email;
//     this.cart = cart || { items: [] };
//   }

//   save() {
//     const db = getDb();

//     return db.collection('users')
//       .insertOne(this)
//       .then(result => {
//         console.log('User saved:', result);
//       })
//       .catch(err => {
//         console.error('Error saving user:', err);
//       });
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString();
//     });
    
//     let newQuantity = 1;
//     let updateCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updateCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updateCartItems.push({ 
//         productId: new ObjectId(String(product._id)),
//         quantity: newQuantity 
//       });
//     }

//     const updatedCart = {
//       items: updateCartItems
//     };
//     const db = getDb();

//     return db.collection('users')
//       .updateOne(
//         { _id: new ObjectId(String(this._id)) },
//         { $set: { cart: updatedCart } }
//       )
//       .then(result => {
//         console.log('Cart updated:', result);
//       })
//       .catch(err => {
//         console.error('Error updating cart:', err);
//       });
//   }

//   getCart() {
//     if (!this.cart || this.cart.items.length === 0) {
//       return Promise.resolve([]);
//     }

//     const db = getDb();
//     const productId = this.cart.items.map(item => item.productId);

//     return db.collection('products')
//       .find({ _id: { $in: productId } })
//       .toArray()
//       .then(products => {
//         return products.map(product => {
//           return {
//             ...product,
//             quantity: this.cart.items.find(item => item.productId.toString() === product._id.toString()).quantity
//           };
//         });
//       })
//       .catch(err => {
//         console.error('Error fetching cart:', err);
//       });
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItem = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     });

//     const db = getDb();

//     return db.collection('users')
//       .updateOne(
//         { _id: new ObjectId(String(this._id)) },
//         { $set: { cart: { items: updatedCartItem } } }
//       )
//       .then(users => {
//         console.log('Updated user: ', users);
        
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart().then(products => {
//       const order = {
//         user: {
//           _id: new ObjectId(String(this._id)),
//           name: this.name,
//           email: this.email
//         },
//         items: products
//       };
//       return db.collection('orders').insertOne(order);
//     })
//     .then(result => {
//         console.log('Order added:', result);
//         this.cart.items = [];

//         return db.collection('users')
//           .updateOne(
//             { _id: new ObjectId(String(this._id)) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//       .catch(err => {
//         console.error('Error adding order:', err);
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db.collection('orders')
//       .find({ 'user._id': new ObjectId(String(this._id))})
//       .toArray()
//       .then(orders => {
//         console.log('Orders fetched:', orders);
//         return orders;
//       })
//       .catch(err => {
//         console.error('Error fetching orders:', err);
//       });
//   }

//   static findById(userId) {
//     const db = getDb();

//     return db.collection('users')
//       .findOne({ _id: new ObjectId(String(userId)) })
//       .then(user => {
//         console.log('User found:', user);
//         return user;
//       })
//       .catch(err => {
//         console.error('Error finding user:', err);
//       });
//   }
// }

// module.exports = User;
