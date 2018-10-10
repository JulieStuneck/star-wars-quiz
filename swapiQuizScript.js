/*let randomNumber = Math.floor((Math.random() * 88) * 1)
let apiUrl = 'https://swapi.co/api/people/' + randomNumber*/

let apiUrl = 'https://swapi.co/api/people/1/' //using this for testing

let name = document.querySelector('#characterName');
let gender = document.querySelector('#gender');
let hairColor = document.querySelector('#hair-color');
let homeworld = document.querySelector('#homeworld');
let species = document.querySelector('#species');
let starship = document.querySelector('#starship');
let films = document.querySelector('#films');
let showAnswer = document.querySelector('#showAnswerButton');

let starshipUrls;


fetch(apiUrl).then(response => {
  return response.json();
}).then(data => {	
	console.log("data at line 18")
	name.innerText = data.name;
	gender.innerText = `Gender:  ${data.gender}`
	hairColor.innerText = `Hair Color:  ${data.hair_color}`
	let planetUrl = `${data.homeworld}`
	let speciesUrl = `${data.species}`
	let starshipUrls = [`${data.starships}`]
	/*let starshipUrls = [  //-works
        "https://swapi.co/api/starships/12/", 
        "https://swapi.co/api/starships/22/"
    ]*/

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
	
	async function showStarships() {
		await new Promise((resolve, reject) => setTimeout(resolve, 3000));
		//Promise.all(starshipUrls.map(url =>  //works for one ship & mulit when starshipUrls hardcoded, but not `{}`
		Promise.all(starshipUrls.slice(url =>  //no errors, but returns undefined with starshipUrls `{}`	  
		    fetch(url).then(name => name.json(), 
		    	console.log('fetch at line 50')) //get's logged only when starshipUrls is hardcoded
		)).then(array => {
		    for (var i=0; i<starshipUrls.length; i++) {
		    	let para = document.createElement('p');
		    	let ship = document.createTextNode(`${array[i].name}, `)
		    	para.appendChild(ship);
		    	var element = document.getElementById('starship');
		    	element.appendChild(ship);				}
		  }).catch(err => {
			starship.innerText = 'Starship Not Found'
		})
	}/*async bracket*/
	showStarships()

}).catch(err => {
 	name.innerText = "Something went wrong. Please, refresh."
});	

showAnswer.addEventListener("click", displayName);

function displayName() {
	name.style.visibility = "visible";	
}

