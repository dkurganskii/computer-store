const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");


exports.userCart = async (req, res) => {
    // console.log(req.body) // {cart: []}
    const { cart } = req.body

    let products = []

    const user = await User.findOne({ email: req.user.email }).exec()

    // check if cart with logged in user id already exists
    let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec()

    if (cartExistByThisUser) {
        cartExistByThisUser.remove()
        console.log('removed old cart')
    }
    for (let i = 0; i < cart.length; i++) {
        let object = {}

        object.product = cart[i]._id
        object.count = cart[i].count
        object.color = cart[i].color
        // get price for creating total
        let { price } = await Product.findById(cart[i]._id).select('price').exec()
        object.price = price

        products.push(object)
    }
    console.log('products', products)

    let cartTotal = 0
    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count
    }
    // console.log('cartTotal', cartTotal)

    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy: user._id
    }).save()
    console.log('new cart--->', newCart)
    res.json({ ok: true })
}

exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec()

    let cart = await Cart.findOne({ orderedBy: user._id })
        .populate('products.product', '_id title price totalAfterDicount').exec()

    const { products, cartTotal, totalAfterDicount } = cart
    res.json({ products, cartTotal, totalAfterDicount })
}