// Initialize MDC in the window -----------------------------------------------------------------------------------

window.mdc.autoInit();

// Characters used in password generation -------------------------------------------------------------------------

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

// Password Config Setting --------------------------------------------------------------------------------------------------

var passwordConfig = {
    uppercase: true, 
    lowercase: true, 
    numberic: true,
    special: true,
    length: 8
};

// Basic Components ---------------------------------------------------------------------------------------------------------

var generateBtn = document.getElementById("generate");
var passwordOutput = document.getElementById("password_output");
var copyIcon = document.getElementById("icon");

// Config Menu Components ----------------------------------------------------------------------------------------------------

var settingsPicker = new window.mdc.menu.MDCMenu(document.getElementById('settingsPickerMenu'));
var settingsPickerBtn = document.getElementById("settingsPickerBtn");
const textFields = document.querySelectorAll('.mdc-text-field');
var lengthInput = document.getElementById("text-field-hero-input");
var switchUpper = new window.mdc.switchControl.MDCSwitch(document.querySelector('#switch-upper'));
var switchLower = new window.mdc.switchControl.MDCSwitch(document.querySelector('#switch-lower'));
var switchNum = new window.mdc.switchControl.MDCSwitch(document.querySelector('#switch-numeric'));
var switchSpec = new window.mdc.switchControl.MDCSwitch(document.querySelector('#switch-special'));
var switchUpperControl = document.getElementById("switch-upper");
var switchLowerControl = document.getElementById("switch-lower");
var switchNumControl = document.getElementById("switch-numeric");
var switchSpecControl = document.getElementById("switch-special");

// password generation upon button click -------------------------------------------------------------------------------------

generateBtn.addEventListener("click",function (e) {
    console.log("Clicked Generate Button");
    passwordOutput.value = generatePassword();
});

// copy to clipboard when clicking on clipboard icon -------------------------------------------------------------------------

copyIcon.addEventListener("click", function (ev) {
    password_output.select()
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
});

// Function to create random passwords within configurations in the PasswordConfig object ------------------------------------

function generatePassword() {
  let myPassword = [];
  
//   password randomization of character presence ----------------------------------------------------------------------------

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
  
//   password randomization of character sequence -------------------------------------------------------------------------

  let shuffleNum = myPassword.length;

  while (shuffleNum > 0) {
    let randomIndex = Math.floor(Math.random() * shuffleNum);
    shuffleNum = shuffleNum - 1;
    let tempChar = myPassword[shuffleNum];
    myPassword[shuffleNum] = myPassword[randomIndex];
    myPassword[randomIndex] = tempChar;
  }
  
//   password return ------------------------------------------------------------------------------------------------------

  myPassword = myPassword.join("");
  return myPassword;
}

// menu positioning relative to anchor button -----------------------------------------------------------------------------

settingsPicker.setAbsolutePosition(0, 0);

// menu opening -----------------------------------------------------------------------------------------------------------

settingsPickerBtn.addEventListener("click", function (ev) {
    ev.preventDefault();
    settingsPicker.open = true;
});

// initialize MDC text-field ----------------------------------------------------------------------------------------------

textFields.forEach(field => {mdc.textField.MDCTextField.attachTo(field);});

// password length input config
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

// boolean switches in the config menu
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

// End ------------------------------------------------------------------------------------------------------------------
