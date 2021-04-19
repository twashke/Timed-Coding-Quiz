// Element Variables
var clearScoresBtn = document.querySelector("#clear-scores");

clearScoresBtn.addEventListener("click", clearScores);

// Function to get and display High Scores
function getHighScores() {
    //  Parse from local storage
    var highScores = JSON.parse(localStorage.getItem("high scores"));
    // Console log the high scores
    console.log(highScores);
        // Declare an empty variable for the user's high score
        var userHighScores = "";
        // Sort high scores by score
        highScores.sort((a, b) => {
            // If the first score is less than the second
            if (a.score < b.score) {
                // Move the score up 
                return 1;
            }
            // If the first score is more than the second
            if (a.score > b.score) {
                // Move the score down
                return -1;
            }
            return 0;
        });
        // Use a loop to retrieve the high scores
        for (var i = 0; i < highScores.length; i++) {
            // Declare the current score variable 
            var currentScore = highScores[i];
            // add the initals and score from current score to userHighScores in an ordered list
            userHighScores = userHighScores.concat("<li> Initials: " + currentScore.initial + " " + " " + "High Score: " + currentScore.score + "</li>");
            // Console log the current score
            console.log("current score ", currentScore);
        }
    // Console lof the 
    console.log("User High Score: ", userHighScores);
    //  Display high scores
    document.querySelector(".record-highscore").innerHTML = userHighScores;
}
// Load using the get high scores function
window.onload = getHighScores;

clearScoresBtn.addEventListener("click", clearScores);

function goBack() {
    window.history.back();
}

function clearScores() {
    localStorage.clear();
    location.reload();
}