const ContextStrategy = require('./db/strategies/base/contextStrategy')
const mongoDB = require('./db/strategies/mongodb')
const Postgres = require('./db/strategies/postgres')

const contextMongo = new ContextStrategy(new mongoDB())
contextMongo.create()

const conxtPostgres = new ContextStrategy(new Postgres())
conxtPostgres.create()