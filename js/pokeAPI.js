const mainCards = document.querySelector("#main-cards");
let URL = "https://pokeapi.co/api";
//let URL2 = "https://pokeapi.co/api/v2/type/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + "/v2/pokemon/" + i)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

function showPokemon(poke) {
  /* TYPES */
  let types = findTypes(poke);

  /* SHOW */
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <div class="pokemon-img">
        <img src="${poke.sprites.other["official-artwork"].front_default}"
        alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="pokemon-name-cont">
            <h2 class="pokemon-logo fas fa-fire-flame-curved"></h2>
            <h2 class="pokemon-name">${poke.name}</h2>
        </div>
        <div class="pokemon-types">
            ${types}
        </div>
        <div class="pokemon-types">
            <p class="type">Debil: </p>
            <p class="type ">Por Realizar</p>
        </div>
    </div>
  `;
  mainCards.append(div);
}

function findTypes(poke) {
  let types = poke.types.map(
    (type) => `<p class="type ${type.type.name}">${type.type.name}</p>`
  );
  types = types.join(``);
  return types;
}
export { showPokemon };
