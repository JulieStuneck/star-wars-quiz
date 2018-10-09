/*let randomNumber = Math.floor((Math.random() * 88) * 1)
let apiUrl = 'https://swapi.co/api/people/' + randomNumber*/
let apiUrl = 'https://swapi.co/api/people/1/'

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
	let starshipUrls = `${data.starships}` 
	/*let starshipUrls = [
        "https://swapi.co/api/starships/12/", 
        "https://swapi.co/api/starships/22/"
    ]*/
//let starshipUrl = "https://swapi.co/api/starships/12/" - works without no-cors


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
	}).catch(err => {
		species.innerText = "Species Not Found"
	})

	
	Promise.all(starshipUrls.map(url =>  //works for one ship
	    fetch(url).then(name => name.json())
	))
	  .then(array => {
	    //starship.innerText = 'Starship(s): ' + array[0].name + ', ' + array[1].name
	   
	    for (var i=0; i<starshipUrls.length; i++) {
	    	let para = document.createElement('p');
	    	let ship = document.createTextNode(`${array[i].name}, `)
	    	para.appendChild(ship);
	    	var element = document.getElementById('starship');
	    	element.appendChild(ship);
			//starship.innerText = `Starship(s):  ${array[i].name}`  -works, but only shows last index
		}

	  }).catch(err => {
		starship.innerText = 'Starship Not Found'
	})

	/*fetch(starshipUrls, {
		mode: 'no-cors'
	}).then(response => {
		return response.json();
	}).then(data => {
		let starshipArray = [`${data.name}`]
		
		//starship.innerText = `Starship: ${data.name}`
		starship.innerText = `Starship: ${data.name}`
		
	}).catch(err => {
		starship.innerText = 'Starship Not Found'
	})*/
	
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
