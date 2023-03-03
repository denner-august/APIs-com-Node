const { } = require('mocha')
const assert = require('assert')
const postgres = require('../src/db/strategies/postgres')
const Context = require('../src/db/strategies/base/contextStrategy')
const context = new Context(new postgres())

const MOCK_HEROIS_CADASTRAR = { nome: 'gavião negro', poder: 'flexas' }

describe('postgres strategy', () => {


    it('testando  postgres  connection', async () => {
        const result = await context.IsConnected()
        assert.equal(result, true)
    })

    it("cadastrar herois", async () => {
        const result = await context.create(MOCK_HEROIS_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROIS_CADASTRAR)


    })
})