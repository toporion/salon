const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
    }],
    totalPrice: { type: Number, required: true, default: 0 },

}, { timestamps: true });

const CartModel = mongoose.model('Cart', CartSchema);
module.exports = CartModel;