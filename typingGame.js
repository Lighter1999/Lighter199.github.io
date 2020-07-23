const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// list of words for the game

const words = ['wizard', 'plane', 'tree', 'yellow', 'faster', 'youtube', 'book', 'macbook', 'gaming', 'programming', 'animation', 'apple', 'aplication', 'child', 'macbook', 'tree', 'animal', 'hotrod', 'mercedes', 'samsung', 'building', 'desk', 'home', 'random', 'iphone', 'cheese', 'banana', 'truck', 'gaming', 'qwerty', 'planet', 'display', 'rock', 'pants', 'chair', 'purple', 'red', 'water', 'english', 'desert', 'deagle', 'awp', 'tank', 'dog', 'summer', 'longword', 'sword', 'castle', 'princess', 'waterpark', 'lion', 'power', 'verylongword', 'wizard', 'fridge', 'mask', 'corona', 'razer', 'snowman', 'discord', 'javascript', 'wonder', 'keyboard'];

// init word

let randomWord = words[Math.floor(Math.random() * words.length)];

// init score

let score = 0;

// init time

let time = 10;

// Set difficulty to value in ls or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// focus on text on start
text.focus();

// start counting down

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() { // doesn't work
    return words[Math.floor(Math.random() * words.lenght)];
}
// it adds the word 
function addWordToDOM() { 
    word.innerHTML = randomWord; // vom vedea cuvantul
}

// update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `<h1>Time ran out</h1><p>Your final score is ${score}</p><button class="reload "onclick="location.reload()">Reload</button>`;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

// event listener

text.addEventListener('input', e => {
    const insertedText = e.target.value; // o sa vada ce scriem

    if (insertedText === randomWord) {
        let newRandomWord = words[Math.floor(Math.random() * words.length)]; // nu trebuia sa arate asa, dar altfel nu mergea
        randomWord = newRandomWord;
        addWordToDOM();
        updateScore();

        // clear

        e.target.value = ''; // sterge cuvantul dupa ce l-am scris

        if (difficulty === 'hard') {
            time += 1;
        }
        else if (difficulty === 'medium') {
            time += 2;
        }
        else {
            time += 4;
        }
        updateTime();
    }
});

// settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});