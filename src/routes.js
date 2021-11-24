//Criando novamente uma constante express para utilizar as funcionalidades nas rotas.
const express = require('express')

//Criando uma constante de rotas para atribuir as rotas das páginas.
const routes = express.Router()

//Rotas criadas para acessar as páginas ou efetuar requisições(insert, update, delete, view)
routes.get('/', (req, res) => res.render("index"))
//routes.get('/financas', (req, res) => res.render("financas"))





//Exportando as rotas para instanciar no script de RUN do server.
module.exports = routes