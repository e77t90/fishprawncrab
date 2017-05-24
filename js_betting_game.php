
<html>

  <head>
    <script src="js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="betting_game.css">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  </head>

  <body>

  <script>




  </script>
  <h2> 魚蝦蟹 </h2>

  <h2>Cash Balance: $<span id="balance"></span></h2>
  <form>
    <label for="bet">Bet: </label>
    <input id="bet" name="bet" type="text" placeholder="What's your wager?" />
      <br>
    <label for="guess">Guess: </label>
    <input id="guess" name="guess" type="text" placeholder="Guess...(number 1..6)" />
      <br>
    <label for="guessForTwo">Guess for two numbers (A): </label>
    <input id="guessForTwoA" name="guessForTwo" type="text" placeholder="Guess for two numbers (A)...(number 1..6)" />
      <br>
    <label for="guessForTwoB">Guess for two numbers (B): </label>
    <input id="guessForTwoB" name="guessForTwo" type="text" placeholder="Guess for two numbers (B)...(number 1..6)" />
      <br>
    <p>
      (1) The hashed server key of this game is:
    </p>
    <p id="hashed_this_game">
      <?php
        $text = "";
        $possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( $i=0; $i < 9; $i++ ){
          $text = $text . $possible[rand(0,strlen($possible)-1)];
          //$text += $possible.charAt(Math.floor(Math.random() * strlen($possible)));
        }
        echo hash('sha512', $text); 
      ?>
    </p>
    <label for="clientSeed">Input for client key: </label>
    <input id="clientSeed" name="clientSeed" type="text" placeholder="input text for client key" />
      <br>
      <br>
    <div>(2) The unhashed server key of this game is </div>
    <p id="unhashed_this_game">
      <?php
      echo $text;
      ?>
    </p>
      <br>
    <div id="hashed_last_game">(3) The hashed server key of last game is:</div>
    <div id="unhashed_last_game">(4) The unhashed server key of last game is:</div>
      <br>
    <div>
      <p>you can verify the server key at these website:
      </p>
      <ul>
        <li> <a href="http://www.freeformatter.com/hmac-generator.html#ad-output" target="_blank">http://www.freeformatter.com/hmac-generator.html#ad-output</a> </li>
        <li> <a href="https://caligatio.github.io/jsSHA" target="_blank">https://caligatio.github.io/jsSHA</a> </li>
        <li> <a href="https://https://1024tools.com/hmac" target="_blank">https://1024tools.com/hmac</a></li>
      </ul>
    </div>
    <input type="button" id="submit" name="submit" value="Submit"/>
  </form>

  <script type="text/javascript" src="cryptojs/rollups/hmac-sha512.js"></script>
  <script type="text/javascript" src="js_betting_game.js"></script>
  <!--<script type="text/javascript" src="js_provably_fair.js"></script>-->



  </body>

</html>


