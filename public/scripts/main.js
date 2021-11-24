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
        document.body.style.overflowY = "hidden"
    },
    close(){
        document.querySelector('.tela-lancamento').classList.remove('active')
        document.body.style.overflowY = "visible"
    }
}

const bancoDados = {
    get(){
        return JSON.parse(localStorage.getItem("financas:transacoes")) || []
    },

    set(transacoes) {
        localStorage.setItem("financas:transacoes", JSON.stringify(transacoes))
    }
}

const transacoes = {
    all: bancoDados.get(),
    
    /*[{
        descricao: 'Desenvolvimento de site',
        valores: 1200000,
        data: '13/03/2020'
    },{
        descricao: 'Hamburguer',
        valores: -5900,
        data: '10/04/2021'
    },{
        descricao: 'Aluguel de apartamento',
        valores: -120000,
        data: '27/03/2020'
    },{
        descricao: 'Computador',
        valores: -540000,
        data: '15/03/2020'
    },{
        descricao: 'App de vendas',
        valores: 700000,
        data: '26/10/2021'
    }
    ]*/

    add(listaTransacoes){
        transacoes.all.push(listaTransacoes)

        document.location.reload(true)

        app.reload()
    },

    remove(index){
        transacoes.all.splice(index, 1)

        app.reload()

        document.location.reload(true)
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

//CONSTANTE DE FORMATAÇÕES, LOCAL ONDE FUNÇÕES DE FORMATAÇÃO SÃO CRIADAS E UTILIZADAS NO CÓDIGO
const formatacoes = {
    formatarValor(valores){
        valores = Number(valores) * 100

        return valores
    },

    formatarData(data){
        const dataSeparada = data.split("-")

        return `${dataSeparada[2]}/${dataSeparada[1]}/${dataSeparada[0]}`
    },

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
        transacao.innerHTML = modelagemHTML.inserirHtmlTransacao(listaTransacoes, index)
        transacao.dataset.index = index

        modelagemHTML.containerTransacoes.appendChild(transacao)
    },
    inserirHtmlTransacao(listaTransacoes, index){
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
        <button onclick="transacoes.remove(${index})" title="Remover Transação" class="btn-remover">
            <img
                src="images/remove.svg"
                alt="Icone para remover transação"
            />
        </button>
        </td>
        `
        console.log(index)
        console.log(listaTransacoes)
        return html
    },

    atualizarBalanco() {
        document.getElementById('entradas').innerHTML = formatacoes.formatarMoeda(transacoes.entradas())

        document.getElementById('saidas').innerHTML = formatacoes.formatarMoeda(transacoes.saidas())

        document.getElementById('total').innerHTML = formatacoes.formatarMoeda(transacoes.balanco())
    },

    limparTransacoes() {
        modelagemHTML.containerTransacoes.innerHTML = ""
    }
}

//CONSTANTE DE CAPTURA DOS DADOS DO FORMULARIO DE TRANSACOES
const formulario = {
    descricao: document.querySelector('input#description'),
    valores: document.querySelector('input#amount'),
    data: document.querySelector('input#date'),

    guardarValores(){
        return{
            descricao: formulario.descricao.value,
            valores: formulario.valores.value,
            data: formulario.data.value
        }
    },

    validarCampos() {
        const { descricao, valores, data } = formulario.guardarValores() 

        if(descricao.trim() === "" || valores.trim() === "" || data.trim() === ""){
            throw new Error("Por favor, preencha todos os campos.")
        }
    },

    tratamentoDados() {
        let { descricao, valores, data } = formulario.guardarValores()

        valores = formatacoes.formatarValor(valores)

        data = formatacoes.formatarData(data)

        return {
            descricao, valores, data
        }
    },

    limparCampos() {
        formulario.descricao.value = ""
        formulario.valores.value = ""
        formulario.data.value = ""
    },

    salvarTransacoes(listaTransacoes) {
        transacoes.add(listaTransacoes)
    },

    submit(event) {
        event.preventDefault()

        try{
            //VALIDANDO OS CAMPOS
            formulario.validarCampos()
            //TRANTANDO OS DADOS
            const dadosDaTransacao = formulario.tratamentoDados()
            //SALVANDO OS DADOS NA TABELA
            formulario.salvarTransacoes(dadosDaTransacao)
            //LIMPANDO OS CAMPOS DO FORMULARIO
            formulario.limparCampos()
            //FECHANDO A TELA DE TRANSACOES
            telaTransacao.close()

        } catch (error) {
            alert(error.message)
        }
    }
}

const dataTable = {
    datatable(){
        const table = new DataTable('#data-table', {
            order: [2, 'asc'],
            pageLength: 15
        })
    }
}

//CONSTANTE QUE DA INÍCIO E RECORRENCIA AS FUNCIONALIDADES
const app = {
    init(){
        // ESTRUTURA FOR-EACH REPONSAVEL POR INSERIR OS AS TRANSACOES NA TABELA DE ACORDO A QUANTIDADE NA LISTA
        transacoes.all.forEach((listaTransacoes, index) => {
            modelagemHTML.addTransacao(listaTransacoes, index)
        })        

        modelagemHTML.atualizarBalanco()

        bancoDados.set(transacoes.all)
    },

    reload() {
        modelagemHTML.limparTransacoes()

        app.init()
    },
}

app.init()

dataTable.datatable()