const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const db = getDb();

    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log('Product saved:', result);
      })
      .catch(err => {
        console.error('Error saving product:', err);
      });
  }

  static fetchAll() {
    const db = getDb();

    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log('Products fetched:', products);
        return products;
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }

  static findById(id) {
    const db = getDb();

    return db.collection('products')
      .find({ _id: new ObjectId(String(id)) })
      .next()
      .then(product => {
        console.log('Product found:', product);
        return product;
      })
      .catch(err => {
        console.error('Error finding product:', err);
      });
  }
}

module.exports = Product;
