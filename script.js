// intro section
var introEl = document.getElementById("intro");

//question section
var questionsEl = document.getElementById("questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;
var rightwrongEl = document.getElementById("rightwrong");

// final section
var finalEl = document.getElementById("final");
let initialsInput = document.querySelector("#initials");

// highscores section
var highscoresEl = document.getElementById("highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];

// buttons
var startBtn = document.getElementById("start");
var ansBtn = document.getElementsByClassName("ansBtn")
var ans1Btn = document.getElementById("answer1");
var ans2Btn = document.getElementById("answer2");
var ans3Btn = document.getElementById("answer3");
var ans4Btn = document.getElementById("answer4");
var submitScrBtn = document.getElementById("submit-score");
var goBackBtn = document.getElementsByClassName("goback");
var clearScrBtn = document.getElementById("clearscores");
var viewScrBtn = document.getElementById("view-scores");


// time and score
let timeEl = document.querySelector("p.time");
let timeleft = 60;
let scoreEl = document.querySelector("#score");
displayScores();

// Questions and answers
var Quizquestions = [
    {
        question: "Choose the correct HTML element for the largest heading",
        answers: ["<h1>", "<heading>", "large", "h6"],
        correctAnswer: "0"
    },
    {
        question: "Which is the correct CSS syntax?",
        answers: ["body: color = black;", "{body: color = black;}", "body {color: black;}", "{body; color: black;}"],
        correctAnswer: "2"
    },
    {
        question: "How do you insert a comment in a CSS file?",
        answers: ["'this is a comment'", "this is a comment", "this is a comment//", "/*this is a comment*/"],
        correctAnswer: "3"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["<javascript>", "<js>", "<scripting>", "<script>"],
        correctAnswer: "3"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: ["function: myFunction()", "function = myFunction()", "function myFunction()", "function #myFunction()"],
        correctAnswer: "2"
    },
    {
        question: "The Bootstrap grid system is based on how many columns?",
        answers: ["12", "3", "6", "9"],
        correctAnswer: "0"
    }
];


// timer function
function setTime() {
    let timerInterval = setInterval(function () {
        timeleft--;
        timeEl.textContent = `Time:${timeleft}s`;

        if (timeleft === 0 || questionCount === Quizquestions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = timeleft;
        }
    }, 1000);
}

// Start timer and display first question
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    highscoresEl.style.display = "none";
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// Set question
function setQuestion(id) {
    if (id < Quizquestions.length) {
        questionEl.textContent = Quizquestions[id].question;
        ans1Btn.textContent = Quizquestions[id].answers[0];
        ans1Btn.value = "0"
        ans2Btn.textContent = Quizquestions[id].answers[1];
        ans2Btn.value = "1"
        ans3Btn.textContent = Quizquestions[id].answers[2];
        ans3Btn.value = "2"
        ans4Btn.textContent = Quizquestions[id].answers[3];
        ans4Btn.value = "3"
    }
}

// Check answers
for(var i = 0; i < ansBtn.length; i++){
    ansBtn[i].addEventListener("click",checkAnswer);
  }

function checkAnswer(event) {
    event.preventDefault();

    rightwrongEl.style.display = "block";
    let p = document.createElement("p");
    rightwrongEl.appendChild(p);

    setTimeout(function () {
        p.style.display = "none";
    }, 1000);

    if (Quizquestions[questionCount].correctAnswer === event.target.value) {
        timeleft = timeleft + 5;
        p.textContent = "Correct!";
    } else if (Quizquestions[questionCount].correctAnswer !== event.target.value) {
        timeleft = timeleft - 10;
        p.textContent = "Wrong!";
    }

    if (questionCount < Quizquestions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

// add score
function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: timeleft });

    // sort scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });

    scoreListEl.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // store score
    storeScores();
}

// Add score to local storage
submitScrBtn.addEventListener("click", addScore);

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Get stored scores from localStorage and using Parsing the JSON string to an object
    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
clearScrBtn.addEventListener("click", clearScores);
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML = "";
}

// Go Back Button
for (var i=0; i<goBackBtn.length; i++){
    goBackBtn[i].addEventListener("click", function () {
        highscoresEl.style.display = "none";
        questionsEl.style.display = "none";
        introEl.style.display = "block";
        timeleft = 60;
        timeEl.textContent = `Time:${timeleft}s`;
    });
}


// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    if(scoreList.length === 0){
        alert("No scores to show.");
    }

    scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
        return 1;
    } else {
        return -1;
    }
    });

    scoreListEl.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li); 
    }

    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    }
});