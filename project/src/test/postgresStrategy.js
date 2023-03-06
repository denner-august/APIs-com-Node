const { } = require('mocha')
const assert = require('assert')
const postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')
const context = new Context(new postgres())

const MOCK_HEROIS_CADASTRAR = { nome: 'gavião negro', poder: 'flexas' }
const MOCK_HEROIS_ATUALIZAR = { nome: 'batman', poder: 'tecnologia' }


describe('postgres strategy', () => {
    before(async () => {
        await context.delete()
        await context.create(MOCK_HEROIS_ATUALIZAR)
    })

    it('testando  postgres  connection', async () => {
        const result = await context.IsConnected()
        assert.equal(result, true)
    })

    it("cadastrar herois", async () => {
        const result = await context.create(MOCK_HEROIS_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROIS_CADASTRAR)
    })

    it('listar', async () => {
        const [result] = await context.read({ nome: MOCK_HEROIS_CADASTRAR.nome })
        delete result.id
        assert.deepEqual(result, MOCK_HEROIS_CADASTRAR)
    })

    it("atualizar", async () => {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROIS_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HEROIS_ATUALIZAR,
            nome: 'superman',
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    })

    it('remover por id', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})