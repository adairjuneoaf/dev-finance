//Criando constante do Express após instalar o módulo.
const express = require('express')
//Importando scripts de rotas criado para Requisições e Respostas das páginas.
const routes = require('./routes')
//Utilizando o path para navegar entre os arquivos e "pegar" os locais/nomes de arquivos.
const path = require('path')

//Atribuindo o express a uma constante para utilizar as funções.
const server = express()

//Informando ao Express que o nosso "motor de renderização" é o EJS.
server.set('view engine', 'ejs')

//Informando ao server a pasta publica onde vai conter imagens e arquivos CSS.
server.use(express.static("public"))

//Encaminhando ao server o local correto onde se encontra as nossas "páginas".
server.set('views' , path.join(__dirname, 'views'))

//Atribuindo as rotas à constante Server.
server.use(routes)

//Criando uma porta para acessar as páginas.
server.listen(3000, ()=> {
    console.log("Server Iniciado")
})


