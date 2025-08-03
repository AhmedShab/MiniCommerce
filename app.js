const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('688b85f75adbf85444f0bffe');
    if (user) {
      req.user = user;
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

async function startServer() {
  try {
    await mongoose.connect('mongodb+srv://ahmed:xr7bfKQ2Qmbf5KS0@cluster0.zzmzliw.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0');

    // only create a new user if it doesn't exist
    const existingUser = await User.findOne();
    if (!existingUser) {
      // create a new user
      const user = new User({
        name: 'Ahmed',
        email: 'ahmed@example.com',
        cart: { items: [] }
      });
      user.save();
    }
    // else, use the existing user
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

startServer();