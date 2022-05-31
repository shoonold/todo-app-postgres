const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require('./users')(sequelize, Sequelize)
db.todos = require('./todos')(sequelize, Sequelize)
db.tasks = require('./tasks')(sequelize, Sequelize)
module.exports = db
