var intro = document.getElementById('intro');
var quizzer = document.getElementById('quizzer');
var outro = document.getElementById('outro');
var startBtn = document.getElementById('start-btn');
var timer = document.getElementById('timer');
var choiceBtn = document.getElementById('choice-btn');
var noThanksBtn = document.getElementById('no-thanks-btn');
var reveal = document.getElementById('reveal');


var questions = [{}]
var score = 0;



var gameCountdown = function() {
    // start the countdown at 45 seconds
    var timeLeft = 45;
    // timeLeft variable decrements every 1 second
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        timer.textContent = timeLeft;
        timeLeft--;
      } else {
        // timer goes away
        timer.textContent = '';
        // stops the interval
        clearInterval(timeInterval);
        // calls the gameEnd function
        gameEnd();
      }
    }, 1000);
}

var startGame = function() {
    gameCountdown();
    intro.classList.add("hide");
    quizzer.classList.remove("hide");
}

var gameEnd = function() {
    quizzer.classList.add("hide");
    outro.classList.remove("hide");
}

var reset = function() {
    outro.classList.add("hide");
    intro.classList.remove("hide");
}

var generateQuestion = function() {}

var answerQuestion = function() {}
var quizGame = function() {}

var saveScore = function() {}

startBtn.addEventListener("click", startGame);
noThanksBtn.addEventListener("click", reset);
choiceBtn.addEventListener("click", answerQuestion);

//Pseudocode entire game function

/* when a player clicks begin, the intro block disappears and the quizzer appears.
Reset score.
Timer starts while quizzer generates random questions from an array of question objects.
User clicks a choice button for answer. (event listener needed)
If answer to the question is true when object is clicked:
    -add "correct" class to clicked button
    -reveal a message of "Correct" for 1 second
    -add 3 second to timer
    -increment score
If answer to the question is false when object is clicked:
    -add "wrong" class to clicked button
    -reveal a message of "Nope" for 1 second
    -subtract 4 seconds from timer (timer.value - 4?)
Reveal new question from question array

After Timer gets to zero
    -hide quizzer
    -reveal closing message, including a score
    -button for Go again! -startGame()
    -button for no thanks -hide outro reveal intro. */