var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var keyPressed = false;
var level = 1;
var correct = 0;
var wrong = false;
var score = 0;
var maxScore = 0;

function nextSequence() {
    if(!keyPressed){
        keyPressed = true;
        gamePattern =  [];
        var randomChosenColor = Math.floor((Math.random() * 4));
        gamePattern.push(buttonColors[randomChosenColor]);
        $("h1").text("Level 1");
        setTimeout(()=>{
            blinkButton(0);
        },800);
    }
    else{
        level ++;
        var count = 0;
        $("h1").text("Level " + level);
        for(var i=0; i<level; i++){
            var randomChosenColor = Math.floor((Math.random() * 4));
            gamePattern[i]= buttonColors[randomChosenColor];
        }

        setTimeout(()=>{
            blinkButton(0);
        }, 800);
        
        // for (var i = 0; i<gamePattern.length; i++){
        //     var buttonBlinked = gamePattern[i]; 
        //     $("#" + buttonBlinked).fadeOut(100).fadeIn(100);            
        // }
        // while(count < gamePattern.length){
        //     var buttonBlinked = gamePattern[count]; 
        //     $("#" + buttonBlinked).fadeOut(100).fadeIn(100);  
        //     setTimeout(() => {
        //         count++
        //     }, 200); 
        // }

        
    }       
    return gamePattern;
}
// console.log(nextSequence())

$(document).keypress(function (e) { 
    if(!keyPressed){
        $("h2").hide();
        nextSequence();
        $(".button").show();
        $("h1").removeClass("gameover");
        console.log(gamePattern)
    }
    console.log(e.key);
});

$(".button").click(function(){
    console.log(this.id +" pressed")
    userPattern.push(this.id);
    $("#"+ this.id).addClass("pressed");
    setTimeout(()=>{
        $("#"+ this.id).removeClass("pressed");
    }, 100);
    chooseSound(this.id);
    consolePrint();
    if(userPattern.length === gamePattern.length){
        nextSequence();
    
        //initial condition
        correct = 0;
        userPattern = [];
    }
    
})

function consolePrint(){
    console.log(gamePattern);
    console.log(userPattern);
}


function chooseSound(buttonBlinked){
    if(buttonBlinked === gamePattern[correct]){
        var audio = new Audio("sounds/"+buttonBlinked+".mp3");
        audio.play();
        correct ++;
        score ++;
        if(score > maxScore){
            maxScore = score;
        }
    }
    else{
        new Audio("sounds/wrong.mp3").play();

        //Game Over
        gameOver();        
    }
} 

function gameOver(){
    $(".button").hide();
    $("h1").text("Game Over").addClass("gameover");
    $("h2").text("Your Score: "+ score).show();
    userPattern = [];
    // gamePattern = [];
    level = 1;
    correct = 0;
    score = 0;
    keyPressed = false;
}

function blinkButton(index){
    if(index < gamePattern.length){
        var buttonBlinked = gamePattern[index];
        $("#"+buttonBlinked).fadeOut(100).fadeIn(200, function() {
            blinkButton(index + 1);
        });
    }
}

