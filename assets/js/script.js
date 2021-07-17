// DOM element variables
var intro = document.getElementById('intro');
var quizzer = document.getElementById('quizzer');
var questionEl = document.getElementById('question');
var choicesEl = document.getElementById('choices');
var outro = document.getElementById('outro');
var startBtn = document.getElementById('start-btn');
var restartBtn = document.getElementById('restart-btn');
var startAgainBtn = document.getElementById('start-again-btn')
var timer = document.getElementById('timer');
var highscore = document.getElementById('highscore');
var noThanksBtn = document.getElementById('no-thanks-btn');
var goBackBtn = document.getElementById('go-back-btn');
var reveal = document.getElementById('reveal');
var scores = document.getElementById('scores');


// questions array
var questions = [
    {
        question: 'Which built-in method sorts the elements of an array?',
        answers: [
            {text: "changeOrder(order)", correct: false},
            {text: "order()", correct: false},
            {text: "sort()", correct: true},
            {text: "None of these", correct: false}
        ]
    },

    {
        question: 'Which of the following function of Number object returns a string value version of the current number?',
        answers: [
            {text: "toString()", correct: true},
            {text: "toFixed()", correct: false},
            {text: "toLocaleString()", correct: false},
            {text: "toPrecision()", correct: false}
        ]
    },

    {
        question: 'Which method would display a message on the screen for the user (no feedback required)?',
        answers: [
            {text: "window.alert", correct: true},
            {text: "window.confirm", correct: false},
            {text: "window.prompt", correct: false},
            {text: "window.screenMessage", correct: false}
        ]
    },

    {
        question: 'Which is NOT an example of an API?',
        answers: [
            {text: "DOM", correct: false},
            {text: "jQuery", correct: false},
            {text: "Moment.js", correct: false},
            {text: "Chrome", correct: true}
        ]
    },

    {
        question: 'The script tag for JavaScript must be placed _________.',
        answers: [
            {text: "after the body tag", correct: false},
            {text: "in the head tag", correct: false},
            {text: "in the head or body", correct: true},
            {text: "in the title or head", correct: false}
        ]
    },

    {
        question: 'What will happen if a return statement does not have an associated expression?',
        answers: [
            {text: "It will throw an exception", correct: false},
            {text: "It returns the undefined value", correct: true},
            {text: "It will throw an error", correct: false},
            {text: "It returns the value 0", correct: false}
        ]
    },

    {
        question: 'Which is an equivalent code to invoke a function q of class z that expects two arguments x and y?',
        answers: [
            {text: "z.q(x,y);", correct: true},
            {text: "q(x,y);", correct: false},
            {text: "z.q(x) && z.q(y);", correct: false},
            {text: "z(x,y);", correct: false}
        ]
    }
];

// MISC VARIABLES
// holding variables for functions below
let shuffledQuestions, currentQuestionIndex

// holds the score, incremented by correct answers
var score = 0;
var timeLeft = 20;


// BEGIN HIGH SCORE FUNCTIONS
// high score variables
var scoresDisplayLimit = 5;
var scoresObjects = 'highScores';
var highScoreString = localStorage.getItem(scoresObjects);
var highScores = JSON.parse(highScoreString) ?? [];
var lowestScore = highScores[scoresDisplayLimit -1]?.score ?? 0;

// high score functions
var showHighScores = function() {
    intro.classList.add("hide");
    outro.classList.add("hide");
    scores.classList.remove("hide");

    var highScores = JSON.parse(localStorage.getItem(scoresObjects)) ?? [];
    var highScoreList = document.getElementById("highScores");
        
    highScoreList.innerHTML = highScores 
        .map((score) => `<li>${score.score} - ${score.name}`)
        .join('');
};

var checkHighScore = function(score) {
    var highScores = JSON.parse(localStorage.getItem(scoresObjects)) ?? [];
    var lowestScore = highScores[scoresDisplayLimit - 1]?.score ?? 0;

    if (score > lowestScore) {
        saveHighScore(score, highScores);
    }
};

var saveHighScore = function(score, highScores) {
    var name = prompt("Well, look at you... you little high-scorer, you! Put your initials here to record your high score!");
    var newScore = { score, name };

    // add to list
    highScores.push(newScore);
    // sort the list
    highScores.sort((a, b) => b.score - a.score);
    // select new list
    highScores.splice(scoresDisplayLimit);
    // save to local storage
    localStorage.setItem(scoresObjects, JSON.stringify(highScores));
};
// END HIGH SCORE FUNCTIONS

// BEGIN GAMEPLAY FUNCTIONS
var startGame = function() {
    // reset score and start countdown
    score = 0
    timeLeft = 10 
    gameCountdown();

    // show quizzer section
    intro.classList.add("hide");
    outro.classList.add("hide");
    quizzer.classList.remove("hide");
    scores.classList.add("hide");

    // randomize the order of questions and populate quizzer starting with the first question
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    generateQuestion();
}


var gameEnd = function() {
    // show only outro section in the container
    quizzer.classList.add("hide");
    timer.classList.add("hide");
    outro.classList.remove("hide");

    var results = document.getElementById('results');
    results.textContent = ("You finished this round with a score of " + score + ".");
    checkHighScore(score);
}

var gameCountdown = function() {
    // timeLeft variable decrements every 1 second
    timer.classList.remove("hide");
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

var generateQuestion = function() {
    resetQuestion();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

var showQuestion = function(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var choiceBtn = document.createElement('choiceBtn')
        choiceBtn.innerText = answer.text
        choiceBtn.classList.add('choice-btn')
        choiceBtn.dataset.correct = answer.correct
        choicesEl.appendChild(choiceBtn)
    })
}

var resetQuestion = function(){
    while (choicesEl.firstChild) {
        choicesEl.removeChild(choicesEl.firstChild);
    }
    reveal.textContent = "";
}

var delayedAdvanceQuestion = function() {
    setTimeout(function() {
        currentQuestionIndex++;
        if (shuffledQuestions.length > currentQuestionIndex +1) {
            generateQuestion();
        } else {
            gameEnd();
        };
    }, 1000)
}

var rightAnswer = function(selectedButton) {
    selectedButton.classList.add('correct');
    reveal.classList.remove("hide");
    reveal.textContent = "Yep! Good job!";
    score += 5;
    delayedAdvanceQuestion();
}

var wrongAnswer = function(selectedButton) {
    selectedButton.classList.add('wrong');
    reveal.classList.remove("hide");
    reveal.textContent = "Nope!";
    timeLeft= timeLeft - 4;
    delayedAdvanceQuestion();
}

var choiceSelect = function(event) {
    var selectedButton = event.target; 
    console.log(selectedButton.dataset.correct);
    var correct = selectedButton.dataset.correct;
    if (correct == "true") {
        rightAnswer(selectedButton);
    } else {
        wrongAnswer(selectedButton);
    };
}
// END GAMEPLAY FUNCTIONS

// function to go back to the main screen
var reset = function() {
    outro.classList.add("hide");
    intro.classList.remove("hide");
    scores.classList.add("hide");
}

// event listeners
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
startAgainBtn.addEventListener("click", startGame);
noThanksBtn.addEventListener("click", reset);
goBackBtn.addEventListener("click", reset);
choicesEl.addEventListener("click", choiceSelect);
highscore.addEventListener("click", showHighScores);