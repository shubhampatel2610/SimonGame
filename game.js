var buttonColors = ["red", "blue", "green", "yellow"]; // buttonColors array

var gamePattern = []; // gamePattern array

var userClickedPattern = [] // userClickedPattern array

var isStarted = false; // keep track of game started or not

var level = 0; // level track

$(document).keydown(function () {
    if (!isStarted) {
        $("#level-title").text("Level  " + level); // updating level on title
        nextSequence(); // function call for next sequence
        isStarted = true;
    }
});

$(".btn").click(function () { // check if button is pressed or not
    var userChosenColor = $(this).attr("id"); // get the id of pressed button
    userClickedPattern.push(userChosenColor); // store id of pressed button in userClickedPattern array
    playSound(userChosenColor); // audio play for user chosen color
    animatePress(userChosenColor); // animation

    checkAnswer(userClickedPattern.length - 1); // passing last index
});

function nextSequence() {

    userClickedPattern = [];

    level++; // increasing level

    $("#level-title").text("Level  " + level); // updating level on title

    var randomNumber = Math.floor(Math.random() * 4); // generate random number between 0 and 3
    var randomChosenColor = buttonColors[randomNumber]; // choosing random colors from buttonColors array
    gamePattern.push(randomChosenColor); // pushing random color to gamePattern array

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // animation for buttons
    playSound(randomChosenColor); // audio play for random chosen color
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); // audio play
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); // add press class to the button when it is pressed
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed"); // remove pressed class after sometime
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // check if user sequence is right or not

        if (gamePattern.length === userClickedPattern.length) { // if user has finished sequence then call nextSequence() for new sequence
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
        console.log("right");
    } else {
        console.log("wrong");

        playSound("wrong"); // audio play

        $("body").addClass("game-over"); // changing color of body when game over 
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart"); // game over title message

        startOver(); // call this function to start new game
    }
}

function startOver() { // reset values of level, isStarted, gamePattern for new game
    level = 0;
    isStarted = false;
    gamePattern = [];
}