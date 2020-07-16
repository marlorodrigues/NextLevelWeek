
function populateUFs() {
    const stateSelected = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => response.json())
        .then(states => {
            for (state of states) {
                stateSelected.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

function getCities(event) {
    const citySelected = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelected.innerHTML = `<option value="">Selecione a cidade</option>`
    citySelected.disabled = true


    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
        .then(response => response.json())
        .then(cities => {
            for (city of cities) {
                citySelected.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelected.disabled = false
        })
}

populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


const itensToCollect = document
    .querySelectorAll(".itens-grid li")

for (const item of itensToCollect) {
    item.addEventListener('click', handleSelectedItem)
}


const colectedItens = document.querySelector('input[name=itens]')
let selectedItens = []

function handleSelectedItem(event) {
    const itemLI = event.target
    
    itemLI.classList.toggle('selected')
    const itemId = itemLI.dataset.id

    const alreadySelected = selectedItens.findIndex(item => item === itemId)

    if (alreadySelected >= 0) {
        const filteredItens = selectedItens.filter(item => item !== itemId)
        selectedItens = filteredItens
    }
    else {
        selectedItens.push(itemId)
    }

    colectedItens.value = selectedItens
}
