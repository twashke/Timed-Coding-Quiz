// Element Variables
var highScoreEl = document.querySelector(".high-score");
var timeEl = document.querySelector(".time");
var gameEL = document.querySelector(".game");
var startBtn = document.querySelector(".game-start");
var gameQuestionEl = document.querySelector(".game-question");
var gameChoicesEl = document.querySelector(".game-choices");
var choiceA = document.querySelector(".a");
var choiceB = document.querySelector(".b");
var choiceC = document.querySelector(".c");
var choiceD = document.querySelector(".d");
var gameAnswerEl = document.querySelector(".game-answer");

//  Global variables declared
var currentQuestion = null;
var gameTimer;
var answeredCorrect = 0;
var answeredIncorrect =0 ;
var userScore;

// Variable questions for Quiz
var questions = [
    {
        question: "What function removes white space from both ends of a string?",
        choices: [".replace()", ".charAt()", ".trim()", ".length()"],
        answer: 2
    },
    {
        question: "To add Javascript statements to an HTML document, it must be added in between what tags?",
        choices: ["body", "header", "footer", "script"],
        answer: 3
    },
    {
        question: "What is a helpful tool for debugging code?",
        choices: ["return value", "console.log", ".replace()", "captureEvents(eventType)"],
        answer: 1
    },
    {
        question: "What kind of statement is used to test for a specific condition?",
        choices: ["if", "switch", "for", "while"],
        answer: 0
    },
    {
        question: "Which function removes the last element from an array and returns that element?",
        choices: ["push()", "pop()"  , "join()", "map()"],
        answer: 1
    },
    {
        question: "Which of the following IS NOT a Boolean logical operator?",
        choices: [" && ", " || ", " === ", " ! "],
        answer: 2
    },
];

// Time Variable
var secondsLeft = 60;

// Event listener
startBtn.addEventListener("click", rulesofGame);

// Function to display start of game
function rulesofGame() {
    // Give user window confirm with rules
    var gameRules = confirm("GAME RULES!\nAnswer each question\nIf wrong answer is chosen, you lose 10 seconds.\nYOU LOSE:\nIf the time runs out before answering all of the questions,\nor if you answer none of the questions correctly!\nIf you win, enter your intials to the high score list at the end!\nGood luck!");
    // If no answer
        if (!gameRules) {
            //  Stop the game timer
            clearInterval(gameTimer);
        // If user answers to alert
        } else {
            // Start the game
            startTime()
        }
};

// Function to start timer when start button is clicked and alert is answered
function startTime() {
    // Set currentQuestion to first question
    currentQuestion = 0;
    // Set seconds to 60
    secondsLeft = 60;
    // Timer function and how to handle when time runs out
    gameTimer = setInterval(function() {
        // text will show next to seconds as they count down
        timeEl.textContent = secondsLeft + " seconds left!";
        // seconds left will count down
        secondsLeft--;
        // When the clock reaches 0
        if (secondsLeft <= 0) {
            // stop the clock
            clearInterval(gameTimer);
            // add text that time is up
            timeEl.textContent = "Time is up, game is over!";
            // Reset Questions and Choices to empty
            gameQuestionEl.innerHTML = "";
            gameChoicesEl.innerHTML = "";
            // Alert for user to try again
            alert("You ran out of time, no high score to record.  Click Start Game to try again!");
            location.reload();
        }
    }, 1000);
// Make start button disappear
startBtn.innerHTML = "";
// Run displayQuestions function
displayQuestions();
};

// Function to display questions
function displayQuestions() {
    // Show questions starting with question one
    var displayedQuestion = gameQuestionEl.innerHTML = questions[currentQuestion].question;
    // Console log displayed question
    console.log("Displayed question: ", displayedQuestion);
    // Display each answer choice for user to select from
    choiceA.innerHTML = questions[currentQuestion].choices[0];
    choiceB.innerHTML = questions[currentQuestion].choices[1];
    choiceC.innerHTML = questions[currentQuestion].choices[2];
    choiceD.innerHTML = questions[currentQuestion].choices[3];
};

// Event listener for handleAnswerPress function
gameChoicesEl.addEventListener("click", handleAnswerPress);

// Function to handle user's answer
function handleAnswerPress(event) {
    // Console log the event target id to determine which answer the user chose
    console.log(event.target.id);
    // Turn the event target id into a number (from a string) and compare to answer
    var isCorrect = parseInt(event.target.id, 10) === questions[currentQuestion].answer;
    // Console log the user's answer
    console.log("Answer is: ", isCorrect);
    // If the user's answer is wrong
    if (!isCorrect) {
        // Subtract one point to answeredCorrect variable
        answeredIncorrect++;
        // Console log answer
        console.log("Tally incorrect: ", answeredIncorrect);
        // Send user message that the answer is  wrong
        gameAnswerEl.innerHTML = "Incorrect!";
        // Deduct 10 seconds from the time clock 
        secondsLeft -= 10;
        // console log the user's answer
        console.log("User is ", gameAnswerEl);
    //  If the user's answer is right
    } else {
        // Add one point to answeredCorrect variable
        answeredCorrect++;
        // Console log answer
        console.log("Tally correct: ", answeredCorrect);
        // console log the user's answer
        console.log("Answer is: ", gameAnswerEl);
    }
    // Move on to the next question
    currentQuestion += 1;
    // Remove the user answer message that is displayed
    setTimeout(function() {
        // Set the user answer message to empty
        gameAnswerEl.innerHTML = "";
    //  After a half of a second
    }, 500)
        // If there is another question to display
        if (questions[currentQuestion]) {
            // Display the next question
            displayQuestions();
        // If there is no more questions
        } else {
            //  Stop the game timer
            clearInterval(gameTimer);
            // Set all questions and choices to empty
            gameQuestionEl.innerHTML = "";
            gameChoicesEl.innerHTML = "";
            choiceA.innerHTML = "";
            choiceB.innerHTML = "";
            choiceC.innerHTML = "";
            choiceD.innerHTML = "";
            //  Add User Score from correct or wrong questions
            userScore = secondsLeft + answeredCorrect - answeredIncorrect;
                if (userScore <= 0 || answeredCorrect === 0) {
                // Alert for user to try again
                alert("Your score was 0 so there is no high score to record.\nClick Start Game to try again!");
                location.reload();
                } else {
                // Send alert to user
                alert("Your score is " + userScore + "\nYou got " + answeredCorrect + " right out of 6!\n Check out your high score in the top left corner!");
                enterInitials();
                location.reload();
                }
    }
};

// Enter intials function
function enterInitials() {
    // Give user a prompt to enter there high score
    var userIntials = prompt("High Score! Enter your initials");
        // If the user doesn't enter intials
        if (!userIntials) {
            // Stop function, don't enter high scores
            return;
        }
    // Get the high score from local storage
    var highscores = JSON.parse(localStorage.getItem("high scores"));
    // Console log the high scores
    console.log(highscores);
        // If the high score is not an array
        if (!Array.isArray(highscores)) {
            // Set the high score
            localStorage.setItem("high scores",JSON.stringify([{initial: userIntials, score: secondsLeft}]));
        // If there are high scores previously entered
        } else {
            // Push the high scores into a new array
            highscores.push({initial: userIntials, score: secondsLeft});
            // Set high scores and turn into string
            localStorage.setItem("high scores", JSON.stringify(highscores));
        }
};