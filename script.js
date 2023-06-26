const tablero = document.querySelector("#tablero");
const turno = document.querySelector("#turno");
let arrJuego = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let tableroLleno = false;
let turnoDe = 0; //1 jugador, 0 cpu
comienzoPartida();
function actualizarTablero() {
    const html = arrJuego.map((fila) => {
        const rows = fila.map((elemento) => {
            return `<button class="casilla">${elemento}</button>`;
        });
        return `<div class="fila">${rows.join("")}</div>`;
    });
    return (tablero.innerHTML = html.join(""));
}

function actualizarJugador() {
  turno.innerHTML = `${turnoDe == 0 ? "Turno de la PC" : "Turno del jugador"}`;
}
function comienzoPartida() {
    tableroLleno = false;
    arrJuego = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
  actualizarTablero();
  turnoDe = Math.floor(Math.random() * 2) == 0 ? 0 : 1;
  actualizarJugador();

  if (turnoDe == 0) {
    cpuPlays();
  } else {
    playerPlays();
  }
}

function playerPlays() {
    if (arrayEstaLleno(arrJuego)||tableroLleno==true) {
        tableroLleno=true  
  };
      if (!tableroLleno) {
    const casillas = document.querySelectorAll(".casilla");
    function handleClick(iFila, iCasilla) {
      return function () {
        const casilla = arrJuego[iFila][iCasilla];
        if (casilla === "") {
          arrJuego[iFila][iCasilla] = "O";
          turnoDe = 0;
          actualizarTablero();
          actualizarJugador();
          if (verificarGanador().gano == true) {
            terminarPartida();
          } else if (tableroLleno) {
            terminarPartida();
          }
      
          cpuPlays();
        }
      };
    }

    casillas.forEach((elementoHTML, index) => {
      const iFila = Math.floor(index / 3);
      const iCasilla = index % 3;
      elementoHTML.addEventListener("click", handleClick(iFila, iCasilla));
    });
  }
  else{
    terminarPartida()
  }
}

function cpuPlays() {
    if (arrayEstaLleno(arrJuego)||tableroLleno==true) {
        tableroLleno=true  
  };
  if (!tableroLleno) {
    setTimeout(() => {
      // Verificar si hay una jugada ganadora para el CPU
      const jugadaGanadora = buscarJugadaGanadora("X");
      if (jugadaGanadora) {
        arrJuego[jugadaGanadora[0]][jugadaGanadora[1]] = "X";
      } else {
        // Verificar si hay una jugada del jugador para bloquearla
        const jugadaBloqueo = buscarJugadaGanadora("O");
        if (jugadaBloqueo) {
          arrJuego[jugadaBloqueo[0]][jugadaBloqueo[1]] = "X";
        } else {
          // Realizar una jugada aleatoria
          let randomUno = Math.floor(Math.random() * 3);
          let randomDos = Math.floor(Math.random() * 3);
          while (arrJuego[randomUno][randomDos] !== "") {
            randomUno = Math.floor(Math.random() * 3);
            randomDos = Math.floor(Math.random() * 3);
          }
          arrJuego[randomUno][randomDos] = "X";
        }
      }
  
      turnoDe = 1;
      actualizarTablero();
      actualizarJugador();
  
      if (verificarGanador().gano) {
        terminarPartida();
      } else if (arrayEstaLleno(arrJuego)) {
        terminarPartida();
      }
  
      playerPlays();
    }, 1000);
}
else{
    terminarPartida()
}
  }
  

function arrayEstaLleno(arr) {
  return arr.every((fila) => fila.every((elemento) => elemento !== ""));
}

function verificarGanador() {
  const ganadorCombinaciones = [
    // Horizontales
    [arrJuego[0][0], arrJuego[0][1], arrJuego[0][2]],
    [arrJuego[1][0], arrJuego[1][1], arrJuego[1][2]],
    [arrJuego[2][0], arrJuego[2][1], arrJuego[2][2]],
    // Verticales
    [arrJuego[0][0], arrJuego[1][0], arrJuego[2][0]],
    [arrJuego[0][1], arrJuego[1][1], arrJuego[2][1]],
    [arrJuego[0][2], arrJuego[1][2], arrJuego[2][2]],
    // Diagonales
    [arrJuego[0][0], arrJuego[1][1], arrJuego[2][2]],
    [arrJuego[2][0], arrJuego[1][1], arrJuego[0][2]],
  ];

  // Verificar si alguna de las combinaciones es ganadora
  const ganador = ganadorCombinaciones.find(
    ([a, b, c]) => a !== "" && a === b && b === c
  );

  return { ganador: ganador ? ganador[0] : null, gano: ganador ? true : null };
}

function terminarPartida() {
  turno.innerHTML = `${
    verificarGanador().ganador != null
      ? `El ganador es el jugador con: ${verificarGanador().ganador}`
      : `Hubo un empate`
  }`;
  tableroLleno = true;
}


function buscarJugadaGanadora(jugador) {
    // Verificar filas
    for (let i = 0; i < 3; i++) {
      if (
        arrJuego[i][0] === jugador &&
        arrJuego[i][1] === jugador &&
        arrJuego[i][2] === ""
      ) {
        return [i, 2];
      }
      if (
        arrJuego[i][0] === jugador &&
        arrJuego[i][1] === "" &&
        arrJuego[i][2] === jugador
      ) {
        return [i, 1];
      }
      if (
        arrJuego[i][0] === "" &&
        arrJuego[i][1] === jugador &&
        arrJuego[i][2] === jugador
      ) {
        return [i, 0];
      }
    }
  
    // Verificar columnas
    for (let j = 0; j < 3; j++) {
      if (
        arrJuego[0][j] === jugador &&
        arrJuego[1][j] === jugador &&
        arrJuego[2][j] === ""
      ) {
        return [2, j];
      }
      if (
        arrJuego[0][j] === jugador &&
        arrJuego[1][j] === "" &&
        arrJuego[2][j] === jugador
      ) {
        return [1, j];
      }
      if (
        arrJuego[0][j] === "" &&
        arrJuego[1][j] === jugador &&
        arrJuego[2][j] === jugador
      ) {
        return [0, j];
      }
    }
  
    // Verificar diagonales
    if (
      arrJuego[0][0] === jugador &&
      arrJuego[1][1] === jugador &&
      arrJuego[2][2] === ""
    ) {
      return [2, 2];
    }
    if (
      arrJuego[0][0] === jugador &&
      arrJuego[1][1] === "" &&
      arrJuego[2][2] === jugador
    ) {
      return [1, 1];
    }
    if (
      arrJuego[0][0] === "" &&
      arrJuego[1][1] === jugador &&
      arrJuego[2][2] === jugador
    ) {
      return [0, 0];
    }
    if (
      arrJuego[0][2] === jugador &&
      arrJuego[1][1] === jugador &&
      arrJuego[2][0] === ""
    ) {
      return [2, 0];
    }
    if (
      arrJuego[0][2] === jugador &&
      arrJuego[1][1] === "" &&
      arrJuego[2][0] === jugador
    ) {
      return [1, 1];
    }
    if (
      arrJuego[0][2] === "" &&
      arrJuego[1][1] === jugador &&
      arrJuego[2][0] === jugador
    ) {
      return [0, 2];
    }
  
    return null;
  }
  