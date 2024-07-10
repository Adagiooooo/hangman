const wordsAct = ["QUANTITATIVE", "QUALITATIVE", "METHODOLOGY", "CORRELATIONAL", "EXPERIMENTAL", "RESEARCH"];
var chosenWord = "";
var buttonValue = "";
var mysteryWord = [];
var chosenWordArr = [];
var i;
var counter = 1;
const next = document.getElementById('nextButton');
var correctNumCounter = 0;
var buttons = document.getElementsByClassName('keyboard-button');
function nextFunc(){
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
      }
    if (wordsAct.length === 0) {
        result();
        return;
    }
    else{
        counter=1;
        next.style.display = "none";
        play();
    }
    

}
function result(){
    var resultDiv = document.getElementById("resultDiv");
    var contentDiv = document.getElementById("main");
    contentDiv.style.display = "none";
    resultDiv.style.display = "block";
    document.getElementById("correct").innerHTML = "Words Guessed: " + correctNumCounter;
    document.getElementById("incorrect").innerHTML = "Words Not Guessed: " + (6 - correctNumCounter);
        
}
function play() {
 /* if (wordsAct.length === 0) {
    result();
    return;
  }*/

  var randomWordNum = Math.floor(Math.random() * wordsAct.length);
  chosenWord = wordsAct[randomWordNum];
  chosenWordArr = chosenWord.split('');
  wordsAct.splice(randomWordNum, 1);
  mysteryWord = [];
//console.log(chosenWord);
  for (i = 0; i < chosenWord.length; i++) {
    mysteryWord[i] = "_";
  }
  document.getElementById('mystery_word').innerHTML = mysteryWord.join(' ');
  counter = 1;
  document.getElementById('hang_pic').src = "1.png";

  
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.opacity = 1;
    buttons[i].disabled = false;
  }
}

function checker(chosenWordArr, mysteryWord) {
  for (let i = 0; i < chosenWordArr.length; i++) {
    if (chosenWordArr[i] !== mysteryWord[i]) 
        return false;
  }
  return true;
}

document.getElementById('keyboard-cont').addEventListener('click', function(event) {
  if (event.target.classList.contains('keyboard-button')) {
    buttonValue = event.target.textContent.trim();
    event.target.style.opacity = 0;
    event.target.disabled = true;

    let letterCheck = false;
    for (let j = 0; j < chosenWordArr.length; j++) {
      if (buttonValue === chosenWordArr[j]) {
        mysteryWord[j] = buttonValue;
        letterCheck = true;
      }
    }

    if (!letterCheck) {
      counter++;
      var image = document.getElementById('hang_pic');
      if (counter >=7) {
        image.src = "7.png";
        next.style.display = "block";
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
      } 
      else {
        image.src = counter + ".png";
      }
    }

    document.getElementById('mystery_word').innerHTML = mysteryWord.join(' ');

    if (checker(chosenWordArr, mysteryWord)) {
      next.style.display = "block";
      for (let i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
      }
      correctNumCounter++;
      //console.log(correctNumCounter);
    }
  }
});

play();
