const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  resetToken: {
    type: String,
    required: false
  },
  resetTokenExpiration: {
    type: Date,
    required: false
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

userSchema.methods.addToCart = async function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    let updateCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updateCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updateCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }

    const updatedCart = {
        items: updateCartItems
    };
    this.cart = updatedCart;

    try {
        await this.save();
    }
    catch (err) {
        console.error('Error updating cart:', err);
    }
}

userSchema.methods.deleteItemFromCart = async function (productId) {
    const updatedCartItem = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });

    this.cart.items = updatedCartItem;
    try {
        await this.save();
    }
    catch (err) {
        console.error('Error deleting item from cart:', err);
    }
}

userSchema.methods.clearCart = async function () {
    this.cart = { items: [] };
    try {
        await this.save();
    } catch (err) {
        console.error('Error clearing cart:', err);
    }
}

module.exports = mongoose.model('User', userSchema);
