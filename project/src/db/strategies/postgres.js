const iCrud = require('./interfaces/interfaceCrud')

class Postgres extends iCrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('o item foi salvo em postgres')
    }
}
module.exports = Postgres