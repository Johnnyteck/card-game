let deckId = ''
let cardValue = 0
fetch(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`) 
.then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    deckId = data.deck_id
  })
  .catch(err => {
      console.log(`error ${err}`)
  });

function drawCard(player){
    const url = `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        player.src = data.cards[0].image
        cardValue = data.cards[0].value
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}



// function getFetch(){
// //   const choice = document.querySelector('input').value

//   const anotherUrl = `http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`
//   fetch(anotherUrl)
//   .then(res => res.json()) // parse response as JSON
//   .then(data => {
//     console.log(data.deck_id)
//   })
//   .catch(err => {
//       console.log(`error ${err}`)
//   });
// }

// getFetch()


let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Card = document.getElementById("player1Card")
const player2Card = document.getElementById("player2Card")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn1 = document.getElementById("rollBtn1")
const rollBtn2 = document.getElementById("rollBtn2")
const resetBtn = document.getElementById("resetBtn")
const comment = document.getElementById("text")

function showResetButton() {
    rollBtn1.style.display = "none"
    rollBtn2.style.display = "none"
    resetBtn.style.display = "block"
}



/* Hook up a click event listener to the Roll Dice Button. */
rollBtn1.addEventListener("click", function() {
    drawCard(player1Card)

    if (player1Turn) {
        player1Score += cardValue
        player1Scoreboard.textContent = player1Score
        // player1Card.textContent = randomNumber1
        player1Card.classList.remove("active")
        player2Card.classList.add("active")
        message.textContent = "Player 2 Turn"
        player1Turn = !player1Turn
        if (player1Score >= 20) {
            message.textContent = "Player 1 Won 🥳"
            showResetButton()
        } else if (player2Score >= 20) {
            message.textContent = "Player 2 Won 🎉"
            showResetButton()
        } else { }
    } else{}
    
    
})
 

rollBtn2.addEventListener("click", function() {
    drawCard(player2Card)

    // const randomNumber2 = Math.floor(Math.random() * 6) + 1
    // if(!player1Turn) {
    //     player2Score += randomNumber2
    //     player2Scoreboard.textContent = player2Score
    //     player2Dice.textContent = randomNumber2
    //     player2Dice.classList.remove("active")
    //     player1Dice.classList.add("active")
    //     message.textContent = "Player 1 Turn"
    //     if (player1Score >= 20) {
    //         message.textContent = "Player 1 Won 🥳"
    //         showResetButton()
    //     } else if (player2Score >= 20) {
    //         message.textContent = "Player 2 Won 🎉"
    //         showResetButton()
    //     } else {}
    // } else{}
    // player1Turn = true
})

resetBtn.addEventListener("click", function(){
    reset()
})

// if (player1Score === 0) {
//     comment.textContent = ``
// } else if (player1Score === 6 || player2Score === 6 ) {
//     comment.textContent = "You just have just drawn a perfect number 6. Nice 🤗"
// } else if (player1Score === 2 || player2Score === 2) {
//     comment.textContent = `You just have just drawn a the only even square number. Weldone 🤗`
// }
// else {}

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    rollBtn1.style.display = "block"
    rollBtn2.style.display = "block"
    resetBtn.style.display = "none"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
}

