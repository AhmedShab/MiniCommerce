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

    db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log('Product saved:', result);
      })
      .catch(err => {
        console.error('Error saving product:', err);
      });
  }

  static fetchAll() {
    // Logic to fetch all products from the database
  }

  static findById(id) {
    // Logic to find a product by its ID
  }
}

module.exports = Product;
