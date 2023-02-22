const { deepEqual } = require('assert')

const DEFAULT_ITEM_CADASTRAR = { "nome": "flash", "poder": "Speed", "id": 1 }
const DEFAULT_ITEM_ATUALIZAR = {
    nome: "lanterna verde",
    poder: "energia do anel",
    id: 2
}

const database = require('./database')


describe("suite de manipulação de herois", () => {
    before(async () => {
        await database.Cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.Cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('deve pesquisar um heroi utilizando arquivos', async () => {
        const esperado = DEFAULT_ITEM_CADASTRAR

        const [result] = await database.listar(esperado.id)
        deepEqual(esperado, result);

    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR

        await database.Cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expected)
    })

    it('deve remover um heoi por id', async () => {
        const expected = true
        const result = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(result, expected)
    })

    it('atualizar heroi por id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'batman',
            poder: "dinheiro"
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, expected)
        const [result] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

        deepEqual(expected, result)
    })
})

