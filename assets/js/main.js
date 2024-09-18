const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 40
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        applyfilter()
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function applyfilter(){
    const selectedType = document.getElementById('typeFilter').value;
    const pokemonList = document.querySelectorAll('.pokemon');

    pokemonList.forEach(pokemon => {
        const pokemonTypes = Array.from(pokemon.querySelectorAll('.type')).map(typeElement => typeElement.textContent.toLowerCase());

        if (selectedType === 'all' || pokemonTypes.includes(selectedType)) {
            pokemon.style.display = 'block'; // Mostra o Pokémon
        } else {
            pokemon.style.display = 'none';  // Esconde o Pokémon
        }
    });
};

document.getElementById('filterButton').addEventListener('click', function () {
    applyfilter();
});
