const inputDelAhorcado = document.getElementById("inputUsuario");
//?Utilidades
const sumarEtiquetas = (acc, valor) => `${acc + valor}`;
//!Entregar palabra al azar  para colocar espacios en pantalla
const obtenerPalabraAlAzar = (array) => {
  let numeroAlAzar = Math.floor(Math.random() * array.length);
  return array[numeroAlAzar];
};
//! Cortar La palabra en un array
const transformarStringAArray = (palabra) => palabra.split("");
//! Funcion para obtener - en DOM
const crearEspaciosDelDOM = (letra) => `<h1 class="m-2">${letra}</h1>`;
//! Añadir al dom
const añadirAlDOM = (nodo) => (letras) => (nodo.innerHTML = letras);
//! Obtener array de palabras
const palabrasDeAhorcado = () => {
  const palabras = [
    "invierno",
    "carro",
    "lampara",
    "gusano",
    "cielo",
    "alfombra",
  ];

  const palabraAlAzarParaAhorcado = transformarStringAArray(
    obtenerPalabraAlAzar(palabras)
  );
  const espaciosEnVezDePalabras = palabraAlAzarParaAhorcado.map((i) => "-");

  return { palabraAlAzarParaAhorcado, espaciosEnVezDePalabras };
};
let palabraElegida = palabrasDeAhorcado();

//*Colocar dentro de pantalla los espacios de las letras
const añadirADivLetras = añadirAlDOM(document.getElementById("letras"));
const obtenerTodasLasLetras = (arr, input) => {
  let indices = arr
    .map((item, index) => (item === input ? index : ""))
    .filter(String);
  return indices;
};
//! Verificar Letras
const verificarLetra = (letra) => (palabraElegida) => (espaciosDePalabras) => {
  if (palabraElegida.includes(letra)) {
    obtenerTodasLasLetras(palabraElegida, letra).map(
      (i) => (espaciosDePalabras[i] = letra)
    );
    añadirADivLetras(
      espaciosDePalabras.map(crearEspaciosDelDOM).reduce(sumarEtiquetas)
    );
    juegoGanado(espaciosDePalabras);
  } else {
    aumentarContadorDeErrores();
  }
};
//! Contador de Errores
const contadorDeErrores = () => {
  let errores = 0;
  return () => {
    if (errores === 6) {
      swal("DIANTRES ", "HAS PERDIDO EL JUEGO", "error");
    } else {
      errores++;
      cambiarImagenes(errores);
    }
  };
};
const aumentarContadorDeErrores = contadorDeErrores();
//!mostrar cambios de imagenes
const cambiarImagenes = (x) => {
  let imagenes = [
    "./images/paso0.svg",
    "./images/paso1.svg",
    "./images/paso2.svg",
    "./images/paso3.svg",
    "./images/paso4.svg",
    "./images/paso5.svg",
    "./images/paso6.svg",
  ];
  document.getElementById("muñeco").src = imagenes[x];
};
//!Obtener input aprentando enter
inputDelAhorcado.onkeyup = (e) => {
  if (e.keyCode === 13) {
    verificarLetra(inputDelAhorcado.value.toLowerCase())(
      palabraElegida.palabraAlAzarParaAhorcado
    )(palabraElegida.espaciosEnVezDePalabras);
    inputDelAhorcado.value = "";
  }
};

//! Condicion de ganar
const juegoGanado = (palabra) => {
  if (!palabra.includes("-")) {
    swal("FELICIDADES ", "HAS GANDO EL JUEGO", "success");
  }
};
//! mostrar los modales
window.onload = () => {
  inputDelAhorcado.focus();

  añadirADivLetras(
    palabraElegida.espaciosEnVezDePalabras
      .map(crearEspaciosDelDOM)
      .reduce(sumarEtiquetas)
  );
};
