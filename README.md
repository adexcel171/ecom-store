MERN E-Commerce Platform
A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project showcases a powerful backend with RESTful APIs, secure authentication, and advanced features like order processing and payment handling. The frontend (screenshots to be added) provides an intuitive interface for shopping, account management, and admin controls.
Features
Order and Payment Management

Create Orders: Users can place orders with items, shipping address, and payment method. Includes price calculation (items, tax, free shipping over $100).
Payment Processing: Update orders to "paid" with payment details (ID, status, payer email), designed for integration with gateways like PayPal or Stripe.
Order Status: Admins can mark orders as delivered with timestamps.
Order Tracking:
View personal order history (users).
View all orders with user details (admins).
Fetch specific order details by ID.


Analytics:
Total order count.
Total sales across all orders.
Daily sales reports for paid orders using MongoDB aggregation.


Security: Authentication required for order creation and updates; admin-only actions for delivery status.

Category Management

Create, update, and delete product categories (admin-only).
List all categories or fetch a specific category by ID.
Prevents duplicate category names.

Product Management

Add, update, and delete products with details like name, description, price, category, quantity, brand, and image (admin-only).
Fetch products with:
Keyword search and pagination (20 per page).
Top-rated (4) and newest (5) product lists.
Recent products (up to 12) with category details.


Add reviews (rating, comment) with duplicate prevention (authenticated users).
Filter products by category and price range.

User Management

Register and login with secure password hashing (bcrypt) and JWT tokens.
Update user profiles (username, email, password).
Admin features: view all users, delete non-admin users, update user details, and toggle admin status.
Logout by clearing JWT cookie.

Security and Middleware

Authentication: JWT tokens for secure access.
Authorization: Admin-only routes for sensitive actions.
Error Handling: Async handler middleware for robust error management.
File Uploads: Formidable for product images.
ID Validation: Ensures valid MongoDB IDs in routes.

Tech Stack

Backend: Node.js, Express.js, MongoDB (Mongoose)
Frontend: React (screenshots to be added)
Security: bcrypt, JSON Web Tokens (JWT)
Middleware: express-formidable, asyncHandler, authMiddleware, checkId
Tools: MongoDB aggregation, RESTful API design

Project Structure
├── controllers/
│   ├── categoryController.js  # Category CRUD
│   ├── orderController.js     # Order and payment management
│   ├── productController.js   # Product CRUD and reviews
│   ├── userController.js      # User auth and profiles
├── middlewares/
│   ├── authMiddleware.js      # Auth and admin checks
│   ├── asyncHandler.js        # Error handling
│   ├── checkId.js             # ID validation
├── models/
│   ├── categoryModel.js       # Category schema
│   ├── orderModel.js          # Order schema
│   ├── productModel.js        # Product schema
│   ├── userModel.js           # User schema
├── routes/
│   ├── categoryRoutes.js      # Category endpoints
│   ├── orderRoutes.js         # Order endpoints
│   ├── productRoutes.js       # Product endpoints
│   ├── userRoutes.js          # User endpoints
├── utils/
│   ├── createToken.js         # JWT token generation
├── package.json               # Dependencies and scripts

Prerequisites

Node.js (v16 or higher)
MongoDB (local or MongoDB Atlas)
npm or yarn

Installation

Clone the repository:
git clone https://github.com/your-username/your-repo.git
cd your-repo


Install dependencies:
npm install


Set up environment variables:Create a .env file in the root directory:
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret


Run the backend:
npm start

The server runs on http://localhost:5000.

Frontend setup (if included):

Navigate to the frontend directory (to be added).
Run npm install and npm start.



API Endpoints
Orders and Payments

POST /api/orders: Create an order (authenticated)
PUT /api/orders/:id/pay: Mark order as paid (authenticated)
PUT /api/orders/:id/deliver: Mark order as delivered (admin)
GET /api/orders/mine: Get user orders (authenticated)
GET /api/orders: Get all orders (authenticated)
GET /api/orders/:id: Get order by ID (authenticated)
GET /api/orders/total-orders: Count total orders
GET /api/orders/total-sales: Total sales
GET /api/orders/total-sales-by-date: Sales by date

Categories

POST /api/categories: Create category (admin)
PUT /api/categories/:categoryId: Update category (admin)
DELETE /api/categories/:categoryId: Delete category (admin)
GET /api/categories/categories: List categories
GET /api/categories/:id: Get category by ID

Products

POST /api/products: Add product (admin)
PUT /api/products/:id: Update product (admin)
DELETE /api/products/:id: Delete product (admin)
GET /api/products: Fetch products (search, pagination)
GET /api/products/allproducts: Recent products
GET /api/products/top: Top-rated products
GET /api/products/new: Newest products
GET /api/products/:id: Get product by ID
POST /api/products/:id/reviews: Add review (authenticated)
POST /api/products/filtered-products: Filter products

Users

POST /api/users: Register user
POST /api/users/auth: Login
POST /api/users/logout: Logout
GET /api/users: Get all users (admin)
GET /api/users/profile: Get profile (authenticated)
PUT /api/users/profile: Update profile (authenticated)
DELETE /api/users/:id: Delete user (admin)
GET /api/users/:id: Get user by ID (admin)
PUT /api/users/:id: Update user (admin)

Usage

Register/Login: Create an account or log in to access features.
Shop: Browse products, filter by category/price, or search by keyword.
Place Orders: Add items to the cart, provide shipping and payment details, and create an order.
Manage Payments: Mark orders as paid with payment gateway details.
Admin Dashboard: Manage products, categories, orders, and users (admin-only).

Screenshots
(To be added once front-end images are provided)
Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

License
MIT License
Contact

GitHub: your-username
Email: your-email@example.com


