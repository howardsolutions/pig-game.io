/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// DOM Manipulation 
var score, roundScore, activePlayer, gamePlaying;

init();

// add event listener

// callBack function is a function you don't call directly, but call by another function 

    // ------------------ROLL buttons
document.querySelector('.btn-roll').addEventListener('click',function() {
    if (gamePlaying) {
        // call the dice with random number. declare a variable.
        var dice = Math.floor(Math.random()*6) + 1 ; 
        
        // display the value
        var diceDOM =  document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        // update score if the rolled is NOT a 1. 

            if (dice !== 1 ) {
                roundScore += dice// add score  === roundScore = roundScore + dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else { // next player if (dice === 1)
                nextPlayer();
            }   

    }

    });
    

    // --------------------- buttons "HOLD"
document.querySelector(".btn-hold").addEventListener("click", function() {
       
    if (gamePlaying) {
        //add current score => global score
        score[activePlayer] += roundScore;
                
        //UPDATE global score to the active player
        document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];

        //Check if player won the game ==== 100 scores
        if (score[activePlayer] >= 20) {
            document.querySelector('#name-'+ activePlayer).textContent = "Winner!!!"    
            document.querySelector('.dice').style.display ='none';
            document.querySelector('.player-' + activePlayer + "-panel").classList.add("winner");
            document.querySelector('.player-' + activePlayer + "-panel").classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();  // next player when you HIT a HOLD button.
        }
    }   
           
               
});

    // ------------------ USE "DRY" principle to clean code. write a function 
function nextPlayer () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // next player, ternary operator or you can use if else
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';
    
   // add active status
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');
};  

    //------------------------- NEW GAME buttons----------------------------

document.querySelector('.btn-new').addEventListener('click', init);

// INITIALIZation FUNCTION 

function init() {
    score = [0,0]; 
    roundScore = 0;
    activePlayer = 0;
    gamePlaying =  true;

    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');
    
    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');

    document.querySelector(".player-0-panel").classList.add('active');

};


 //    if(activePlayer === 0 ){
    //        activePlayer = 1;
    //    } else {
    //        activePlayer = 0;
    //    }


// document.querySelector('#current-' + activePlayer).textContent = dice;

// document.querySelector('#current-' + activePlayer).innerHTML = '<strong>'+  dice + '</strong>';





