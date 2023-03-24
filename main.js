'use strict'

const mapa = document.getElementById('map')

const getEstado = async ({target}) => {
    const estado = target.id.replace('BR-','')
    const verificandoEstado = await pesquisarCidade(estado)   
    const verificandoCapital  = await pesquisarCapital(estado)
    const getData =  createCard(verificandoEstado, verificandoCapital)
    target.addEventListener('click', getData)
}

const pesquisarCidade = async function(event){
    const url = `http://localhost:8080/cidades?uf=${event}`
    const response = await fetch(url)
    const data = await response.json()
    return{
        uf: data.uf,
        nome: data.nome,
        cidades: data.cidades
    }
}

const pesquisarCapital = async function(event){
    const url = `http://localhost:8080/estado/sigla/${event}`
    const response = await fetch(url)
    const data = await response.json()
    return{
        regiao: data.regiao,
        capital: data.capital
    }
}

const createCard = async (eventEstado, eventCapital) => {
    const container = document.getElementById('container')

    const card = document.createElement('div')
    card.classList.add('card')

    const headerCard = document.createElement('div')
    headerCard.classList.add('headerCard')

    const ufState = document.createElement('p')
    ufState.classList.add('ufState')
    ufState.textContent = eventEstado.uf

    const div = document.createElement('div')   
    div.classList.add('divClass') 

    const titleHeader = document.createElement('p')
    titleHeader.textContent = eventEstado.nome
    titleHeader.classList.add('title')

    const regionState = document.createElement('p')
    regionState.textContent = eventCapital.regiao
    regionState.classList.add('regiao')


    const capitalState = document.createElement('p')
    capitalState.textContent = eventCapital.capital
    capitalState.classList.add('capital')

    const cidades = document.createElement('div')
    cidades.classList.add('allCity')

    let listaCidades = []
    let lista = eventEstado.cidades 
    listaCidades.push(lista)

    listaCidades[0].forEach(function(cidade){
        const onlyCity = document.createElement('p')
        onlyCity.classList.add('citys')
        onlyCity.textContent =  cidade
        cidades.appendChild(onlyCity)
    })

    div.append(titleHeader, regionState, capitalState)
    headerCard.append(ufState, div)
    card.append(headerCard, cidades)
    container.replaceChildren(card)
}

mapa.addEventListener("click", getEstado)
