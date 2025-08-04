const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const MONGODB_URI = 'mongodb+srv://ahmed:xr7bfKQ2Qmbf5KS0@cluster0.zzmzliw.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0'

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();
const flash = require('connect-flash');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use(async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  const user = await User.findById(req.session.user._id);
  if (user) {
    req.user = user;
    next();
  } else {
    next();
  }

});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

startServer();