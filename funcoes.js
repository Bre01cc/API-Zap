
const MENSAGEM_ERRO = [

    {
        status: false,
        status_code: 500,
        development: "Breno Oliveira Assis Reis"
    },
    {
        status: false,
        status_code: 404,
        development: "Breno Oliveira Assis Reis"
    },
    {
        status: false,
        status_code: 400,
        development: "Breno Oliveira Assis Reis"
    }

]

const { get } = require('http')
const dados = require('./contatos.js')

const getAllDados = () => {
   
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", Uf:dados.contatos['whats-users']
        
    }
    return mensagem
}

const getAllUsers = () => {

}

console.log(dados.contatos['whats-users'])