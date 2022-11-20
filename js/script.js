/* CONTRASEÑA? */
let savedPass = 1234;

/* CONSTRUCTOR Y DECLARACION DE POKES */

class Pokemon {
  constructor(nombre, tipo, numero, image) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.numero = numero;
    this.image = image;
  }
}

pokes = [
  new Pokemon("Charmander", "Fire", "4", "assets/img/charmander.png"),
  new Pokemon("Squirtle", "Water", "7", "assets/img/squirtle.png"),
  new Pokemon("Bulbasaur", "Grass", "1", "assets/img/bulbasaur.png"),
];

/* SELECTORS */
const btnRandom = document.getElementById("random-button");
const btnAdvanced = document.getElementById("advanced-button");
const btnSearch = document.getElementById("search-button");
const btnFilter = document.getElementById("filter-button");
const searchBar = document.getElementById("search-bar");
const cardContainer = document.getElementById("cards-container");
const typeSelector = document.getElementById("type-selector");
const filterSelector = document.getElementById("filter-selector");
const advancedContainer = document.getElementById("advOptionsContainer");

/* FILTRADOS */

function searchFilter(arr, search) {
  return isNaN(search)
    ? arr
        .slice()
        .filter((x) => x.nombre.toUpperCase().includes(search.toUpperCase()))
    : arr.slice().filter((x) => x.numero.includes(search));
}

function randomSort(arr) {
  return arr.slice().sort(() => 0.5 - Math.random());
}

function numberSort(arr) {
  return arr.slice().sort((a, b) => a.numero - b.numero);
}

function alphabeticSort(arr) {
  return arr.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
}

function globalSort(value, arr) {
  switch (value) {
    case "numberLowToHigh":
      return numberSort(arr);
    case "numberHighToLow":
      return numberSort(arr).reverse();
    case "A-Z":
      return alphabeticSort(arr);
    case "Z-A":
      return alphabeticSort(arr).reverse();
  }
}

function typeFilter(type, arr) {
  if (type !== "Every") {
    return arr
      .slice(0)
      .filter((element) => element.tipo.toUpperCase() == type.toUpperCase());
  } else {
    return arr;
  }
}

/* TOGGLE VISIBLE */

function toggleHidden(element) {
  element.classList.toggle("hidden");
}

/* CARDS */

function cardMaker(pokemon) {
  let card = `<div
  class="card col-8 col-md-4 col-lg-2 border-light darkSecColor m-2"
>
  <img
    src="${pokemon.image}"
    alt="${pokemon.nombre}'s picture"
    class="card-img-top border-bottom border-1 p-2"
  />
  <span
    class="card-subtitle text-muted whiteTxt mt-2 d-inline"
    >#${pokemon.numero}</span
  >
  <div class="card-body">
    <h5 class="card-title col-12">${pokemon.nombre}</h5>
    <p class="card-text col-12">${pokemon.tipo}</p>
  </div>
</div>`;

  cardContainer.innerHTML += card;
}

let clear = () => (cardContainer.innerHTML = "");

/* EVENTS */

window.onload = alphabeticSort(pokes).forEach((x) => cardMaker(x));

btnAdvanced.addEventListener("click", (e) => {
  e.preventDefault();
  toggleHidden(advancedContainer);
});

btnFilter.addEventListener("click", (e) => {
  e.preventDefault();
  let type = typeSelector.value;
  let filter = filterSelector.value;
  clear();
  globalSort(filter, typeFilter(type, pokes)).forEach((x) => cardMaker(x));
});

btnRandom.addEventListener("click", (e) => {
  e.preventDefault();
  clear();
  randomSort(pokes).forEach((x) => cardMaker(x));
});

searchBar.addEventListener("keyup", () => {
  const value = searchBar.value;
  clear();

  searchFilter(pokes, value).forEach((x) => cardMaker(x));
  console.log(pokes.slice().filter((x) => x.numero.includes(parseInt(value))));
});
