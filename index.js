require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user')
const restaurantRoutes = require('./routes/restaurant')
const reviewRoutes = require('./routes/review')
const commentRoutes = require('./routes/comment')
const authRoutes = require('./routes/auth')
const favoriteRoutes = require('./routes/favorite')
const likeDislikeRoutes = require('./routes/likeDislike')

// express app
const app = express()

// middleware
app.use(cors({
  origin: 'https://ratemyfood.onrender.com',
  credentials: true
}));
app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://ratemyfood.onrender.com');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// routes
app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/favorite', favoriteRoutes)
app.use('/api/like', likeDislikeRoutes)

// connect to db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('connected to database and listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 