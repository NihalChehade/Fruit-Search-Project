const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant',
	'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple',
	'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape',
	'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul',
	'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango',
	'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit',
	'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine',
	'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple',
	'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant',
	'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];


function search(str) {
	let results = [];
	const enteredStr = str.toLowerCase();
	results = fruit.filter((fru) => fru.toLowerCase().includes(enteredStr));
	return results;
}

function searchHandler(e) {
	//capture typed input
	const keysPressed = e.target.value;
   
	const suggestedFruits = search(keysPressed);

	//call showsuggestions to create the DOM elements for every suggestedFuit and pass in the inputValue
	showSuggestions(suggestedFruits, keysPressed);
}

function showSuggestions(results, inputVal) {
	suggestions.innerHTML = "";
	if (inputVal !== "") {
		for (let fruit of results) {

			//create an li for every fruit in suggestedFruits array update its innerHtml and append it to the ul
			const fruitLi = document.createElement("li");
			//bold the matching substring to bold (dont lose the letter case!)
			const boldFruit = fruit.replace(new RegExp(`(${inputVal})`, 'gi'), `<strong>$&</strong>`);
			fruitLi.innerHTML = boldFruit;
			suggestions.append(fruitLi);
		}
		//add class has-suggestions to the ul to display it
		suggestions.classList.add('has-suggestions');

	} else {
		//if there is no input remove class has-suggestions from ul to hide it
		suggestions.classList.remove('has-suggestions');
	}
}

function useSuggestion(e) {
	const selectedSuggestion = e.target;
	//if user clicks on an li populate the input with the innerHTML of that li then delete all HTML inside the ul and hide it
	if (selectedSuggestion.tagName === 'LI' ) {
		input.value = selectedSuggestion.innerText;
		suggestions.innerHTML = "";
		suggestions.classList.remove('has-suggestions');
	}else if(selectedSuggestion.tagName === 'STRONG'){
		input.value = selectedSuggestion.parentElement.innerText;
		suggestions.innerHTML = "";
		suggestions.classList.remove('has-suggestions');
		const strongParent=selectedSuggestion.parentElement;
	}
}

function highlightLi(e) {
//on mouseover highlight the li using class hoverdSuggestionLi
	const targetTag = e.target;
	if (targetTag.tagName === 'LI' ){
		targetTag.classList.toggle("hoverdSuggestionLi");
	}else if(targetTag.tagName === 'STRONG'){
		targetTag.parentElement.classList.toggle("hoverdSuggestionLi");
		}
	
}

function DeHighlightLi(e) {
	//on mouseout remove the highlight
	const targetTag = e.target;
	if (targetTag.tagName === 'LI' ){
		targetTag.classList.toggle("hoverdSuggestionLi");
	}else if(targetTag.tagName === 'STRONG'){
		targetTag.parentElement.classList.toggle("hoverdSuggestionLi");
		}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', highlightLi);
suggestions.addEventListener('mouseout', DeHighlightLi);