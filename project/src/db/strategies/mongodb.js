const iCrud = require('./interfaces/interfaceCrud')

class Mongodb extends iCrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('item salvo no mongodb');
    }
}

module.exports = Mongodb