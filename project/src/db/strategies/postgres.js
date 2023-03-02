const iCrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends iCrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
        this._connect()
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
        this._herois = driver.define('herois',
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

    create(item) {
        console.log('o item foi salvo em postgres')
    }
}
module.exports = Postgres