$(document).ready(function(){
  init();
});

$(document).ready(function(){
  update_bank();
})


//update function
function update_bank(){
  context.fillStyle = "white";
  context.fillRect(height*3/4, 0, height/4, height/6);
  context.fillStyle = "black";
  context.font = "8vh Arial";
  context.fillText("$" + game.bank, height*3/4 + height/16, height/6 - height/45); 
};

function update_dice(){
  context.fillStyle = "white";
  context.fillRect(height/4, 0, height/2, height/6);
  for (var i=0; i<3; i++) {
    switch (game.randNumber[i]) {
      case 1:
        diceArray[i].src = 'img/b1.png'
        break;
      case 2:
        diceArray[i].src = 'img/b2.png'
        break;
      case 3:
        diceArray[i].src = 'img/b3.png'
        break;
      case 4:
        diceArray[i].src = 'img/b4.png'
        break;
      case 5:
        diceArray[i].src = 'img/b5.png'
        break;
      case 6:
        diceArray[i].src = 'img/b6.png'
        break;
      default:
        break;
    }
  }
}

function refreshCanvas() {
  context.fillStyle = "white";
  context.fillRect(0, height/6, height, height*5/6);
  make_base();
}

/*

$(document).ready(function(){
  requestServerKey();
  $('#submit').on('click', gameStart);
  $('#submit').on('click', requestServerKey);
});

*/

var response = {};
response.result = [];
var input_numberGuess = [];

var game = {
  //bet: null,
  bank: 100,
  randNumber: [],
  numberGuess: [],
  //numberGuessForTwo: [],

  /*
  getBetAmount: function() {
    return this.bet = input_bet;
  },*/
  getRandomNumber: function(input, server_seed) {
    return this.randNumber = genRandNumber(input, server_seed);
  },
  getNumberGuess: function() {
    return this.numberGuess = input_numberGuess;
  },

};

function gameStart() {

  var input = null;
  if($('#clientSeed').val() === ""){
    input = makeRandomText();
    $('#clientSeed').val(input); 
  }
  else{
    input = $('#clientSeed').val();
  }
  console.log(input);
  
  var server_seed = $("#unhashed_this_game").text();
  console.log("server seed:" + server_seed );

  //game.getBetAmount();
  game.getRandomNumber(input, server_seed);
  game.getNumberGuess();

  console.log("randNum:" + game.randNumber);
  //update the dice canvas
  update_dice();
  

  if(false) {
    //alert("Bet amount cannot be larger than your bank!")
    //game.getBetAmount();
  }else{
    //bet for guess for one number
    //game.bank -= game.bet;
    //bet for guess for two number
    //game.bank -= game.bet;
    //update_bank();

    //handle guess for one numbers

    var count = 0;
    for (var i=0; i<3; i++)
    {
      if(game.randNumber[i] === game.numberGuess[0].number)
      {
        count++;
      }
    }

    if(count === 1) {
      alert("You got it! you won || 1x Price || of $" + (game.numberGuess[0].bet * 1) + " !" );
      game.bank = game.bank + game.numberGuess[0].bet + (game.numberGuess[0].bet * 1);
      console.log(game.bank);
      update_bank();
    }else if(count === 2) {
      alert("You got it! you won || 2x Price || of $" + (game.numberGuess[0].bet * 2) + " !" );
      game.bank = game.bank + game.numberGuess[0].bet + (game.numberGuess[0].bet * 2);
      console.log(game.bank);
      update_bank();
    }else if(count === 3) {
      alert("You got it! you won || 3x price || of $" + (game.numberGuess[0].bet * 3) + " !" );
      game.bank = game.bank + game.numberGuess[0].bet + (game.numberGuess[0].bet * 3);
      console.log(game.bank);
      update_bank();
    }else{
      alert("Sorry you lost!");
      console.log(game.bank);
      update_bank();
    };



    //handle guess for two numbers
    /*
    var count1 = 0;
    var count2 = 0;
    for (var i=0; i<3; i++)
    {
      if(game.randNumber[i] === game.numberGuessForTwo[0])
      {
        count1++;
      }    
      if(game.randNumber[i] === game.numberGuessForTwo[1])
      {
        count2++;
      }    
    }

    if(count1 === 1 && count2 === 1) {
      alert("You got two numbers correct! you won || 5x Price || of $" + (game.bet * 5) + " !" );
      game.bank = game.bank + game.bet + (game.bet * 5);
      console.log(game.bank);
      update_bank();
    }else if((count1 === 1 && count2 === 2) || (count1 === 2 && count2 === 1)) {
      alert("You got it two numbers correct with one double! you won || 7x price || of $" + (game.bet * 7) + " !" );
      game.bank = game.bank + game.bet + (game.bet * 7);
      console.log(game.bank);
      update_bank();
    }else{
      alert("Sorry you lost!");
      console.log(game.bank);
      update_bank();
    };
    */

    //changing content of hashed server key of last game
    $("#hashed_last_game").text($("#hashed_this_game").text());
    //changing content of unhashed server key of last game
    $("#unhashed_last_game").text($("#unhashed_this_game").text());

    //refresh the canvas
    refreshCanvas();



  };
};


//Event functions:

//@return return array of random 3 numbers from user input and server seed
function genRandNumber(input, server_seed) {
  var returnArray = [];
  for (var nonce = 0; nonce < 3; nonce++)
  {
    var client_seed = input + "-" + nonce;

    //for rolling random number from 1~6
    var roll = CryptoJS.HmacSHA512(client_seed, server_seed).toString();

    var start = 0;
    var result = Math.pow(6, 6);
    while(result > Math.pow(6, 6)-1) {
      result = parseInt(roll.substring(start, start + 4), 16);
      start = start + 4;
    }
    result = (result % Math.pow(6, 4)) / Math.pow(6, 3);
    returnArray[nonce] = Math.floor(result + 1);
  }
  return returnArray;
}

function requestServerKey() {

  $.ajax({
    url: 'receive.php',
    type: 'POST',
    data: {action: 0},
    success: function(response) {
      $('#hashed_this_game').text(response.substring(9,response.length));
      $('#unhashed_this_game').text(response.substring(0,9));
    },
    dataType: "text"
  });


}


function makeRandomText()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 9; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

// End of event functions





// mouse coordinate of the screen
var mouseX = 0;
var mouseY = 0;

// button object
function Button(xL, xR, yT, yB) {
  this.xLeft = xL;
  this.xRight = xR;
  this.yTop = yT;
  this.yBottom = yB;
}

Button.prototype.checkClicked = function() {
  if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom) return true;
}

//Create button
var btnPlay = new Button(height*3/4, height, height*5/6, height);

var btn_1 = new Button(0, height/4, height/6, height/2);
var btn_2 = new Button(0, height/4, height/2, height*5/6);
var btn_3 = new Button(height/4, height/2, height/2, height*5/6);
var btn_4 = new Button(height/2, height*3/4, height/2, height*5/6);
var btn_5 = new Button(height*3/4, height, height/2, height*5/6);
var btn_6 = new Button(height*3/4, height, height/6, height/2);
var btn_Array = [btn_1, btn_2, btn_3, btn_4, btn_5, btn_6];

//button action
function addCoin(mouseX, mouseY) {
  switch (currentCoin) {
    case 1:
      betCoin_image.src = 'img/1.png';
      drawBetCoin();
      break;
    case 10:
      betCoin_image.src = 'img/10.png';
      drawBetCoin();
      break;
    case 50:
      betCoin_image.src = 'img/50.png';
      drawBetCoin();
      break;
    case 100:
      betCoin_image.src = 'img/100.png';
      drawBetCoin();
      break;
    case 500:
      betCoin_image.src = 'img/500.png';
      drawBetCoin();
      break;
    case 1000:
      betCoin_image.src = 'img/1000.png';
      drawBetCoin();
      break;
    case 5000:
      betCoin_image.src = 'img/5000.png';
      drawBetCoin();
      break;
  }

}

//button clicked event functions
function mouseClicked(e) {
  mouseX = e.pageX - canvas.offsetLeft;
  mouseY = e.pageY - canvas.offsetTop;
  if (btnPlay.checkClicked()) {playGame()};

  btn_Array.forEach(function(item, index){

    if (item.checkClicked()) {
      if (currentCoin > game.bank) {
        alert("Bet amount cannot be larger than your bank!");
      }else {
        game.bank = game.bank - currentCoin;
        update_bank();
        addCoin(mouseX, mouseY);
        input_numberGuess.push(
          {bet: currentCoin, number: index+1}
        );
        console.log(JSON.stringify(input_numberGuess));
      }
    };

  });
  
}

function playGame() {
  gameStart();
  requestServerKey();
}

function init() {
  requestServerKey();
  document.addEventListener('click', mouseClicked, false);
}




























      // switch game.randNumber;

    //   case (game.numberGuess === game.randNumber);
    //     break;
    //   case (game.)


   //  var bank = 100;
   //  var bet;

   //  function bet_amount() {
   //    bet = parseInt(prompt("How much do you want to wager?"));
   //      if (bet > bank) {
   //        alert("Bet amount cannot be larger than your bank!");
   //        bet_amount();
   //      } else{
   //        bank -= bet;
   //      };
   //      return bet;
   //  };

   //  function random_number(min, max) {
   //    return Math.floor(Math.random()*(max-min+1)+min);
   //  };

   //  function number_guess() {
   //  var guess = parseInt(prompt("What is your guess? (numbers 1 to 10)"));
   //    return guess;
   // };

   //  while(bank > 0) {
   //    bet_amount();
   //    var guess = number_guess();
   //    var ran_num = random_number(1,10);
   //      if (guess === ran_num){
   //        alert("You got it!");
   //        bank += (bet * 2);
   //        alert("You have " + bank + " in your bank");
   //      }else if ((guess +1 || guess -1) === ran_num){
   //        alert("Almost... here's your bet back");
   //        bank += bet;
   //        alert("You have " + bank + " in your bank")
   //      }else{
   //        alert("Sorry you lose!");
   //        alert("You have " + bank + " in your bank")
   //      };
   //  };