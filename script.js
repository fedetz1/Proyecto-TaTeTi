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
  if (tableroLleno) {
    return;
  }
  tableroLleno = arrayEstaLleno(arrJuego);
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
}

function cpuPlays() {
  if (tableroLleno) {
    return;
  }
  let randomUno = Math.floor(Math.random() * 3);
  let randomDos = Math.floor(Math.random() * 3);
  tableroLleno = arrayEstaLleno(arrJuego);
  if (!tableroLleno) {
    setTimeout(() => {
      while (arrJuego[randomUno][randomDos] != "") {
        randomUno = Math.floor(Math.random() * 3);
        randomDos = Math.floor(Math.random() * 3);
      }

      arrJuego[randomUno][randomDos] = "X";
      turnoDe = 1;
      actualizarTablero();
      actualizarJugador();

      if (verificarGanador().gano == true) {
        terminarPartida();
      }

      playerPlays();
    }, 2000);
  } else {
    turno.innerHTML = "Partida Terminada";
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




    const texto=document.querySelector(".botonsecreto")
    let i=0
    texto.addEventListener("click",e=>{
        if(i==5){
            alert("te amo")
        }
        i++
    })
    



