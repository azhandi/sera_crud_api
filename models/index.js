const { Sequelize } = require('sequelize')
const config = require('../config/config.json')

const env = process.env.NODE_ENV || 'development'
const { database, username, password, host, dialect } = config[env]

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
})


const Employee = require('./employee')(sequelize)

module.exports = {
  sequelize,
  Employee,
}
