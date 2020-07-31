'use strict'

import { basename as _basename, join } from 'path'
import _config from '../config/config'
import { Sequelize, DataTypes } from 'sequelize'
import { readdirSync } from 'fs'
import { runLoopOnce } from 'deasync'

const basename = _basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = _config[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

readdirSync(__dirname).filter(file => {
  return (file.indexOf('.' !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
}).forEach(file => {
  let modelModule

  import(join(__dirname, file)).then(_module => {
    modelModule = _module
  }).catch(reason => {
    console.error(`Error: ${reason}`)
    process.exit(1)
  })

  while (modelModule === undefined) {
    runLoopOnce()
  }

  const model = modelModule.default(sequelize, DataTypes)
  db[model.name] = model
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
