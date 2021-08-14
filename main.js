// letters
let alphapet = 'abcdefghijklmnopqrstuvwxyz';

// make an array of letters

let arrayOfLetters = Array.from(alphapet);

// setlet letter elelment

let lettersContiner = document.querySelector('.letters');

// generate letters functions

arrayOfLetters.forEach((letter) => {
  // create span
  let span = document.createElement('span');
  // create letter node
  let theLetter = document.createTextNode(letter);
  // append the span
  span.appendChild(theLetter);
  // add class to the span
  span.className = 'letter-box';
  // append the letters contianer
  lettersContiner.appendChild(span);
});

// object of words and categories

const words = {
  programming: [
    'php',
    'javascript',
    'go',
    'scale',
    'fortran',
    'r',
    'mysql',
    'python',
  ],
  movies: [
    'Prestige',
    'Inception',
    'parasite',
    'Interstellar',
    'Whiplash',
    'Memento',
    'Coco',
    'Up',
  ],
  people: [
    'Albert Einstein',
    'Hitchcock',
    'Alexander',
    'Cleopatra',
    'Mahatma Gandhi',
  ],
  countries: ['Syria', 'Palestine', 'Yemen', 'Egypt', 'Bahrain', 'Qatar'],
};

let allKeys = Object.keys(words);

// get random property
function getRandomWord() {
  let randomNumber = Math.floor(Math.random() * allKeys.length);
  let randPropName = allKeys[randomNumber];
  let randomPropValue = words[randPropName]; // array like [syrai, palsite...]

  let randomVlaueNumber = Math.floor(Math.random() * randomPropValue.length);
  // the chosen word
  let randomWordValue = randomPropValue[randomVlaueNumber];
  document.querySelector('.game-info .category span').innerHTML = randPropName;

  return randomWordValue;
}
let randomWord = getRandomWord();

// select the contianer of  letters to be guessed

let lettersGuessedContinaer = document.querySelector('.lettters-guess');

// convert the chosen word to array of letters and spaces
let lettersAndSpaces = [];
let guessSpans = [];

function fillSPansOFGuess() {
  lettersAndSpaces = Array.from(randomWord);
  if (guessSpans.length > 0) {
    guessSpans.forEach((span) => {
      lettersGuessedContinaer.removeChild(span);
    });
  }
  lettersAndSpaces.forEach((letter) => {
    let emptySpan = document.createElement('span');
    if (letter === ' ') {
      emptySpan.className = 'has-space';
    }
    lettersGuessedContinaer.appendChild(emptySpan);
  });
  guessSpans = document.querySelectorAll('.lettters-guess span');
}

fillSPansOFGuess();

// handling clicking
let worngAttempts = 0;
let theDraw = document.querySelector('.hangman-draw');

// select guess spans

document.addEventListener('click', (e) => {
  if (e.target.className === 'letter-box') {
    // set the status
    let theStatus = false;
    e.target.classList.add('clicked');
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    lettersAndSpaces.forEach((char, WoordIndex) => {
      if (theClickedLetter === char.toLowerCase()) {
        theStatus = true;

        // loop on guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (WoordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    if (theStatus != true) {
      worngAttempts++;
      theDraw.classList.add(`wrong-${worngAttempts}`);
      if (worngAttempts === 8) {
        GameOver();
        lettersContiner.classList.add('finished');
      }
    } else {
      // check win
      checkWin();
    }
  }
});

function checkWin() {
  let total = guessSpans.length;
  let counter = 0;

  guessSpans.forEach((span) => {
    if (span.innerHTML !== '') {
      counter++;
    }
  });
  if (counter === total) {
    GameOVerWin();
  }
}
function GameOVerWin() {
  let div = document.createElement('div');
  let div1 = document.createElement('div');

  let divText1 = document.createTextNode(`Bravooooooo`);

  let div2 = document.createElement('div');
  let divText2 = document.createTextNode(`Play Again`);

  div2.className = 'play';
  div1.appendChild(divText1);
  div2.appendChild(divText2);
  div.appendChild(div1);
  div.appendChild(div2);
  div.className = 'popup';
  document.body.appendChild(div);
  let playButton = document.querySelector('.play');
  playButton.addEventListener('click', () => {
    PlayAgain();
  });
}

function GameOver() {
  let div = document.createElement('div');
  let div1 = document.createElement('div');

  let divText1 = document.createTextNode(
    `Game over, The word is ${randomWord}`
  );

  let div2 = document.createElement('div');
  let divText2 = document.createTextNode(`Play Again`);

  div1.className = 'text';
  div2.className = 'play';
  div1.appendChild(divText1);
  div2.appendChild(divText2);
  div.appendChild(div1);
  div.appendChild(div2);
  div.className = 'popup';
  document.body.appendChild(div);
  let playButton = document.querySelector('.play');
  playButton.addEventListener('click', () => {
    PlayAgain();
  });
}

function PlayAgain() {
  document.querySelector('.popup').remove();
  lettersContiner.classList.remove('finished');
  let lettersSpansArray = document.querySelectorAll('.letters .letter-box');
  lettersSpansArray.forEach((span) => {
    span.classList.remove('clicked');
  });
  guessSpans.forEach((span) => {
    span.innerHTML = '';
  });
  randomWord = getRandomWord();
  fillSPansOFGuess();
  for (let i = 1; i <= worngAttempts; i++) {
    theDraw.classList.remove(`wrong-${i}`);
  }
  worngAttempts = 0;
}
