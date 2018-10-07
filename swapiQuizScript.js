/*let randomNumber = Math.floor((Math.random() * 88) * 1)*/
/*let apiUrl = 'https://swapi.co/api/people/' + randomNumber*/


let name = document.querySelector('#characterName');
let gender = document.querySelector('#gender');
let hairColor = document.querySelector('#hair-color');
let homeworld = document.querySelector('#homeworld');
let species = document.querySelector('#species');
let starship = document.querySelector('#starship');
let films = document.querySelector('#films');
let showAnswer = document.querySelector('#showAnswerButton');


fetch('https://swapi.co/api/people/1/').then(response => {
  return response.json();
}).then(data => {	
	name.innerText = data.name;
	gender.innerText = `Gender:  ${data.gender}`
	hairColor.innerText = `Hair Color:  ${data.hair_color}`
	homeworld.innerText = `Homeworld:  ${data.homeworld}`
	species.innerText = `Species:  ${data.species}`
	starship.innerText = `Starship:  ${data.starship}`
	gender.innerText = `Gender:  ${data.gender}`
 }).catch(err => {
});	

showAnswer.addEventListener("click", displayName);

function displayName() {
	name.style.visibility = "visible";
}




