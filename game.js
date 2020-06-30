var allColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var isStarted = false;
var level = 0;

function nextInSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = allColors[randomNumber];
  gamePattern.push(randomColor);
  animateOnPress(randomColor);
  var randomAudio = new Audio(`sounds/${randomColor}.mp3`);
  randomAudio.play();
  level++;
  $("#level-title").text(`Level ${level}`);
  userPattern = [];
}

$(".btn").click(function () {
  if (isStarted) {
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    var randomAudio = new Audio(`sounds/${userChosenColor}.mp3`);
    randomAudio.play();
    animateOnPress(userChosenColor);
    checkAnswer();
  }
});

function animateOnPress(color) {
  $(`#${color}`).addClass("pressed");
  setTimeout(function () {
    $(`#${color}`).removeClass("pressed");
  }, 50);
}

$(document).on("keydown", function () {
  if (!isStarted) {
    nextInSequence();
    isStarted = true;
  }
});

function checkAnswer() {
  if (
    userPattern[userPattern.length - 1] == gamePattern[userPattern.length - 1]
  ) {
    console.log("correct");
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over. Press Any Key to Restart!");
    gamePattern = [];
    isStarted = false;
    level = 0;
  }
  if (
    userPattern.length == gamePattern.length &&
    userPattern[userPattern.length - 1] == gamePattern[userPattern.length - 1]
  ) {
    setTimeout(nextInSequence, 1000);
  }
}
