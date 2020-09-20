const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/sketches-backend')
  .then(() => console.log('connected to mongoDB...'))
  .catch(err => console.error('failed connect to mongoDB...', err))

const home = require('./src/routes/home')
const sketches = require('./src/routes/sketches')

const app = express()

app.use(express.json())
app.use('/api', home)
app.use('/api/sketches', sketches)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listen on ${port} ...`))
