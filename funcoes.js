
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

const getAllUser = () => {

    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", dados_user: dados.contatos['whats-users']

    }
    return mensagem
}

const getUser = (number) => {
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", dados_user: []

    }
    dados.contatos['whats-users'].forEach((item) => {
        if (item.number === number) {
            mensagem.dados_user.push({
                number: item.number,
                nome: item.account,
                nick: item.nickname,
                imagem: item['profile-image'],
                background: item.background,
                data_criacao: item['created-since'].start,
                data_encerramento: item['created-since'].end
            })
        }

    })
    return mensagem
}

const getUserContato = (number) => {
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", user_contato: []

    }
    dados.contatos['whats-users'].forEach((item) => {
        if (item.number === number) {

            item.contacts.forEach((item) => {
                mensagem.user_contato.push({
                    nome: item.name,
                    imagem: item.image,
                    descricao: item.description,
                    telefone: item.number
                })
            })

        }
    })
    return mensagem
}

const getUserMensagem = (number) => {
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", user_mensagem: []

    }
    dados.contatos['whats-users'].forEach((item) => {
        if (item.number === number) {

            item.contacts.forEach((item) => {
                item.contacts.messages.forEach(
                    mensagem.user_mensagem.push({
                        // item.contacts.messages
                        Mesagens: item
                    })
                )


            })

        }
    })
    return mensagem
}
console.log(getUserMensagem("11987876567"))

// console.log(dados.contatos['whats-users'][0].contacts.name)

console.log(dados.contatos['whats-users'][0].contacts[0].messages)
// console.log(getUserContato("11987876567"))
// console.log(getUser("11987876567"))
// console.log(getAllDados())