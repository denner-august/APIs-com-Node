const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)


class Database {

    constructor() {
        this.NOME_ARQUIVO = './herois.json'
    }

    async obterDadosArquivos() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async Cadastrar(heroi) {
        const dados = await this.obterDadosArquivos()
        const id = heroi.id <= 2 && heroi.id > 0 ? heroi.id : Date.now()
        const heroiComId = {
            id,
            ...heroi
        }
        const dadosFinal = [...dados, heroiComId]
        const resultado = await this.escreverArquivo(dadosFinal)


        return resultado
    }

    async listar(id) {
        const dados = await this.obterDadosArquivos()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }

    async remover(id) {
        if (!id) {
            await this.escreverArquivo([])
            return true

        }

        const dados = await this.obterDadosArquivos()
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if (indice === -1) {
            throw Error("O heroi informado não existe")
        }

        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, dados) {
        const AtualDados = await this.obterDadosArquivos()
        const indice = AtualDados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error("heroi não existe")
        }
        const atual = AtualDados[indice]

        const newObject = {
            ...atual,
            ...dados
        }

        AtualDados.splice(indice, 1)
        return await this.escreverArquivo([...AtualDados, newObject])
    }
}

module.exports = new Database()