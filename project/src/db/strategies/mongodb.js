const iCrud = require('./interfaces/interfaceCrud')
const mongoose = require('mongoose');


class Mongodb extends iCrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
        defineModel()
    }

    defineModel() {
        this._herois = new mongoose.Schema({
            nome: { type: String, required: true },
            poder: { type: String, required: true },
            insertedAt: { type: Date, default: new Date() }
        })

        const model = mongoose.model('herois', heroiSchema)
    }

    connected() {
        mongoose.connect('mongodb://denner:denner12@localhost:27017/herois', { useNewUrlParser: true })
            .then(() => console.log('Conexão estabelecida com sucesso!'))
            .catch((erro) => console.log('Falha na conexão:', erro));

        const connection = mongoose.connection;
        connection.once('open', () => console.log('data base rodando'))


    }

    IsConnected() {

    }

    async create(item) {
        const resultCadastrar = await model.create({
            nome: 'batman', poder: "inteligencia"
        })

        console.log('result', resultCadastrar);
    }
}

module.exports = Mongodb