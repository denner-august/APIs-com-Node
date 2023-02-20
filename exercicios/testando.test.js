const { ok, deepEqual } = require('assert')

const DEFAULT_ITEM_CADASTRAR = { "nome": "flash", "poder": "Speed", "id": 1 }

const base = require('./database')
const database = require('./database')


describe("suite de manipulação de herois", () => {
    before(async () => {
        await database.Cadastrar(DEFAULT_ITEM_CADASTRAR)
    })

    it('deve pesquisar um heroi utilizando arquivos', async () => {
        const esperado = DEFAULT_ITEM_CADASTRAR

        const [result] = await base.listar(esperado.id)
        deepEqual(esperado, result);

    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR

        await base.Cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await base.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expected)
    })

    it('deve remover um heoi por id', async () => {
        const expected = true
        const result = await base.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(result, expected)
    })
})

