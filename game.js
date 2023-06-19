const buttonColors = ["red", "blue", "green","yellow"];
const buttonSounds = ["sounds/red.mp3", "sounds/blue.mp3", "sounds/green.mp3", "sounds/yellow.mp3"];
const wrongSound = "sounds/wrong.mp3";
let colorSequence = [];
let userSequence = [];
let level = 0;
let pressed = 0;
let levelTitle = $("#level-title");

function nextSequence(){
    //get rnd num 0-3
     return Math.floor(Math.random()*4);
}

function startGame(){

$(".btn").on("click",(function(){

    console.log("in startgame")

    console.log(userSequence);
    console.log(colorSequence);
    console.log(level);
    console.log(pressed);

    let pressedButton = $(this);
    //get id of pressed button
    let pressedID = pressedButton.attr('id');
    //add that color to the sequence
    userSequence.push(pressedID);

    //display that it has been pressed
    pressedButton.addClass("pressed");
    setTimeout(function(){
        pressedButton.removeClass("pressed");
    },100)

    console.log("userseq "+userSequence);

    //check if correct color chosen
    checkGuess(pressed);
    pressed++;


    //if enough buttons pressed 
    if (pressed==level){
        //reset pressed and userSequence
        pressed=0;
        userSequence=[];
        //display next colour in the sequence
        setTimeout(playGame,200);
    }

}));
}

function playGame(){
    $("html").off("keypress");
    let randomColour = nextSequence();
    let buttonID = '#' + buttonColors[randomColour];
    colorSequence.push(buttonColors[randomColour]);
    //make the button flash
    $(buttonID).fadeOut(100).fadeIn(100);

    let sound = new Audio(buttonSounds[randomColour]);
    sound.play();
    
    //next level
    level++;
    levelTitle.html("Level "+level);
    console.log(colorSequence);

}

function checkGuess(index){
    if(userSequence[index]!=colorSequence[index]){
        endGame();
    }
}

function endGame(){
    $(".btn").off("click");
    let sound = new Audio(wrongSound);
    sound.play();
    level=0;
    pressed=0;
    userSequence=[];
    colorSequence=[];
    levelTitle.html("You lost. Press any key to restart");
    $("html").on("keypress",(function(){
        playGame(); 
        pressed = 0; 
        startGame();

    }));
}


$("html").on("keypress",(function(){
    playGame();
    startGame();
}));


