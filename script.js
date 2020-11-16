window.mdc.autoInit();


var switchUpper = new window.mdc.switchControl.MDCSwitch(document.querySelector('#switch-upper'));
var switchLower = new window.mdc.switchControl.MDCSwitch(document.querySelector('#switch-lower'));
var switchNum = new window.mdc.switchControl.MDCSwitch(document.querySelector('#switch-numeric'));
var switchSpec = new window.mdc.switchControl.MDCSwitch(document.querySelector('#switch-special'));

const textFields = document.querySelectorAll('.mdc-text-field');

textFields.forEach(field => {
	mdc.textField.MDCTextField.attachTo(field);
});

var lengthInput = document.getElementById("text-field-hero-input");
lengthInput.addEventListener("keydown", function (e) {

  if (isNaN(parseInt(e.key)) && e.key !== "Backspace") {
    e.preventDefault();
    
  }
  else if (isNaN(parseInt(lengthInput.value)) && e.key === "0") {
    e.preventDefault();
    
  } else {
    passwordConfig.length = parseInt(lengthInput.value + e.key);
  } 

})

var switchUpperControl = document.getElementById("switch-upper");
var switchLowerControl = document.getElementById("switch-lower");
var switchNumControl = document.getElementById("switch-numeric");
var switchSpecControl = document.getElementById("switch-special");

switchUpperControl.addEventListener("click", function (e) {
  if (!passwordConfig.lowercase && !passwordConfig.special && !passwordConfig.numeric) {
    
    e.preventDefault();
  } else {
    passwordConfig.uppercase = (e.target.checked);
  }
});

switchLowerControl.addEventListener("click", function (e) {
  if (!passwordConfig.uppercase && !passwordConfig.special && !passwordConfig.numeric) {
    
    e.preventDefault();
  } else {
    passwordConfig.lowercase = (e.target.checked);
  }
});

switchSpecControl.addEventListener("click", function (e) {
  if (!passwordConfig.lowercase && !passwordConfig.uppercase && !passwordConfig.numeric) {
    
    e.preventDefault();
  } else {
    passwordConfig.special = (e.target.checked);
  }
});

switchNumControl.addEventListener("click", function (e) {
  if (!passwordConfig.lowercase && !passwordConfig.special && !passwordConfig.uppercase) {
    
    e.preventDefault();
  } else {
    passwordConfig.numeric = (e.target.checked);
  }
});

var timePicker = new window.mdc.menu.MDCMenu(document.getElementById('timePickerMenu'));
var timePickerBtn = document.getElementById("timePickerBtn");
timePicker.setAbsolutePosition(0, 0);

timePickerBtn.addEventListener("click", function (ev) {
    ev.preventDefault();
    timePicker.open = true;
});



var passwordConfig = {
    uppercase: true, 
    lowercase: true, 
    numberic: true,
    special: true,
    length: 8
};

var generateBtn = document.getElementById("generate");
var passwordOutput = document.getElementById("password_output");

generateBtn.addEventListener("click",function (e) {
    console.log("Clicked Generate Button");
    passwordOutput.value = generatePassword();
});

var copyIcon = document.getElementById("icon");
copyIcon.addEventListener("click", function (ev) {
    password_output.select()
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
});

const upperCaseCharacters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  
  const lowerCaseCharacters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  
  const numericCharacters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  
  const specialCharacters = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "|",
    "?",
    ".",
    "~",
  ];
  
  function generatePassword() {
  let myPassword = [];
  
  while (myPassword.length !== passwordConfig.length) {
    if (passwordConfig.uppercase) {
      let randomNum = Math.floor(Math.random() * upperCaseCharacters.length);
      myPassword.push(upperCaseCharacters[randomNum]);
      if (myPassword.length === passwordConfig.length) {
        break;
      }
    }
    if (passwordConfig.lowercase) {
      let randomNum = Math.floor(Math.random() * lowerCaseCharacters.length);
      myPassword.push(lowerCaseCharacters[randomNum]);
      if (myPassword.length === passwordConfig.length) {
        break;
      }
    }
    if (passwordConfig.numeric) {
      let randomNum = Math.floor(Math.random() * numericCharacters.length);
      myPassword.push(numericCharacters[randomNum]);
      if (myPassword.length === passwordConfig.length) {
        break;
      }
    }
    if (passwordConfig.special) {
      let randomNum = Math.floor(Math.random() * specialCharacters.length);
      myPassword.push(specialCharacters[randomNum]);
      if (myPassword.length === passwordConfig.length) {
        break;
      }
    }
    
  }
  
  // randomize order of characters
  
  let shuffleNum = myPassword.length;
  while (shuffleNum > 0) {
    let randomIndex = Math.floor(Math.random() * shuffleNum);
    shuffleNum = shuffleNum - 1;
    let tempChar = myPassword[shuffleNum];
    myPassword[shuffleNum] = myPassword[randomIndex];
    myPassword[randomIndex] = tempChar;
  }
  
  myPassword = myPassword.join("");
  
  return myPassword;
  }