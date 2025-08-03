const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    items: [
        {
            productData: {
                type: Object,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
});

orderSchema.statics.getOrders = async function (userId) {
    try {
        const orders = await this.find({ 'user.userId': userId });
        return orders;
    } catch (err) {
        console.error('Error fetching orders:', err);
        throw err;
    }
}

module.exports = mongoose.model('Order', orderSchema);