const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Product', productSchema);

// class Product {
//   constructor(title, price, imageUrl, description, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();

//     return db.collection('products')
//       .insertOne(this)
//       .then(result => {
//         console.log('Product saved:', result);
//       })
//       .catch(err => {
//         console.error('Error saving product:', err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();

//     return db.collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log('Products fetched:', products);
//         return products;
//       })
//       .catch(err => {
//         console.error('Error fetching products:', err);
//       });
//   }

//   static findById(id) {
//     const db = getDb();

//     return db.collection('products')
//       .find({ _id: new ObjectId(String(id)) })
//       .next()
//       .then(product => {
//         console.log('Product found:', product);
//         return product;
//       })
//       .catch(err => {
//         console.error('Error finding product:', err);
//       });
//   }

//   static updateById(id, updatedData) {
//     const db = getDb();

//     return db.collection('products')
//       .updateOne({ _id: new ObjectId(String(id)) }, { $set: updatedData })
//       .then(result => {
//         console.log('Product updated:', result);
//       })
//       .catch(err => {
//         console.error('Error updating product:', err);
//       });
//   }

//   static deleteById(id) {
//     const db = getDb();

//     return db.collection('products')
//       .deleteOne({ _id: new ObjectId(String(id)) })
//       .then(result => {
//         console.log('Product deleted:', result);
//       })
//       .catch(err => {
//         console.error('Error deleting product:', err);
//       });
//   }
// }

// module.exports = Product;
