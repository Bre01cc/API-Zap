const dados = require('./modulo/funcoes.js')
const express = require('express')//Responsável pela API
// const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front


const app = express()

const PORT = process.PORT || 8080

//Retorna todos os dados do JSON
app.get('/v1/whatszap', function (request, response) {

    let whatszap = dados.getAllUsers()

    response.status(whatszap.status_code)

    response.json(whatszap)

})

//Retorna as informações de um usuário
app.get('/v1/whatszap/:user', function (request, response) {

    let user = request.params.user

    let whatszap = dados.getUserByIdentifier(user)

    response.status(whatszap.status_code)

    response.json(whatszap)

})

//Retorna os contatos de um usuário
app.get('/v1/whatszap/contatos/:telefone', function (request, response) {

    let telefone = request.params.telefone

    let whatszap = dados.getUserContacts(telefone)

    response.status(whatszap.status_code)

    response.json(whatszap)

})

//Retorna todas as mensagens de um usuário
app.get('/v1/whatszap/contatos/mensagem/:telefone', function (request, response) {

    let telefone = request.params.telefone

    let whatszap = dados.getUserMessages(telefone)

    response.status(whatszap.status_code)

    response.json(whatszap)

})

//Retorna as mensagens de um usuário com um determinado contato
app.get('/v1/whatszap/contato/mensagens', function (request, response) {

    let telefone = request.query.telefone

    let contato = request.query.contato

    let whatszap = dados.getContactMessages(telefone, contato)

    response.status(whatszap.status_code)

    response.json(whatszap)

})

//Retorna uma mensagem especifica de um usuário com um contato
app.get('/v1/whatszap/contato/palavra-chave', function (request, response) {

    let telefone = request.query.telefone

    let contato = request.query.contato

    let palavra = request.query.palavra

    let whatszap = dados.getMessagesByKeyword(telefone, contato, palavra)

    response.status(whatszap.status_code)

    response.json(whatszap)

})



//Start na API
app.listen(PORT, function () {
    console.log('API aguardando requisições.....')
})
