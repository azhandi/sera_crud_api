interface DatabaseConfig {
    username: string
    password: string
    database: string
    host: string
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'
  }
  
  interface Config {
    development: DatabaseConfig
    production: DatabaseConfig
  }
  
  const config: Config = {
    development: {
      username: 'root',
      password: '',
      database: 'sera_test',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: '',
      password: '',
      database: '',
      host: '',
      dialect: 'mysql',
    },
  }
  
  export default config
  