const mainCards = document.querySelector("#main-cards");
let URL = "https://pokeapi.co/api";
//let URL2 = "https://pokeapi.co/api/v2/type/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + "/v2/pokemon/" + i)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

function showPokemon(data) {
  /* TYPES */
  let types = findTypes(data);

  /* Element logo*/
  let elementLogo = findElementLogo(data);

  /* Element container*/
  const div = createCardStyle(data, types, elementLogo);

  /* SHOW */
  mainCards.append(div);
}

function createCardStyle(data, types, elementLogo) {
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <div class="pokemon-img">
        <img src="${data.sprites.other["official-artwork"].front_default}"
        alt="${data.name}">
    </div>
    <div class="pokemon-info">
        <div class="pokemon-name-cont">
            ${elementLogo}
            <h2 class="pokemon-name">${data.name}</h2>
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

export { showPokemon };
