let savedPass = 1234;
let inicialFuego = "Charmander, Tipo: Fuego \n";
let inicialAgua = "Squirtle, Tipo: Agua \n";
let inicialPlanta = "Bulbasaur, Tipo: Planta \n";

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
    "Elegí una opción: \n1 - Elegir un Inicial. \n2 - Ver mis Pokémon. \n3 - Entrenar mi Pokémon \n4 - Salir"
  );
  let userPokemon;
  let pokemonLvl;
  while (userChoice != "4") {
    switch (userChoice) {
      case "1":
        let selectedPoke = prompt(
          "Elegí uno, los iniciales disponibles son: \n" +
            "1 -" +
            inicialFuego +
            "2 -" +
            inicialAgua +
            "3 -" +
            inicialPlanta
        );
        while (
          selectedPoke != "1" &&
          selectedPoke != "2" &&
          selectedPoke != "3"
        ) {
          selectedPoke = prompt(
            "Elegí uno, los iniciales disponibles son: \n" +
              "1 -" +
              inicialFuego +
              "2 -" +
              inicialAgua +
              "3 -" +
              inicialPlanta
          );
        }
        switch (selectedPoke) {
          case "1":
            userPokemon = inicialFuego;
            pokemonLvl = 1;
            alert("Elegiste a " + inicialFuego);
            break;

          case "2":
            userPokemon = inicialAgua;
            pokemonLvl = 1;
            alert("Elegiste a " + inicialAgua);
            break;

          case "3":
            userPokemon = inicialPlanta;
            pokemonLvl = 1;
            alert("Elegiste a " + inicialPlanta);
            break;

          default:
            alert("Elegiste una opción inválida");
            break;
        }
        break;
      case "2":
        if (
          userPokemon == inicialAgua ||
          userPokemon == inicialFuego ||
          userPokemon == inicialPlanta
        ) {
          alert(
            "Tu pokémon es: \n" + userPokemon + "y es nivel: " + pokemonLvl
          );
        } else {
          alert("No tienes ningún Pokémon, elige uno");
        }
        break;
      case "3":
        if (isNaN(pokemonLvl)) {
          alert("No tienes ningún Pokémon, elige uno");
        } else if (pokemonLvl == 99) {
          alert("No puedes subir más de nivel a este Pokémon");
        } else {
          pokemonLvl++;
          alert("Tu Pokémon subió 1 Nivel! Ahora es Nivel: " + pokemonLvl);
        }
        break;

      default:
        alert("Elegiste una opción inválida");
        break;
    }
    userChoice = prompt(
      "Elegí una opción: \n1 - Ver Iniciales. \n2 - Ver mis Pokémon. \n3 - Entrenar mi Pokémon \n4 - Salir"
    );
  }
} else {
  alert("Fallaste varias veces seguidas, probá de nuevo mas tarde");
}

alert("Hasta luego");
