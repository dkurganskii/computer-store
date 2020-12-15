const express = require('express');
const router = express.Router();

// middlewares
const { authCheck } = require('../middlewares/auth')

// controller 
const { userCart } = require('../controllers/user')

// save cart
router.post('/cart', authCheck, userCart)

// router.get('/user', (req, res) => {
//     res.json({
//         data: 'You hit user API endpoint'
//     })
// })

module.exports = router;
