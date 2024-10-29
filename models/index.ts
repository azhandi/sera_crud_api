import { Sequelize } from 'sequelize'
import config from '../config/config'
import { EmployeeFactory, EmployeeCreationAttributes } from './employee'

const env = process.env.NODE_ENV as keyof typeof config || 'development'
const dbConfig = config[env]

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect as 'mysql',
})

const Employee = EmployeeFactory(sequelize)

export {
  sequelize,
  Employee,
  EmployeeCreationAttributes,
}
