const _ = require('underscore');
const swal2 = require('sweetalert2');

let letters = document.getElementById('letras');
let desc = document.getElementById('description');
let inputUsuario = document.getElementById('inputUsuario');
let manImage = document.getElementById('manImage');

let isLetter = false;
let data = [
	{ id: 1, description: 'Se construye', word: 'casa' },
	{ id: 2, description: 'Se escala', word: 'montaña' },
	{ id: 3, description: 'Es amarillo y curvo', word: 'platano' },
	{
		id: 4,
		description: 'Es un pais conformado por varios paises',
		word: 'eeuu',
	},
	{ id: 5, description: 'Sol,playa y ...', word: 'arena' },
];

let trys = 1;

const getDescriptionAndWord = ({ description, word }) => {
	return { description, word };
};

const preventInput = e => {
	e.preventDefault();
	return (isLetter = false);
};

const getFirstWord = words => words.shift();
const letterToSpace = letter => (letter = '_');
const spliceWord = el => {
	el.word = el.word.split('');
	return el;
};

const letterHTML = (letter, i) =>
	`<h1 id="space${i}"class="m-2">${letterToSpace(letter)}</h1>`;
const prepareLetters = ({ description, word }) => {
	word = word.map(letterHTML);
	return { description, word };
};

const renderWord = ({ description, word }) => {
	desc.innerText = description;
	letters.innerHTML = word;
};

const changeSpace = (letter, i) => {
	let space = document.getElementById(`space${i}`);
	space.textContent = letter;
};

let changeLettersToSpaces = ({ word }) => word.map(letterToSpace);

const verifyLetter = letter => {
	let index = splicedWord.word.indexOf(letter);
	if (index > -1) {
		updateSplicedWord(index, '_');
		updateSpacedWord(index, letter);

		return verifyLetter(letter);
	} else {
		spacedWord.map(changeSpace);
		return spacedWord;
	}
};

const updateMan = i => {
	manImage.src = `./assets/images/paso${i}.svg`;
	return trys++;
};

const verifySpacedWord = spacedword => {
	return spacedword.includes('_')
		? ''
		: swal2
				.fire({
					title: 'Lo lograste!',
					imageUrl: './assets/images/circles-menu-1.gif',
					confirmButtonText: 'Genial, quiero jugar denuevo!',
				})
				.then(result => {
					if (result) {
						location.reload();
					}
				});
};

const removeAndPut = word => (index, character) => {
	word.splice(index, 1, character);
};

let words = data.map(getDescriptionAndWord);
let shuffleWords = _.shuffle(words);

let firstWord = getFirstWord(shuffleWords);
let splicedWord = spliceWord(firstWord);
let spacedWord = changeLettersToSpaces(splicedWord);
const updateSplicedWord = removeAndPut(splicedWord.word);
const updateSpacedWord = removeAndPut(spacedWord);

window.addEventListener('load', () => {
	renderWord(prepareLetters(splicedWord));
	inputUsuario.focus();
});

inputUsuario.addEventListener('keydown', e => {
	let v = e.key.length > 1 ? '9' : e.key;
	let regexValue = new RegExp('[a-zñ]', 'gi');
	return v.match(regexValue) ? (isLetter = true) : preventInput(e);
});

inputUsuario.addEventListener('keyup', e => {
	if (isLetter) {
		let value = e.target.value;

		splicedWord.word.includes(value) ? verifyLetter(value) : updateMan(trys);

		e.target.value = '';
		trys > 7
			? swal2
					.fire({
						title: 'Perdiste ):',
						text: false,
						icon: 'error',
						confirmButtonText: 'Quiero volver a intentarlo!',
					})
					.then(result => {
						if (result) {
							location.reload();
						}
					})
			: verifySpacedWord(spacedWord);
	}
});
