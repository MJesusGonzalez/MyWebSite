const mainCards = document.querySelector("#main-cards");
const loadMore = document.querySelector(".content-loadMore");
let URL = "https://pokeapi.co/api";
//let URL2 = "https://pokeapi.co/api/v2/type/";

let offset = 1;
let limit = 29;

loadMore.addEventListener("click", () => {
  offset += 30;
  searchPokemon(offset, limit);
});

function fetchPokemon(id) {
  fetch(URL + "/v2/pokemon/" + id)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

function searchPokemon(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

function showPokemon(data) {
  /* ID */
  let pId = pokemonID(data);
  /* TYPES */
  let types = findTypes(data);

  /* Element logo*/
  let elementLogo = findElementLogo(data);

  /* Element container*/
  const div = createCardStyle(data, types, elementLogo, pId);

  /* SHOW */
  mainCards.append(div);
}

function createCardStyle(data, types, elementLogo, pId) {
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <div class="pokemon-img">
        <img src="${data.sprites.other["official-artwork"].front_default}"
        alt="${data.name}">
    </div>
    <div class="pokemon-info">
        <div class="pokemon-name-cont">
            <h3 class="pokemon-id">#${pId}</h3>
            <h2 class="pokemon-name">${data.name}</h2>
        </div>
        <div class="pokemon-types">
            ${elementLogo}
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
  return div;
}

function pokemonID(data) {
  let pokeId = data.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
    console.log(pokeId);
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }
  return pokeId;
}

function findTypes(data) {
  let types = data.types.map(
    (type) => `<p class="type ${type.type.name}">${type.type.name}</p>`
  );
  types = types.join(``);
  return types;
}

function findElementLogo(data) {
  let elements = data.types.map(
    (type) => `
    <div class="icon ${type.type.name}Logo">
      <img src="../img/icons/${type.type.name}.svg" />
    </div>
    `
  );
  elements = elements.join(` `);
  return elements;
}

searchPokemon(offset, limit);

export { showPokemon };
