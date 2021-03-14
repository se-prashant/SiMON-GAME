var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = "false";
var level = 0;



$(document).keypress(function(){
  if(gameStarted==="false"){
    gameStarted = "true";
    nextSequence();
  }
});
$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    //console.log("succcess");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    playSound("wrong");
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    //console.log("wrong");
    startOver();
  }
}
function startOver(){
    level = 0;
    gameStarted  = "false";
    gamePattern = [];
}
function nextSequence(){
 $("h1").text("Level "+ level);
 userClickedPattern = [];
 var randomNumber = Math.random()*4;

 randomNumber = Math.floor(randomNumber);

 var randomChosenColour = buttonColours[randomNumber];

 gamePattern.push(randomChosenColour);

 $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
 level+=1;


}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
