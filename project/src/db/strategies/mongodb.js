const iCrud = require('./interfaces/interfaceCrud')
const mongoose = require('mongoose');

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: "Disconectando"
}


class Mongodb extends iCrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
        // defineModel()
    }

    defineModel() {
        this._herois = new mongoose.Schema({
            nome: { type: String, required: true },
            poder: { type: String, required: true },
            insertedAt: { type: Date, default: new Date() }
        })

        mongoose.model('herois', heroiSchema)
    }

    connected() {
        mongoose.connect('mongodb://denner:denner12@localhost:27017/herois', { useNewUrlParser: true })
            .then(() => console.log('Conexão estabelecida com sucesso!'))
            .catch((erro) => console.log('Falha na conexão:', erro));

        const connection = mongoose.connection;
        connection.once('open', () => console.log('data base rodando'))


    }

    async IsConnected() {
        const state = STATUS[connection.readyState]
        if (state === 'Conectado') {
            return state
        }

        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[connection.readyState]
    }

    async create(item) {
        const resultCadastrar = await model.create({
            nome: 'batman', poder: "inteligencia"
        })

        console.log('result', resultCadastrar);
    }
}

module.exports = Mongodb