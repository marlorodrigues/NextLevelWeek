
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

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
        .then(response => response.json())
        .then(cities => {
            for (city of cities) {
                citySelected.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelected.disabled = false
        })
}

populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

