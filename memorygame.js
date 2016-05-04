 // Scripted By Adam Khoury in connection with the following video tutorial:
  // http://www.youtube.com/watch?v=c_ohDPWmsM0
var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var memory_dictionary = {
                            'A': 'golden_finch_01.png',
                            'B': 'golden_finch_02.png',
                            'C': 'golden_finch_03.png',
                            'D': 'golden_finch_04.png',
                            'E': 'golden_finch_05.png',
                            'F': 'golden_finch_06.png',
                            'G': 'golden_finch_07.png',
                            'H': 'golden_finch_08.png',
                            'I': 'golden_finch_09.png',
                            'J': 'golden_finch_10.png',
                            'K': 'golden_finch_11.png',
                            'L': 'golden_finch_12.png',
                        };

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
  tiles_flipped = 0;
  var output = '';
    memory_array.memory_tile_shuffle();
  for(var i = 0; i < memory_array.length; i++){
    output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
  }
  document.getElementById('memory_board').innerHTML = output;
  resetTime();
  resetCounter();
}


function memoryFlipTile(tile,val){
  if(tile.innerHTML == "" && memory_values.length < 2){
    console.log(val);
    tile.style.opacity = 0.9;
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
        x = x + 1;
        setCounter(x);
        tiles_flipped += 2;
        // Clear both arrays
        memory_values = [];
        memory_tile_ids = [];
        // Check to see if the whole board is cleared
        if(tiles_flipped == memory_array.length){
          alert("Board cleared... generating new board");
          document.getElementById('memory_board').innerHTML = "";
          newBoard();
        }
      } else {
        function flip2Back(){
            // Flip the 2 tiles back over
            var tile_1 = document.getElementById(memory_tile_ids[0]);
            tile_1.style.opacity = 0.5;
            var tile_2 = document.getElementById(memory_tile_ids[1]);
            tile_2.style.opacity = 0.5;
            tile_1.style.background = 'background: #CCC';
                  tile_1.innerHTML = "";
            tile_2.style.background = 'background: #CCC';
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
