class NotimplemetedException extends Error {
    constructor() {
        super('metodo não implementado')
    }
}

class iCrud {
    create(item) {
        throw new NotimplemetedException()
    }

    read(query) {
        throw new NotimplemetedException()
    }

    update(id, item) {
        throw new NotimplemetedException()
    }

    delete(id) {
        throw new NotimplemetedException()
    }

    IsConnected() {
        throw new NotimplemetedException()
    }
}

module.exports = iCrud