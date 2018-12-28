const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const post = require('./routes/api/post')

const app = express()

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors('*'))

// DB config
const db = require('./config/keys').mongoURI

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err))

// Passport middlewarea
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

//Use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/post', post)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
