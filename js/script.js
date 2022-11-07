/* CONTRASEÑA? */
let savedPass = 1234;

/* CONSTRUCTOR Y DECLARACION DE POKES */

class Pokemon {
  constructor(nombre, tipo, numero, region) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.numero = parseInt(numero);
    this.region = region;
  }
}

iniciales = [
  new Pokemon("Charmander", "Fuego", "4"),
  new Pokemon("Squirtle", "Agua", "7"),
  new Pokemon("Bulbasaur", "Planta", "1"),
];

/* LOGIN SIMPLE */

function login() {
  let logged = false;

  for (let i = 3; i > 0; i--) {
    let userPass = prompt("Ingresá tu contraseña, te quedan " + i + " chances");
    if (userPass == savedPass) {
      alert("Bienvenido");
      logged = true;
      break;
    } else {
      alert("Contraseña Incorrecta");
    }
  }
  return logged;
}

if (login()) {
  let userChoice = prompt(
    "Elegí una opción: \n1 - Ver Iniciales. \n2 - Ordernar por Numero. \n3 - Filtrar por tipo \n4 - Salir"
  );

  /* MENU DE OPCIONES */

  while (userChoice != "4") {
    switch (userChoice) {
      case "1":
        alert(`Los iniciales disponibles son: \n ${crearString(iniciales)}`);

        break;

      case "2":
        alert(
          crearString(iniciales.slice(0).sort((a, b) => a.numero - b.numero))
        );
        break;

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

      default:
        alert("Elegiste una opción inválida");
        break;
    }
    userChoice = prompt(
      "Elegí una opción: \n1 - Ver Iniciales. \n2 - Ordernar por Numero. \n3 - Filtrar por tipo \n4 - Salir"
    );
  }
} else {
  alert("Fallaste varias veces seguidas, probá de nuevo mas tarde");
}

alert("Hasta luego");

/* FUNC PARA CONVERTIR OBJETOS EN ARRAYS */

function crearString(array) {
  string = "";
  array.forEach((element) => {
    string += `Nombre: ${element.nombre}\n Tipo: ${element.tipo}\n Numero: ${element.numero}\n Region: ${element.region} \n\n`;
  });
  return string;
}
