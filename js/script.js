/* CONTRASEÑA? */
let savedPass = 1234;

/* CONSTRUCTOR Y DECLARACION DE POKES */

class Pokemon {
  constructor(nombre, tipo, numero, image) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.numero = parseInt(numero);
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
  class="card col-2 border-light darkSecColor m-2"
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

/* ? */

if (login()) {
  let userChoice = prompt(
    "Elegí una opción: \n1 - Ver Iniciales. \n2 - Ordernar por Numero. \n3 - Filtrar por tipo \n4 - A-Z \n5 - Z-A \n6 - Salir"
  );

  /* MENU DE OPCIONES */

  while (userChoice != "6") {
    switch (userChoice) {
      /* MOSTRAR LOS INICIALES */
      case "1":
        alert(`Los iniciales disponibles son: \n ${crearString(iniciales)}`);

        break;
      /* ORDENAR POR NUMERO */
      case "2":
        alert(
          crearString(iniciales.slice(0).sort((a, b) => a.numero - b.numero))
        );
        break;
      /* FILTRAR POR TIPO */
      case "3":
        let userTypeChoice = prompt(
          "Elegí entre Fuego, Agua o Planta"
        ).toUpperCase();
        let filtrado = crearString(
          iniciales
            .slice(0)
            .filter((element) => element.tipo.toUpperCase() == userTypeChoice)
        );
        if (filtrado == "") {
          alert("No hay iniciales con ese tipo");
        } else {
          alert(filtrado);
        }

        break;
      /* ORDENAR A-Z */
      case "4":
        alert(
          crearString(
            iniciales.slice(0).sort((a, b) => a.nombre.localeCompare(b.nombre))
          )
        );
        break;
      /* ORDENAR Z-A */
      case "5":
        alert(
          crearString(
            iniciales
              .slice(0)
              .sort((a, b) => a.nombre.localeCompare(b.nombre))
              .reverse()
          )
        );
        break;

      default:
        alert("Elegiste una opción inválida");
        break;
    }
    userChoice = prompt(
      "Elegí una opción: \n1 - Ver Iniciales. \n2 - Ordernar por Numero. \n3 - Filtrar por tipo \n4 - A-Z \n5 - Z-A \n6 - Salir"
    );
  }
} else {
  alert("Fallaste varias veces seguidas, probá de nuevo mas tarde");
}

/* FUNC PARA CONVERTIR OBJETOS EN STRINGS */

function crearString(array) {
  string = "";
  array.forEach((element) => {
    string += `Nombre: ${element.nombre}\n Tipo: ${element.tipo}\n Numero: ${element.numero}\n Region: ${element.region} \n\n`;
  });
  return string;
}
