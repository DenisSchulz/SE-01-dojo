const prompt = require("prompt-sync")(); //require prompt-sync function from promt-sync node module to make working with CL input easier

var move = [];
var beakers = [];

class Beaker {
  constructor(s1, s2, s3) {
    this.slots = [s1, s2, s3];
  }
}

initBeakers();
move = userDialogue();
if (checkMove(move[0], move[1])) {
  console.log("Okay!");
} else {
  console.log("This move is not allowed!");
}

//set up virtual representation of the beaker situation

function initBeakers() {
  beakers.push(new Beaker(1, 0, 0));
  beakers.push(new Beaker(2, 1, 2));
  beakers.push(new Beaker(2, 1, 0));

  console.log(beakers);
}

//get move from user

function userDialogue() {
  console.log("Welcome to Watersort!\nThis is the current situation:\n");

  for (i = 0; i < beakers.length; i++) {
    console.log("Beaker " + (i + 1) + ": " + beakers[i].slots);
  }

  const origin = prompt("Which Beaker do you want to move liquids from? ");

  const destination = prompt("Which Beaker do you want to move liquids to? ");

  return [origin - 1, destination - 1];
}

//check if the liquids are the same (or if the destination beaker is empty)

function sameLiquid(o, d) {
  var oLiquid = undefined;
  var dLiquid = undefined;

  for (i = 2; i >= 0; i--) {
    if (beakers[o].slots[i] != 0) {
      oLiquid = beakers[o].slots[i];
      i = -1;
    }
  }

  for (i = 2; i >= 0; i--) {
    if (beakers[d].slots[i] != 0) {
      dLiquid = beakers[d].slots[i];
      i = -1;
    }
  }

  if (oLiquid === dLiquid || !dLiquid) {
    return true;
  }
}

//check if there is enough space in the destination beaker

function enoughSpace(o, d) {
  var volume = 0;
  var space = 0;

  for (i = 2; i >= 0; i--) {
    if (beakers[o].slots[i] != 0) {
      if (beakers[o].slots[i] === beakers[o].slots[i + 1] || volume === 0) {
        volume += 1;
      } else {
        i = -1;
      }
    }
  }

  for (i = 2; i >= 0; i--) {
    if (beakers[d].slots[i] === 0) {
      space += 1;
    } else {
      i = -1;
    }
  }

  if (volume <= space) {
    return true;
  } else {
    return false;
  }
}

//check if move is valid

function checkMove(o, d) {
  if (enoughSpace(o, d) && sameLiquid(o, d)) {
    return true;
  } else {
    return false;
  }
}
