/* CONTRASEÑA? */
let savedPass = 1234;

/* CONSTRUCTOR Y DECLARACION DE POKES */

/* class Pokemon {
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
 */
//FETCH POKES

/* function fetchPokemon(filterType, value) {
  switch (filterType) {
    case "nameOrId":
      fetch(`https://pokeapi.co/api/v2/pokemon/${value}/`)
        .then((res) => res.json())
        .then((data) => console.log(data));
      break;
    case "types":
      fetch(`https://pokeapi.co/api/v2/type/${value}/`)
        .then((res) => res.json())
        .then((data) => console.log(data));
  }
} */

let promesas = [];
let pokes = [];
let pokemons = [];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPokemon() {
  for (let i = 1; i < 152; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    fetch(url)
      .then((res) => res.json())
      .then((poke) =>
        pokemons.push({
          name: poke.name,
          id: poke.id,
          img: poke.sprites.front_default,
          type: poke.types.map((type) => type.type.name),
        })
      );
  }
}

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
const body = document.body;
const btnDarkMode = document.getElementById("dark-mode-switch");

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

async function cardMaker(arr) {
  await fetchPokemon();

  arr.forEach((pokemon) => {
    console.log(pokemon);
    let card = `<div
  class="card col-8 col-md-4 col-lg-2 border-light darkSecColor m-2"
>
  <img
    src="${pokemon.img}"
    alt="${pokemon.name}'s picture"
    class="card-img-top border-bottom border-1 p-2"
  />
  <span
    class="card-subtitle text-muted whiteTxt mt-2 d-inline"
    >#${pokemon.id}</span
  >
  <div class="card-body">
    <h5 class="card-title col-12">${pokemon.name}</h5>
    <p class="card-text col-12">${pokemon.type}</p>
  </div>
</div>`;

    cardContainer.innerHTML += card;
  });
}

let clear = () => (cardContainer.innerHTML = "");

/* EVENTS */

window.onload = numberSort(pokemons).forEach((x) => {
  cardMaker(x);
});

btnDarkMode.addEventListener("click", () => {
  body.classList.toggle("lightMode");
  console.log(btnDarkMode.checked);
  body.classList.contains("lightMode")
    ? localStorage.setItem("dark-mode", "false")
    : localStorage.setItem("dark-mode", "true");
});

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

/* DARK MODE LOCAL STORAGE */

if (JSON.parse(localStorage.getItem("dark-mode")) === true) {
  body.classList.remove("lightMode");
  btnDarkMode.checked = true;
} else {
  body.classList.add("lightMode");
}
fetchPokemon();

console.log(pokemons);
cardMaker(pokemons);
