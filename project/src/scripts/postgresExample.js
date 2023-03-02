const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes', 'denner', 'denner12',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false
    }
)

async function Main() {
    const Herois = driver.define('herois',
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

    await Herois.sync()
    await Herois.create({
        nome: 'batman',
        poder: "tecnologia"
    })
    const result = await Herois.findAll({ raw: true })
    console.log('resultado', result);
}

Main()