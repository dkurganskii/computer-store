# Computer Store eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

## Features

- React Client (Frontend)
- Firebase Authentication and Redux
- Node MongoDB API (Backend)
- Firebase Auth Check (Server side)
- User Admin and Protected Routes
- Creating Products with Categories and Subcategories
- Multiple Image Uploads with Client Side Resize
- Update and Delete Products
- Displaying Products Pagination and Carousel
- Star Rating System
- Products based on Categories and Subcategories
- Advance Searching and Filtering (9 Different Ways)
- Add to Cart
- Checkout
- Coupon
- Payment with Stripe
- Orders
- User Dashboard (Purchase History)
- PDF/Invoice Download
- Admin Dashboard (Order Management)
- Wishlist
- Cash On Delivery (Cashless order)
- Deployment to Digital Ocean Cloud


## Usage

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 8000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:8000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

```

