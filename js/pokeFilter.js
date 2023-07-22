import { showPokemon } from "./pokeAPI.js";

const buttonsFilter = document.querySelectorAll(".btn");
const mainCards = document.querySelector("#main-cards");
let URL = "https://pokeapi.co/api";

buttonsFilter.forEach((button) =>
  button.addEventListener("click", (event) => {
    showPokemonFilter(event);
  })
);

function showPokemonFilter(event) {
  const buttonId = event.currentTarget.id;
  mainCards.innerHTML = "";
  for (let i = 1; i <= 151; i++) {
    fetch(URL + "/v2/pokemon/" + i)
      .then((response) => response.json())
      .then((data) => {
        selectPokemon(data, buttonId);
      });
  }
}

function selectPokemon(data, buttonId) {
  const types = data.types.map((type) => type.type.name);
  if (buttonId === "all") {
    showPokemon(data);
  } else {
    if (types.some((type) => type.includes(buttonId))) {
      showPokemon(data);
    }
  }
}
