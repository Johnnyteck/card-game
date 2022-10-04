// Initializing values
let deckId = ''
let player1Turn = true
let player1Score = 0
let player2Score = 0
let card1Value = 0
let card2Value = 0

// Create variables to store references to the necessary DOM nodes
const player1Card = document.getElementById("player1Card")
const player2Card = document.getElementById("player2Card")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const drawBtn1 = document.getElementById("drawBtn1")
const drawBtn2 = document.getElementById("drawBtn2")
const resetBtn = document.getElementById("resetBtn")
const comment = document.getElementById("text")

//Fetch deckofcards shuffle API
fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`) 
.then(res => res.json()) // parse response as JSON
  .then(data => {
    deckId = data.deck_id
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

// Button Functionalities
function drawDice1() {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        // console.log(data)

        if (player1Turn) {
            player1Card.src = data.cards[0].image;
            card1Value = data.cards[0].value;

            player1Score += convertNum(card1Value);
            player1Scoreboard.textContent = player1Score;

            player1Card.classList.remove('active');
            player2Card.classList.add('active');
            message.textContent = 'Player 2 Turn';
            player1Turn = !player1Turn;
            
            checkWinner()
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });   
}

function drawDice2() {
    const url = `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)

        if (!player1Turn) {
            player2Card.src = data.cards[0].image;
            card2Value = data.cards[0].value;

            player2Score += convertNum(card2Value);
            player2Scoreboard.textContent = player2Score;
            // player2Card.textContent = randomNumber2
            player2Card.classList.remove('active');
            player1Card.classList.add('active');
            message.textContent = 'Player 1 Turn';
            checkWinner();
        }
        player1Turn = true;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

/* Hook up a click event listener to the Draw Card Button. */
drawBtn1.addEventListener("click", drawDice1)
drawBtn2.addEventListener("click", drawDice2)
resetBtn.addEventListener("click", reset)


//Utility Functions

// Convert card value to integer
function convertNum(val) {
  if (val === 'ACE') {
    return 11;
  } else if (val === 'KING') {
    return 14;
  } else if (val === 'QUEEN') {
    return 13;
  } else if (val === 'JACK') {
    return 12;
  } else {
    return Number(val);
  }
}

//Show reset button
function showResetButton() {
    drawBtn1.style.display = "none"
    drawBtn2.style.display = "none"
    resetBtn.style.display = "block"
}

//Check game winner
function checkWinner() {
  if (player1Score >= 52) {
    message.textContent = 'Player 1 Won 🥳';
    showResetButton();
  } else if (player2Score >= 52) {
    message.textContent = 'Player 2 Won 🎉';
    showResetButton();
  } else {
  }
}

//Reset game status
function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Card.src = "./images/joker.png"
    player2Card.src = "./images/joker.png"
    message.textContent = "Player 1 Turn"
    drawBtn1.style.display = "block"
    drawBtn2.style.display = "block"
    resetBtn.style.display = "none"
    player2Card.classList.remove("active")
    player1Card.classList.add("active")
}
