
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

//Retorna todos os usuários
const getAllUser = () => {

    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", dados_user: dados.contatos['whats-users']

    }
    return mensagem
}

//Retorna as informações de um usuário com base no seu número
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

//Retorna os contados de um usuário com base no seu número
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
//Retorna todas as mensagens de um usuário com seus respectivos contatos, tudo isso com base no seu número
const getUserMensagem = (number) => {
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", user_mensagem: []

    }
    dados.contatos['whats-users'].forEach((item1) => {
        if (item1.number === number) {

            item1.contacts.forEach((item2) => {

                item2.messages.forEach((item3) => {
                    mensagem.user_mensagem.push({
                        remetente: item3.sender,
                        mensagem: item3.content,
                        horario: item3.time

                    })
                })

            })

        }
    })
    return mensagem
}

const getContatoMensagem = (numberUser, numberContato) => {
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", nome_contato: "", telefone_contato: "", user_mensagem: []

    }
    //percorrendo o array de usuários
    dados.contatos['whats-users'].forEach((item1) => {
        //Criando um if para o número do usuário passado com segundo argumento da fução, dessa forma só o verdadeiro irá passar
        if (item1.number === numberUser) {

            //percorrrendo o array de contatos do usuário
            item1.contacts.forEach((item2) => {
                //Criando um if para o número do contato passado com segundo argumento da fução, dessa forma só o verdadeiro irá passar.
                if (item2.number === numberContato) {
                    //percorrendo o array de mensagens do usuário com o contato
                    item2.messages.forEach((item3) => {

                        mensagem.nome_contato = item2.name
                        mensagem.telefone_contato = item2.number
                        mensagem.user_mensagem.push({
                            remetente: item3.sender,
                            mensagem: item3.content,
                            horario: item3.time

                        })


                    })
                }


            })

        }
    })
    return mensagem

}

const getMensagemKey = (numberUser, numberContato, mensagemKey) => {
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", nome_contato: "", telefone_contato: "", user_mensagem: []

    }
    //percorrendo o array de usuários
    dados.contatos['whats-users'].forEach((usuario) => {
        //Criando um if para o número do usuário passado como primeiro argumento da função
        if (usuario.number === numberUser) {

            //percorrrendo o array de contatos do usuário
            usuario.contacts.forEach((contato) => {
                //Criando um if para o número do contato passado com segundo argumento da fução
                if (contato.number === numberContato) {

                    //Criando uma variável que vai guardar o resutado do filter com base na mensagemKey(palavra chave) enviada como terceiro argumento da função
                    //Filter retorna um array  de elementos que cumpriram uma condição, nesse caso são mensagens que inclui uma palavra especifica
                    let busca = contato.messages.filter(mensagem => mensagem.content.includes(mensagemKey))

                    //percorrendo o array criado pelo filter e adicionando
                    busca.forEach((mensagemContato) => {

                        mensagem.user_mensagem.push({
                            mensagem_chave_busca: mensagemContato.content
                        })

                    })
                    console.log(mensagem)
                }


            })

        }
    })
    // return mensagem


}

getMensagemKey('11987876567', '26999999963', 'h')
// console.log(getMensagemKey('11987876567','26999999963','?'))

// console.log(dados.contatos['whats-users'][0].contacts[0].messages.find(mesagem => mesagem.content.includes('ooo')))


//  if(mensagem.content==busca.content)
//                         console.log(mensagem.content)














// console.log(dados.contatos['whats-users'][0].contacts.name)

// console.log(dados.contatos['whats-users'][0].contacts[0].messages)
// console.log(getUserContato("11987876567"))
// console.log(getUser("11987876567"))
// console.log(getAllDados())