const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    pricequote: { type: Number, default: 1 }
});

module.exports = mongoose.model('Wishlist', wishlistSchema)