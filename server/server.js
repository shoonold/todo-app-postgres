const express = require('express')
const app = express()

// For env file
require('dotenv').config()

// For Cors
const cors = require('cors')
app.use(cors())

const routes = require('./routes/index')

app.use(express.json())

// routes
app.use('/api', routes)

// Sequelize
const db = require('./models')
db.sequelize.sync()

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})
