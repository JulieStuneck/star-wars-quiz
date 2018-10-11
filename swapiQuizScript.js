let randomNumber = Math.floor((Math.random() * 88) * 1)
let apiUrl = 'https://swapi.co/api/people/' + randomNumber

//let apiUrl = 'https://swapi.co/api/people/1/' //using this for testing

let name = document.querySelector('#characterName');
let instructions = document.querySelector('#instructions');
let gender = document.querySelector('#gender');
let hairColor = document.querySelector('#hair-color');
let homeworld = document.querySelector('#homeworld');
let species = document.querySelector('#species');
let starship = document.querySelector('#starship');
let films = document.querySelector('#films');
let showAnswer = document.querySelector('#showAnswerButton');

fetch(apiUrl).then(response => {
  return response.json();
}).then(data => {	
	name.innerText = data.name;
	gender.innerText = `Gender:  ${data.gender}`
	hairColor.innerText = `Hair Color:  ${data.hair_color}`
	let planetUrl = `${data.homeworld}`
	let speciesUrl = `${data.species}`
	let starshipUrls = data.starships
	let filmUrls = data.films;
	
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

	let shipRequests = starshipUrls.map(url => fetch(url));
	Promise.all(shipRequests)
  		.then(responses => {
			// Unordered list for ships
			const shipsUl = document.createElement('ul')

			// Individual starship list items
			responses.forEach(response => {
				const shipLi = document.createElement('li')
				shipLi.textContent = response.url

				fetch(response.url).then(starshipResponse => {
					starshipResponse.json().then(starship => {
						shipLi.textContent = starship.name
					})
				}).catch(err => {
					starship.innerText = 'Starship Not Found'
				})

				shipsUl.appendChild(shipLi);
			});

			// Plug ship list into starship paragraph
			const shipsP = document.getElementById('starship');
			shipsP.appendChild(shipsUl);
		});

	let filmRequests = filmUrls.map(filmUrl => fetch(filmUrl));
	Promise.all(filmRequests)
		.then(responses2 => {
			const filmsUl = document.createElement('ul')
			responses2.forEach(response2 => {
				const filmLi = document.createElement('li')
				filmLi.textContent = response2.url

			fetch(response2.url).then(filmResponse => {
				filmResponse.json().then(films => {
					filmLi.textContent = films.title
				})
			}).catch(err => {
				films.innerText = 'Film Not Found'
			})
				filmsUl.appendChild(filmLi);
			})

			const filmsP = document.getElementById('films');
			filmsP.appendChild(filmsUl);
		})
	
	
	}).catch(err => {
 	name.innerText = "Something went wrong. Please, refresh."
});	

showAnswer.addEventListener("click", displayName);

function displayName() {
	name.style.visibility = "visible";	
	instructions.style.visibility = "hidden";
}


//no ul version:
	/*Promise.all(starshipUrls.map(url =>  
	    fetch(url).then(name => name.json(), 
	   ))).then(array => {
	    for (var i=0; i<starshipUrls.length; i++) {
	    	let para = document.createElement('p');
	    	let ship = document.createTextNode(`${array[i].name}, `)
	    	para.appendChild(ship);
	    	var element = document.getElementById('starship');
	    	element.appendChild(ship);				}
	  }).catch(err => {
		starship.innerText = 'Starship Not Found'
	})*/

