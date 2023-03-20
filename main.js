'use strict'

const mapa = document.getElementById('map')

const getEstado = async ({target}) => {
    const estado = target.id.replace('BR-','')
    const verificandoEstado = await pesquisarCidade(estado)   
    const verificandoCapital = await pesquisarCapital(estado)
    const getData =  createCard(verificandoEstado, verificandoCapital)
    target.addEventListener('click', getData)
}

const pesquisarCidade = async function(event){
    const url = `/v1/senai/estados/cidades/sigla/${event}`
    const response = await fetch(url)
    const data = await response.json()
    return{
        uf: data.uf,
        nome: data.nome,
        cidades: data.cidades
    }
}

const pesquisarCapital = async function(event){
    const url = `/v1/senai/estado/sigla/${event}`
    const response = await fetch(url)
    const data = await response.json()
    return{
        capital:data.capital,
        regiao: data.regiao
    }
}


const createCard = async (event) => {
    const container = document.getElementById('container')

    const card = document.createElement('div')
    card.classList.add('card')

    const headerCard = document.createElement('div')
    headerCard.classList.add('headerCard')

    const titleHeader = document.createElement('p')
    titleHeader.textContent = event.nome

    const ufState = document.createElement('p')
    ufState.classList.add('ufState')
    ufState.textContent = event.uf

    const AllCitys = document.createElement('div')
    AllCitys.classList.add('AllCity')

    const city = document.createElement('p')
    city.classList.add(city)

    
    headerCard.append(titleHeader, ufState)
    AllCitys.append(city)
    card.append(headerCard, AllCitys)
    container.replaceChildren(card)
}

mapa.addEventListener("click", getEstado)
