const mysql = require('mysql2/promise')
const config = require('./config/config.json')

const env = process.env.NODE_ENV || 'development'

const { username, password, database, host } = config[env]

const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: host,
      user: username,
      password: password,
    })

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``)
    console.log(`Database '${database}' has been created or already exists.`)
    await connection.end()
  } catch (error) {
    console.error('Error creating the database:', error)
  }
}

createDatabase()
