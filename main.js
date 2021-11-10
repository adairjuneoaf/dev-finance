/*

const transacao = document.querySelector('.tela-lancamento')
const toggle = document.querySelectorAll('section #lancamento')

for(const active of toggle){
    active.addEventListener('click', ()=>{
        transacao.classList.add('active')
        document.body.style.overflow = "hidden"
    })
}

const cancelar = document.querySelectorAll('div .input-group .cancel')

for(const close of cancelar){
    close.addEventListener('click',()=>{
        transacao.classList.remove('active')
    })
}

*/

const telaTransacao = {
    open(){
        document.querySelector('.tela-lancamento').classList.add('active')
        document.body.style.overflow = "hidden"
    },
    close(){
        document.querySelector('.tela-lancamento').classList.remove('active')
    }
}

const listaTransacoes = [{
    id: 001,
    descricao: 'Desenvolvimento de site',
    valores: 1200000,
    data: '13/03/2020'
},{
    id: 002,
    descricao: 'Hamburguer',
    valores: -5900,
    data: '10/04/2021'
},{
    id: 003,
    descricao: 'Aluguel de apartamento',
    valores: -120000,
    data: '27/03/2020'
},{
    id: 004,
    descricao: 'Computador',
    valores: -540000,
    data: '15/03/2020'
},{
    id: 005,
    descricao: 'App de vendas',
    valores: 700000,
    data: '26/10/2021'
}
]

const transacoes = {
    all: listaTransacoes,
    
    add(listaTransacoes){
        transacoes.all.push(listaTransacoes)

        console.log(transacoes.all)
    },

    entradas(){
        let totalTransacoesEntrada = 0;

        transacoes.all.forEach((listaTransacoes) =>{
            if(listaTransacoes.valores > 0){
                totalTransacoesEntrada += listaTransacoes.valores;
            }
        })

        return totalTransacoesEntrada;
    },

    saidas(){
        let totalTransacoesSaida = 0;

        transacoes.all.forEach((listaTransacoes) =>{
            if(listaTransacoes.valores < 0){
                totalTransacoesSaida += listaTransacoes.valores;
            }
        })

        return totalTransacoesSaida;
    },

    balanco(){
        let totalTransacoes = 0;

        totalTransacoes = transacoes.entradas() + transacoes.saidas();

        return totalTransacoes;
    }
}

const formatacoes = {
    formatarMoeda(valores){
        const sinalPositivoNegativo = Number(valores) < 0 ? "-" : ""

        valores = String(valores).replace(/\D/g,"")

        valores = Number(valores) / 100

        valores = valores.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return sinalPositivoNegativo + valores

    }
}

//CONSTANTE PRINCIPAL RESP. POR TODA MODELAGEM DAS TRANSACOES QUE SERÁ INSERIDAS OU REMOVIDAS PELO USUÁRIO
const modelagemHTML = {
    containerTransacoes: document.querySelector('#data-table tbody'),
    addTransacao(listaTransacoes, index){
        let transacao = document.createElement('tr')
        transacao.innerHTML = modelagemHTML.inserirHtmlTransacao(listaTransacoes)

        modelagemHTML.containerTransacoes.appendChild(transacao)
    },
    inserirHtmlTransacao(listaTransacoes){
        // VAR RESP. POR VERIFICAR O SINAL DO VALOR(POSITIVO OU NEGATIVO) APLICANDO UMA CLASSE AO ESQUELETO
        let classeNegativoPositivo = listaTransacoes.valores > 0 ? "positivo" : "negativo"

        //VAR RESP. POR FORMATAR O VALOR COM AJUDA DE UMA FUNÇÃO EXTERNA
        let valor = formatacoes.formatarMoeda(listaTransacoes.valores)

        //CONSTANTE RESP. PELO ESQUELETO HTML QUE SERA "GRAVADO" NO INDEX.HTML
        const html = `
        <td class="descricao">${listaTransacoes.descricao}</td>
        <td class="valores ${classeNegativoPositivo}">${valor}</td>
        <td class="data">${listaTransacoes.data}</td>
        <td class="remover">
        <button title="Remover Transação" class="btn-remover">
            <img
                src="src/remove.svg"
                alt="Icone para remover transação"
            />
        </button>
        </td>
        `
        return html
    },

    atualizarBalanco() {
        document.getElementById('entradas').innerHTML = formatacoes.formatarMoeda(transacoes.entradas())

        document.getElementById('saidas').innerHTML = formatacoes.formatarMoeda(transacoes.saidas())

        document.getElementById('total').innerHTML = formatacoes.formatarMoeda(transacoes.balanco())
    }
}

const App = {
    
}

// ESTRUTURA FOR-EACH REPONSAVEL POR INSERIR OS AS TRANSACOES NA TABELA DE ACORDO A QUANTIDADE NA LISTA
listaTransacoes.forEach((listaTransacoes) => {
    modelagemHTML.addTransacao(listaTransacoes)
});

modelagemHTML.atualizarBalanco()

transacoes.add({
    id: 10,
    descricao: 'Almoço',
    valores: 29,
    date: '20/10/2021'
})