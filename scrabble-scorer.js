// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
const input = require("readline-sync"); //import readline-sync module

const oldPointStructure = { //array for old point structure
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) { //function for old scrabble scorer
	word = word.toUpperCase();
	let totalPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			totalPoints +=  parseInt(pointValue);
		 }
	  }
	}
	return totalPoints;
 }
 
 let newPointStructure = transform(oldPointStructure); //transforming old to new point structure
 
 for (const pointValue in oldPointStructure) {
   for (const letter of oldPointStructure[pointValue]) {
      newPointStructure[letter] = parseInt(pointValue);
   }
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() { //inital prompt greets player
   console.log("Welcome! Let's play some scrabble! Enter a word:");
   return input.question("Enter word here: "); //THIS WAS ADDED LAST

};

//STARTER CODE: let simpleScorer; ALL SCORING FUNCTIONS BELOW
function simpleScorer(word) {
   return word.length;
}

//STARTER CODE: let vowelBonusScorer;
function vowelBonusScorer(word) {
   word = word.toUpperCase()
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      if ('AEIOU'.includes(word[i])) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
}

//STARTER CODE: let scrabbleScorer;
function scrabbleScorer(word) {
   word =  word.toLowerCase();
   let totalPoints = 0;

   for (let i = 0; i < word.length; i++) {
      totalPoints += newPointStructure[word[i]];
   }

   return totalPoints;
}

const scoringAlgorithms = [
   {name: 'Simple Score', description: 'Each letter is worth 1 point.', scorerFunction: simpleScorer},
   {name: 'Bonus Vowels', description: 'Vowels are 3 pts, consanants are 1 pt.', scorerFunction: vowelBonusScorer},
   {name: 'Scrabble', description: 'The traditional scoring algorithm', scorerFunction: scrabbleScorer}
];

function scorerPrompt() { //function for how to score word input
   console.log('\nScoring Algorithms:');
   scoringAlgorithms.forEach((algorithm, index)=> {
      console.log(`${index} - ${algorithm.name}: ${algorithm.description}`);
   });

   let selectedAlgorithm = input.question('Enter 0, 1, or 2: '); //ALGO used depends on users input
   return scoringAlgorithms[selectedAlgorithm];
}

function transform(oldPointStructure) {
   let newTransformedStructure = [];

   for (const pointValue in oldPointStructure) {
      for (const letter of oldPointStructure[pointValue]) {
         newTransformedStructure[letter.toLowerCase()] = parseInt(pointValue);
      }
   }
   return newTransformedStructure;
};

function runProgram() { 

   let userWord = initialPrompt();
   let chosenAlgorithm = scorerPrompt();
   let score = chosenAlgorithm.scorerFunction(userWord);

   console.log(`Score for '${userWord}': ${score}`);
}

//done.
// Don't write any code below this line //

// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
