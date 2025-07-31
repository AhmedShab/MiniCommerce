const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('6889d18531260941c8baade1')
//     .then(user => {
//       if (user) {
//         req.user = new User(user._id, user.name, user.email, user.cart);
//       }
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

async function startServer() {
  try {
    await mongoose.connect('mongodb+srv://ahmed:xr7bfKQ2Qmbf5KS0@cluster0.zzmzliw.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

startServer();