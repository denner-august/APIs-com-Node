const mongoose = require('mongoose');

mongoose.connect('mongodb://denner:denner12@localhost:27017/herois', { useNewUrlParser: true })
    .then(() => console.log('Conexão estabelecida com sucesso!'))
    .catch((erro) => console.log('Falha na conexão:', erro));

const connection = mongoose.connection;

connection.once('open', () => console.log('data base rodando'))

const heroiSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    poder: { type: String, required: true },
    insertedAt: { type: Date, default: new Date() }
})

const model = mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'batman', poder: "inteligencia"
    })

    console.log('result', resultCadastrar);

    const listItem = await model.find()
    console.log(listItem);
}

main()


// setTimeout(() => {
//     const state = connection.readyState
//     console.log(state);
// }, 1000);

/*
0 deesconectado
1 conectado
2 conectando
3 desconenctando

*/