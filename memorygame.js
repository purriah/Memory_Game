 // Scripted By Adam Khoury in connection with the following video tutorial: http://www.youtube.com/watch?v=c_ohDPWmsM0


var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L','M','M','N','N','O','O','P','P','Q','Q','R','R'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var memory_dictionary;
var vol = 0.01;
var diff = 1;
var correct = 0;
var total = 0;

var x = 0;
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

setInterval(setTime, 1000);

function newBoard(){
  vol = 0.01;
  tiles_flipped = 0;
  var output = '';
    memory_array.memory_tile_shuffle();
  for(var i = 0; i < memory_array.length; i++){
    output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
  }
  document.getElementById('memory_board').innerHTML = output;
  resetCounter();
  resetTime();
  resetAccuracy();
}

function memoryFlipTile(tile,val){
  if(tile.innerHTML == "" && memory_values.length < 2){
    console.log(val);
    tile.style.background = '#FFF';
    var innerHTML = '<img src="' + memory_dictionary[val] + '" style="width:80px;height:80px;"></img>';
    console.log(innerHTML);
    tile.innerHTML = innerHTML;
    if(memory_values.length == 0){
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
    } else if(memory_values.length == 1){
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
      if(memory_values[0] == memory_values[1]){
        correctChoiceAudio();
        accuracyCounter(1);
        x = x + 1;
        setCounter(x);
        tiles_flipped += 2;
        // Clear both arrays
        memory_values = [];
        memory_tile_ids = [];
        // Check to see if the whole board is cleared
        if(tiles_flipped == memory_array.length){
          winningAudio();
          winMessage();
          document.getElementById('memory_board').innerHTML = "";
          currentDifficulty();
        }
      } else {
        function flip2Back(){
            wrongChoiceAudio();
            accuracyCounter(0);
            // Flip the 2 tiles back over
            var tile_1 = document.getElementById(memory_tile_ids[0]);
            var tile_2 = document.getElementById(memory_tile_ids[1]);
            tile_1.style.background = "#000";
                  tile_1.innerHTML = "";
            tile_2.style.background = "#000"
                  tile_2.innerHTML = "";
            // Clear both arrays
            memory_values = [];
                  memory_tile_ids = [];
        }
        setTimeout(flip2Back, 700);
      }
    }
  }
}



function setCounter(x){
    var finishedLabel = document.getElementById("finished");
    finishedLabel.innerHTML = x;
}

function resetCounter(){
    var finishedLabel = document.getElementById("finished");
    finishedLabel.innerHTML = 0;
}

function setTime(){
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function resetTime(){
    totalSeconds = 0;
    secondsLabel.innerHTML = 0;
    minutesLabel.innerHTML = 0;
}

function accuracyCounter(x){
    ++total;
    correct += x;
    var accuracyLabel = document.getElementById("accuracy");
    accuracyLabel.innerHTML = (~~((correct/total) * 100));
}

function resetAccuracy(){
    correct = 0;
    total = 0;
    var accuracyLabel = document.getElementById("accuracy");
    accuracyLabel.innerHTML = 0;
}

function pad(val){
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}

function easyDifficulty()
{
    diff = 0;
    memory_dictionary = {
                            'A': 'easy/1.jpg',
                            'B': 'easy/2.jpg',
                            'C': 'easy/3.jpg',
                            'D': 'easy/4.jpg',
                            'E': 'easy/5.jpg',
                            'F': 'easy/6.jpg',
                            'G': 'easy/7.jpg',
                            'H': 'easy/8.jpg',
                            'I': 'easy/9.jpg',
                            'J': 'easy/10.jpg',
                            'K': 'easy/11.jpg',
                            'L': 'easy/12.jpg',
                            'M': 'easy/13.jpg',
                            'N': 'easy/14.jpg',
                            'O': 'easy/15.jpg',
                            'P': 'easy/16.jpg',
                            'Q': 'easy/17.jpg',
                            'R': 'easy/18.jpg'
                        };
    newBoard();
}

function normalDifficulty()
{
    diff = 1;
    memory_dictionary = {
                            'A': 'normal/1.jpg',
                            'B': 'normal/2.jpg',
                            'C': 'normal/3.jpg',
                            'D': 'normal/4.jpg',
                            'E': 'normal/5.jpg',
                            'F': 'normal/6.jpg',
                            'G': 'normal/7.jpg',
                            'H': 'normal/8.jpg',
                            'I': 'normal/9.jpg',
                            'J': 'normal/10.jpg',
                            'K': 'normal/11.jpg',
                            'L': 'normal/12.jpg',
                            'M': 'normal/13.jpg',
                            'N': 'normal/14.jpg',
                            'O': 'normal/15.jpg',
                            'P': 'normal/16.jpg',
                            'Q': 'normal/17.jpg',
                            'R': 'normal/18.jpg'
                        };
    newBoard();
}


function hardDifficulty()
{
    diff = 2;
    memory_dictionary = {
                            'A': 'hard/1.jpeg',
                            'B': 'hard/2.jpeg',
                            'C': 'hard/3.jpeg',
                            'D': 'hard/4.jpeg',
                            'E': 'hard/5.jpeg',
                            'F': 'hard/6.jpeg',
                            'G': 'hard/7.jpeg',
                            'H': 'hard/8.jpeg',
                            'I': 'hard/9.jpeg',
                            'J': 'hard/10.jpeg',
                            'K': 'hard/11.jpeg',
                            'L': 'hard/12.jpeg',
                            'M': 'hard/13.jpeg',
                            'N': 'hard/14.jpeg',
                            'O': 'hard/15.jpeg',
                            'P': 'hard/16.jpeg',
                            'Q': 'hard/17.jpeg',
                            'R': 'hard/18.jpeg'
                        };
    newBoard();
}

function currentDifficulty()
{
    if (2 == diff)
    {
      hardDifficulty();
    }
    else if (1 == diff)
    {
      normalDifficulty();
    }
    else{
      easyDifficulty();
    }
}

function wrongChoiceAudio() {
    var catMeow = new Audio();
    catMeow.src = "audio/cat.mp3";
    increaseVolume();
    catMeow.volume = vol;
    catMeow.play(); // Play button sound now
}

function correctChoiceAudio(){
    var kittenMeow = new Audio();
    kittenMeow.src = "audio/kitten.mp3";
    kittenMeow.volume = vol;
    kittenMeow.play();
    decreaseVolume();

}

function winningAudio(){
    var meowMeow = new Audio();
    meowMeow.src = "audio/meow.mp3";
    meowMeow.volume = 0.5;
    meowMeow.play();
}

function increaseVolume(){
  if (vol < 1.00) {
      vol += 0.01;
  }
}

function decreaseVolume(){
  if (vol > 0.10) {
      vol -= 0.10;
  }
  else if (vol > 0.05) {
      vol -= 0.05;
  }
  else if (vol > 0.01) {
      vol -= 0.01;
  }
}

function winMessage()
{
  var finalAcc = (~~((correct/total) * 100));
  var finalSec = pad(totalSeconds%60);
  var finalMin = pad(parseInt(totalSeconds/60));
  if (finalMin == 1){
      alert("MEOW! Completed in " + finalMin + " minute and " + finalSec + " seconds and with an accuracy of " + finalAcc + "%");
  }
  else{
      alert("MEOW! Completed in " + finalMin + " minutes and " + finalSec + " seconds and with an accuracy of " + finalAcc + "%");
  }
}