let randomNumber = Math.floor((Math.random() * 88) * 1)
let apiUrl = 'https://swapi.co/api/people/' + randomNumber

let name = document.querySelector('#characterName');
let gender = document.querySelector('#gender');
let hairColor = document.querySelector('#hair-color');
let homeworld = document.querySelector('#homeworld');
let species = document.querySelector('#species');
let starship = document.querySelector('#starship');
let films = document.querySelector('#films');
let showAnswer = document.querySelector('#showAnswerButton');

let starshipUrl;

fetch(apiUrl).then(response => {
  return response.json();
}).then(data => {	
	name.innerText = data.name;
	gender.innerText = `Gender:  ${data.gender}`
	hairColor.innerText = `Hair Color:  ${data.hair_color}`
	let planetUrl = `${data.homeworld}`
	let speciesUrl = `${data.species}`
	starshipUrl = `${[data.starships]}`

	

	fetch(planetUrl).then(response => {
	return response.json();
	}).then(data => {
		homeworld.innerText = `Home World: ${data.name}`
	}).catch(err => {
		homeworld.innerText = "Home World Not Found"
	})

	fetch(speciesUrl).then(response => {
		return response.json();		
	}).then(data => {
		species.innerText = `Species:  ${data.name}`
	}).catch(ERR => {
		species.innerText = "Species Not Found"
	})

	fetch(starshipUrl, {
		mode: 'no-cors'
	}).then(response => {
		return response.json();
	}).then(data => {
		
		for (var i=0; i<arr.length; i++) {
			starship.innerText = (`Starship:  ${data.name}`)[i]
		}
		
	}).catch(err => {
		starship.innerText = 'Starship Not Found'
	})
	
}).catch(err => {
 	name.innerText = "Something went wrong. Please, refresh."
});	

showAnswer.addEventListener("click", displayName);

function displayName() {
	name.style.visibility = "visible";
}

/*fetch(starshipUrl).then(response => {
		return response.json();
	}).then(data => {
		let starshipsArray = [`${data.name}`]
		for (var i=0; i<arr.length; i++) {
			starship.innerText = `Starship:  ${starshipsArray}`
		}
		
	}).catch(err => {
		starship.innerText = 'Starship Not Found'
	})

*/
