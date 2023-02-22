const Commander = require('commander')
const Database = require('./database')
const Heroi = require("./heroi")

async function cadastra() {
    const options = Commander.opts()

    Commander.version('v1')
        .option('-n, --nome [value]', "nome do heroi")
        .option('-p, --poder [value]', "poder do heroi")
        .option('-l, --listar ', "lista o heroi")
        .option('-r, --remover [value] ', "remove heroi pelo id")
        .option('-i, --id [value] ', "id do heroi")
        .option('-a, --atualizar [value] ', "atualiza pelo id")

        .option('-c, --cadastrar', "cadastrar um heroi")

    Commander.parse(process.argv);

    const heroi = new Heroi(options)

    try {
        if (options.cadastrar) {
            delete heroi.id

            const resultado = await Database.Cadastrar(heroi)

            if (!resultado) {
                console.error("heroi não cadastrado")
                return
            }

            console.log('heroi cadastrado')
        }

        if (options.listar) {
            const listar = await Database.listar()
            console.log(listar);
            return;
        }

        if (options.remover) {
            const resultado = await Database.remover(heroi.id)
            if (resultado === false) {
                console.error('não foi possivel remover o heroi')
                return;
            }

            console.log("heroi removido com sucesso");
        }

        if (options.atualizar) {
            const id = parseInt(options.atualizar)
            delete heroi.id;

            // remover chaves undefind
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(id, heroiAtualizar)

            if (resultado === false) {
                console.error('heroi NÃO removido');
                return
            }

            console.log('heroi atualizado');

        }

    } catch (error) {
        console.error("ERRO", error)
    }
}

cadastra()



