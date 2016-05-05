 // Scripted By Adam Khoury in connection with the following video tutorial:
  // http://www.youtube.com/watch?v=c_ohDPWmsM0
var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var memory_dictionary = {
                            'A': '1.jpeg',
                            'B': '2.jpeg',
                            'C': '3.jpeg',
                            'D': '4.jpeg',
                            'E': '5.jpeg',
                            'F': '6.jpeg',
                            'G': '7.jpeg',
                            'H': '8.jpeg',
                            'I': '9.jpeg',
                            'J': '10.jpeg',
                            'K': '11.jpeg',
                            'L': '12.jpeg',
                        };

var x = 0;
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

var bestscore = localStorage.getItem("bestscore");
$('#bestscore').text(bestscore);

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
  tiles_flipped = 0;
  var output = '';
    memory_array.memory_tile_shuffle();
  for(var i = 0; i < memory_array.length; i++){
    output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
  }
  document.getElementById('memory_board').innerHTML = output;
  resetTime();
  resetCounter();
  $("#memory_board").effect( "shake", {times:4}, 1000 );
  $('#title').text("Match The Cats");
}


function memoryFlipTile(tile,val){
  if(tile.innerHTML == "" && memory_values.length < 2){
    console.log(val);
    tile.style.opacity = 0.9;
    tile.style.background = '#FFF';
    var innerHTML = '<img src="' + memory_dictionary[val] + '" style="width:53px;height:53px;"></img>';
    console.log(innerHTML);
    tile.innerHTML = innerHTML;
    if(memory_values.length == 0){
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
    } else if(memory_values.length == 1){
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
      if(memory_values[0] == memory_values[1]){
        x = x + 1;
        setCounter(x);
        tiles_flipped += 2;
        // Clear both arrays
        memory_values = [];
        memory_tile_ids = [];
        // Check to see if the whole board is cleared
        if(tiles_flipped == memory_array.length){
          win();
        }
      } else {
        function flip2Back(){
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



function setCounter(x) {
    var finishedLabel = document.getElementById("finished");
    finishedLabel.innerHTML = x;
}

function resetCounter(){
    var finishedLabel = document.getElementById("finished");
    finishedLabel.innerHTML = 0;
}



function setTime()
{
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function resetTime()
{
    totalSeconds = 0;
    secondsLabel.innerHTML = 0;
    minutesLabel.innerHTML = 0;
}

function pad(val)
{
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


function win() {
  var oldrawScore = localStorage.getItem('rawBestScore');
  if (totalSeconds < oldrawScore) {
    localStorage.setItem('rawBestScore', totalSeconds);
    localStorage.setItem("bestscore", parseInt(totalSeconds/60) + " minutes " + totalSeconds%60 + " seconds");
  }
  $('#bestscore').text(localStorage.getItem("bestscore"));
  document.getElementById('memory_board').innerHTML = "";
  newBoard();
  $('#title').text("You Made It !! You finished it in " + displayScore(totalSeconds));
}


function displayScore(totalSeconds) {
  return parseInt(totalSeconds/60) + " minutes " + totalSeconds%60 + " seconds";
};


function animatethis(targetElement, speed) {
    $(targetElement).animate({ marginLeft: "+=200px"},
    {
        duration: speed,
        complete: function ()
        {
            targetElement.animate({ marginLeft: "-=200px" },
            {
                duration: speed,
                complete: function ()
                {
                    animatethis(targetElement, speed);
                }
            });
        }
    });
};

animatethis($('#box'), 5000);



