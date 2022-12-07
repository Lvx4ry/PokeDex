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
const spinner = document.getElementById("loading-spinner");

//FETCH Y DECLARACION DE ARRAY DE POKES

let currentArray = [];
let arrayPosition = 0;
let arrPositionEnd = 15;

let pokes = [];

const promesas = [];
for (let i = 1; i < 152; i++) {
  const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
  promesas.push(fetch(url).then((res) => res.json()));
}

Promise.all(promesas).then((results) => {
  const pokemons = results.map((data) => ({
    name: capitalCase(data.name),
    id: data.id,
    img: data.sprites.front_default,
    type: data.types.map((type) => capitalCase(type.type.name)).join(" - "),
  }));

  pokes = pokemons;
  printMore(pokes);
});

/* FILTRADOS */

function searchFilter(arr, search) {
  return isNaN(search)
    ? arr
        .slice()
        .filter((x) => x.name.toUpperCase().includes(search.toUpperCase()))
    : arr.slice().filter((x) => x.id.toString().includes(parseInt(search)));
}

function randomSort(arr) {
  return arr.slice().sort(() => 0.5 - Math.random());
}

function numberSort(arr) {
  return arr.slice().sort((a, b) => a.id - b.id);
}

function alphabeticSort(arr) {
  return arr.slice().sort((a, b) => a.name.localeCompare(b.name));
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

function typeFilter(typeParam, arr) {
  if (typeParam !== "Every") {
    return arr.slice(0).filter((x) => x.type.includes(typeParam));
  } else {
    return arr;
  }
}

//FUNCIONES VARIAS

const clear = () => (cardContainer.innerHTML = "");

const hideSpinner = () => spinner.classList.add("hidden");

const clearPositionRestockSpinner = () => {
  arrayPosition = 0;
  arrPositionEnd = 15;
  spinner.classList.remove("hidden");
  clear();
};

function printMore(arr) {
  currentArray = arr;
  cardMaker(currentArray, arrayPosition);
  arrayPosition += 15;
  arrPositionEnd += 15;
}

function capitalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* TOGGLE VISIBLE */

function toggleHidden(element) {
  element.classList.toggle("hidden");
}

/* CARDS */

const cardMaker = (arr, arrPosition) => {
  //if (arrayPosition <= currentArray.length) {
  const card = arr
    .slice(arrPosition, arrPositionEnd)
    .map(
      (pokemon) => `<div
    class="card col-8 col-md-4 col-lg-2 border-light darkSecColor my-3 mx-1"
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
  </div>`
    )
    .join("");
  if (arr.length < 1) {
    cardContainer.innerHTML += `<div class="col-lg-8 col-10 fs-3 text-center">There's no results for what you're looking for :( <div/>`;
    hideSpinner();
  } else {
    cardContainer.innerHTML += card;
  }
};
//};

/* EVENTS */

window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 5) {
    setTimeout(() => {
      printMore(currentArray);
    }, 1000);
  }
  if (arrayPosition >= currentArray.length) {
    hideSpinner();
  }
});

btnDarkMode.addEventListener("click", () => {
  body.classList.toggle("lightMode");
  body.classList.contains("lightMode")
    ? localStorage.setItem("dark-mode", "false")
    : localStorage.setItem("dark-mode", "true");
  Toastify({
    text: "Theme Changed!",
    duration: 2000,
    offset: {
      x: "0.2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "3.4em", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #56ab2f, #a8e063)",
    },
  }).showToast();
});

btnAdvanced.addEventListener("click", (e) => {
  e.preventDefault();
  toggleHidden(advancedContainer);
});

btnFilter.addEventListener("click", (e) => {
  e.preventDefault();
  let type = typeSelector.value;
  let filter = filterSelector.value;

  clearPositionRestockSpinner();
  printMore(globalSort(filter, typeFilter(type, pokes)));
});

btnRandom.addEventListener("click", (e) => {
  e.preventDefault();
  clearPositionRestockSpinner();
  printMore(randomSort(pokes));
});

searchBar.addEventListener("keyup", () => {
  const value = searchBar.value;
  clearPositionRestockSpinner();

  value == "" || value == " "
    ? printMore(numberSort(pokes))
    : printMore(searchFilter(pokes, value));
});

/* DARK MODE LOCAL STORAGE */

if (JSON.parse(localStorage.getItem("dark-mode")) === true) {
  body.classList.remove("lightMode");
  btnDarkMode.checked = true;
} else {
  body.classList.add("lightMode");
}
