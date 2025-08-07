# About The Project

A full-featured e-commerce web application built with Node.js, Express, MongoDB, and EJS templating. This application provides a complete shopping experience with user authentication, product management, shopping cart functionality, and order processing.

## Features

### User Features
- **User Authentication**: Secure registration, login, and logout
- **Password Reset**: Email-based password reset functionality
- **Product Browsing**: View all products with detailed product pages
- **Shopping Cart**: Add, view, and remove items from cart
- **Order Management**: Place orders and view order history

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Image Upload**: Upload product images to AWS S3
- **Admin Dashboard**: Manage products with admin-specific views

### Security Features
- **CSRF Protection**: Protection against cross-site request forgery
- **Input Validation**: Server-side validation for all forms
- **Password Hashing**: Secure password storage using bcrypt
- **Session Management**: Secure session handling with MongoDB store
- **Helmet Security**: Additional security headers

## Built With

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Templating**: EJS
- **Authentication**: express-session, bcryptjs
- **File Upload**: Multer with AWS S3 integration
- **Email Service**: SendGrid
- **Security**: Helmet, CSURF, express-validator
- **Styling**: Custom CSS
- **Deployment**: Docker, Heroku-ready

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- AWS S3 bucket for image storage
- SendGrid account for email services

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd MiniCommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key
   MONGO_USER=your_mongodb_username
   MONGO_PASS=your_mongodb_password
   MONGO_DEFAULT_DB=your_database_name
   AWS_S3_BUCKET=your_s3_bucket_name
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   REST_URL=http://localhost:3000
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
MiniCommerce/
├── controllers/         # Route controllers
│   ├── admin.js         # Admin functionality
│   ├── auth.js          # Authentication
│   ├── error.js         # Error handling
│   └── shop.js          # Shop functionality
├── middleware/          # Custom middleware
│   ├── is-auth.js       # Authentication middleware
│   └── validation.js    # Input validation rules
├── models/              # Database models
│   ├── order.js         # Order model
│   ├── product.js       # Product model
│   └── user.js          # User model
├── public/              # Static assets
│   ├── css/             # Stylesheets
│   └── js/              # Client-side JavaScript
├── routes/              # Route definitions
│   ├── admin.js         # Admin routes
│   ├── auth.js          # Authentication routes
│   └── shop.js          # Shop routes
├── views/               # EJS templates
│   ├── admin/           # Admin views
│   ├── auth/            # Authentication views
│   ├── includes/        # Partial templates
│   └── shop/            # Shop views
├── util/                # Utility functions
├── app.js               # Main application file
├── Dockerfile           # Docker configuration
└── package.json         # Dependencies and scripts
```

## API Routes

### Shop Routes
- `GET /` - Home page with products
- `GET /products` - All products page
- `GET /products/:productId` - Product detail page
- `GET /cart` - Shopping cart (authenticated users)
- `POST /cart` - Add item to cart
- `POST /cart-delete-item` - Remove item from cart
- `POST /create-order` - Place order
- `GET /orders` - Order history

### Authentication Routes
- `GET /login` - Login page
- `POST /login` - Process login
- `GET /signup` - Registration page
- `POST /signup` - Process registration
- `POST /logout` - Logout user
- `GET /reset` - Password reset page
- `POST /reset` - Send reset email
- `GET /reset/:token` - Reset password form
- `POST /new-password` - Update password

### Admin Routes (Authenticated)
- `GET /admin/add-product` - Add product form
- `POST /admin/add-product` - Create new product
- `GET /admin/products` - Admin product list
- `GET /admin/edit-product/:productId` - Edit product form
- `POST /admin/edit-product` - Update product
- `POST /admin/delete-product` - Delete product

## Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t minicommerce .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 --env-file .env minicommerce
   ```

## Database Schema

### User Model
- `name`: String (optional)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `resetToken`: String (optional)
- `resetTokenExpiration`: Date (optional)
- `cart`: Object with items array

### Product Model
- `title`: String (required)
- `price`: Number (required)
- `imageUrl`: String (required)
- `description`: String (required)
- `userId`: ObjectId (required, ref: User)

### Order Model
- `user`: Object with userId, name, email
- `items`: Array of products with quantity

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Security Considerations

- All passwords are hashed using bcrypt
- CSRF protection on all forms
- Input validation and sanitization
- Secure session management
- Content Security Policy headers
- File upload restrictions (images only)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SENDGRID_API_KEY` | SendGrid API key for emails | Yes |
| `MONGO_USER` | MongoDB username | Yes |
| `MONGO_PASS` | MongoDB password | Yes |
| `MONGO_DEFAULT_DB` | MongoDB database name | Yes |
| `AWS_S3_BUCKET` | AWS S3 bucket name | Yes |
| `AWS_ACCESS_KEY_ID` | AWS access key | Yes |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | Yes |
| `AWS_REGION` | AWS region | Yes |
| `REST_URL` | Base URL for the application | Yes |
| `PORT` | Server port (default: 3000) | No |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
