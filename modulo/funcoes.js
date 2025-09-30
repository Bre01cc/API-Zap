/****************************************************************************************************************************
 * Objetivo: Arquivo de funções para gerenciar a API do WhatsZap.
 * Data: 24/09/2025
 * Atutor:Breno
 * Versão:1.0
 ****************************************************************************************************************************
 */

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
const getAllUsers = () => {

    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", dados_user: dados.contatos['whats-users']

    }
    return mensagem
}

//Retorna as informações de um usuário com base no seu número
const getUserByIdentifier = (dadosDoUsuarios) => {
    if (!dadosDoUsuarios)
        return MENSAGEM_ERRO[2]
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", dados_user: []

    }
    dados.contatos['whats-users'].forEach((usuario) => {
        //Comparando os telefones dos usuários com o recebido no paramentro da função
        if (usuario.number === dadosDoUsuarios) {

            mensagem.dados_user.push({
                number: usuario.number,
                nome: usuario.account,
                nick: usuario.nickname,
                imagem: usuario['profile-image'],
                background: usuario.background,
                data_criacao: usuario['created-since'].start,
                data_encerramento: usuario['created-since'].end
            })
        }



    })
    // Checa se `user_contato` possui dados; ficará vazio se os argumentos não forem encontrados ou forem inválidos.
    if (mensagem.dados_user.length === 0)
        return MENSAGEM_ERRO[1]
    else
        return mensagem

}


//Retorna os contados de um usuário com base no seu número
const getUserContacts = (dadosDoUsuario) => {
    //caso nada seja enviado no parametro da função
    if (!dadosDoUsuario)
        return MENSAGEM_ERRO[2]

    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", user_contato: []

    }
    dados.contatos['whats-users'].forEach((usuario) => {
        //Comparando os telefones dos usuários com o recebido no paramentro da função
        if (usuario.number === dadosDoUsuario) {

            //Percorrendo o array de contatos e trazendo suas informações
            usuario.contacts.forEach((contatos) => {
                mensagem.user_contato.push({
                    nome: contatos.name,
                    imagem: contatos.image,
                    descricao: contatos.description,
                    telefone: contatos.number
                })
            })

        }

    })
    // Checa se `user_contato` possui dados; ficará vazio se os argumentos não forem encontrados ou forem inválidos.
    if (mensagem.user_contato.length === 0)
        return MENSAGEM_ERRO[1]
    else
        return mensagem
}


//Retorna todas as mensagens de um usuário com seus respectivos contatos, tudo isso com base no seu número
const getUserMessages = (dadosDoUsuario) => {

    if (!dadosDoUsuario)
        return MENSAGEM_ERRO[2]

    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", user_mensagem: []

    }
    dados.contatos['whats-users'].forEach((usuario) => {
        //
        if (usuario.number === dadosDoUsuario) {

            usuario.contacts.forEach((contatos) => {

                contatos.messages.forEach((mensagens) => {
                    mensagem.user_mensagem.push({
                        remetente: mensagens.sender,
                        mensagem: mensagens.content,
                        horario: mensagens.time

                    })
                })

            })

        }

    })
    // Checa se `user_contato` possui dados; ficará vazio se os argumentos não forem encontrados ou forem inválidos.
    if (mensagem.user_mensagem.length === 0)
        return MENSAGEM_ERRO[1]
    else
        return mensagem

}

//Lista as mensagens do usuário com um dos seus contatos
const getContactMessages = (dadosDoUsuario, dadosDoContato) => {
    if (!dadosDoContato || dadosDoContato)
        return MENSAGEM_ERRO[2]
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", nome_contato: "", telefone_contato: "", user_mensagem: []

    }
    //percorrendo o array de usuários
    dados.contatos['whats-users'].forEach((usuario) => {
        //Criando um if para o número do usuário passado com segundo argumento da fução, dessa forma só o verdadeiro irá passar
        if (usuario.number === dadosDoUsuario) {

            //percorrrendo o array de contatos do usuário
            usuario.contacts.forEach((contato) => {
                //Criando um if para o número do contato passado com segundo argumento da fução, dessa forma só o verdadeiro irá passar.
                if (contato.number === dadosDoContato) {
                    //percorrendo o array de mensagens do usuário com o contato
                    contato.messages.forEach((mensagensTrocadas) => {

                        mensagem.nome_contato = contato.name
                        mensagem.telefone_contato = contato.number
                        mensagem.user_mensagem.push({
                            remetente: mensagensTrocadas.sender,
                            mensagem: mensagensTrocadas.content,
                            horario: mensagensTrocadas.time

                        })


                    })
                }


            })

        }
    })
    // Checa se `user_contato` possui dados; ficará vazio se os argumentos não forem encontrados ou forem inválidos.
    if (mensagem.user_mensagem.length === 0)
        return MENSAGEM_ERRO[1]
    else
        return mensagem


}

//Lista as mensagem com base na palavra ou letra chave
const getMessagesByKeyword = (dadosDoUsuario, dadosDocontato, mensagemChave) => {
    if (!dadosDoUsuario || !dadosDocontato || !mensagemChave)
        return MENSAGEM_ERRO[2]
    let mensagem = {
        status: true, status_code: 200, development: "Breno Oliveira Assis Reis", nome_contato: "", telefone_contato: "", user_mensagem: []

    }
    //percorrendo o array de usuários
    dados.contatos['whats-users'].forEach((usuario) => {

        //Criando um if para o número do usuário passado como primeiro argumento da função
        if (usuario.number === dadosDoUsuario) {

            //percorrrendo o array de contatos do usuário
            usuario.contacts.forEach((contato) => {
                //Criando um if para o número do contato passado com segundo argumento da fução
                if (contato.number === dadosDocontato) {

                    //Criando uma variável que vai guardar o resutado do filter com base na mensagemKey(palavra chave) enviada como terceiro argumento da função
                    //Filter retorna um array  de elementos que cumpriram uma condição, nesse caso são mensagens que inclui uma palavra especifica
                    let busca = contato.messages.filter(mensagem => mensagem.content.includes(mensagemChave))

                    //percorrendo o array guardado na variavel busca já que ele pode devolver mais de uma mensagem pelo filter
                    busca.forEach((mensagemContato) => {

                        //criando atributos e adicionando os valores
                        mensagem.nome_contato = contato.name
                        mensagem.telefone_contato = contato.number
                        mensagem.user_mensagem.push({
                            remetente: mensagemContato.sender,
                            mensagem_chave_busca: mensagemContato.content,
                            horario: mensagemContato.time
                        })

                    })
                }


            })

        }
    })
    if (mensagem.user_mensagem.length === 0)
        return MENSAGEM_ERRO[1]
    else
        return mensagem


}


module.exports = {
    getAllUsers,
    getUserByIdentifier,
    getContactMessages,
    getUserContacts,
    getUserMessages,
    getMessagesByKeyword
}

