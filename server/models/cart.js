const mongoose = require('mongoose')
const { OnjectId } = mongoose.Schema

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: ObjectId,
                ref: 'Product'
            },
            count: Number,
            color: String,
            price: Number
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: ObjectId, ref: 'User' }
},
    { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)