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
}


class Mongodb extends iCrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('item salvo no mongodb');
    }
}

class Postgres extends iCrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('o item foi salvo em postgres')
    }
}

class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }

    read(item) {
        return this._database.read(item)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }
}

const contextMongo = new ContextStrategy(new Mongodb())
contextMongo.create()

const conxtPostgres = new ContextStrategy(new Postgres())
conxtPostgres.create()