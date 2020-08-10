var scores, roundScore, activePlayer, gamePlaying;

init();

/* **************************************************************************** */
// ROLL BUTTONS
/* **************************************************************************** */

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Create a random number 
        var dice = Math.floor(Math.random() * 6 + 1);

        // 2. Display the result 
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the score if the DICE !== 1 , if it === 1 => Next Player 
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
    }

});

/* **************************************************************************** */
// HOLD BUTONS
/* **************************************************************************** */


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Update the current (round score) to the Global score  
        scores[activePlayer] += roundScore;
        // Update the global score to the active player on UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        //Check the player won the game 
        // if the current player HIT 20 scores => this player won the game 
        // if NOT => NEXT PLAYER     

        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!!!"
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            nextPlayer();
        }

    }

})

/* **************************************************************************** */
// NEXT PLayer Function ---- USE Dry Principles
/* **************************************************************************** */


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Set all the current score of both 2 players to 0

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // add active Status to current player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

/* **************************************************************************** */
// NEW GAME BUTONS
/* **************************************************************************** */

document.querySelector('.btn-new').addEventListener('click',init);

function init() {

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // Init function when you start a game
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}





