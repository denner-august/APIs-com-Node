const iCrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends iCrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
        this._connect()
        this.defineModel()
    }

    async IsConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.error(error)
            return false

        }
    }

    async defineModel() {
        this._herois = this._driver.define('herois',
            {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: {
                    type: Sequelize.STRING,
                    required: true
                },
                poder: {
                    type: Sequelize.STRING,
                    required: true
                }
            },
            {
                tableName: "TB_HEROIS",
                freezeTableNames: false,
                timestamps: false
            }
        )
        await this._herois.sync()
    }

    _connect() {
        this._driver = new Sequelize(
            'heroes', 'denner', 'denner12',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false
            }
        )
    }

    async create(item) {


        const { dataValues } = await this._herois.create(item)
        return dataValues
    }
}
module.exports = Postgres