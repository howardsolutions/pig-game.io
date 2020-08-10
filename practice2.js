/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

/* **************************************************************************** */
// ******************************* ROLL BUTTONS ******************************
/* **************************************************************************** */

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // Create a random number for the dice & call random DICE img to the UI
        var dice = Math.floor(Math.random() * 6 + 1);
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // add the number of dice each time you ROLL to the current SC if !== 1
        // if it = 1 => next player
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

});


/* **************************************************************************** */
// ***************************** HOLD BUTTONS ************************************
/* **************************************************************************** */
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        // store the current score to GLOBAL sc. 
        scores[activePlayer] += roundScore;

        // display the global score to the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check player win if someone hit 20 scores. if NOT => next player
        if (scores[activePlayer] >= 20) {
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    }


})


// We use DRY principles for writes a nextPLayer function
// when click to the HOLD => next player => current sc =0
// when the dice you rolls is 1 => next player => and current scores set to 0

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

/* ****************************** */
// NEW GAME BUTTON

document.querySelector('.btn-new').addEventListener('click', init);

// INIT FUNCTION WHEN START A NEW GAME

function init() {

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // When the game start 

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');

}
