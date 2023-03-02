const assert = require('assert')
const postgres = require('../src/db/strategies/postgres')
const Context = require('../src/db/strategies/base/contextStrategy')
const context = new Context(new postgres())

describe('postgres strategy', () => {
    it('testando  postgres  connection', async () => {
        const result = await context.IsConnected()
        assert.equal(result, true)
    })
})