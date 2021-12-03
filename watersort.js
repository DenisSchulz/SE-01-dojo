const prompt = require("prompt-sync")(); //require prompt-sync function from promt-sync node module to make working with CL input easier

var move = [];
var beakers = [];
var solvedS = false;

class Beaker {
  constructor(s) {
    this.slots = s;
  }
}

initBeakers();

console.log("Welcome to Watersort!\n");

while (!solvedS) {
  move = userDialogue();
  if (checkMove(move[0], move[1])) {
    console.log("Okay!");
    makeMove(move[0], move[1]);
  } else {
    console.log("This move is not allowed!");
  }
}

//set up virtual representation of the beaker situation

function initBeakers() {
  beakers.push(new Beaker([1, 3, 2, 1]));
  beakers.push(new Beaker([1, 3, 2, 2]));
  beakers.push(new Beaker([3, 2, 1, 3]));
  beakers.push(new Beaker([0, 0, 0, 0]));
  beakers.push(new Beaker([0, 0, 0, 0]));
}

//make move (only use after checkMove() !)

function makeMove(o, d) {
  var liquid = 0;
  var volume = 0;

  for (i = beakers[o].slots.length - 1; i >= 0; i--) {
    if (beakers[o].slots[i] != 0) {
      if (beakers[o].slots[i] === liquid || liquid === 0) {
        liquid = beakers[o].slots[i];
        volume += 1;
        beakers[o].slots[i] = 0;
      } else {
        i = -1;
      }
    }
  }

  for (i = 0; i < beakers[d].slots.length - 1; i++) {
    if (beakers[d].slots[i] === 0) {
      for (j = 0; j < volume; j++) {
        beakers[d].slots[i + j] = liquid;
      }
      i = beakers[d].slots.length;
    }
  }
}

//get move from user

function userDialogue() {
  console.log("This is the current situation:\n");

  for (i = 0; i < beakers.length; i++) {
    console.log("Beaker " + (i + 1) + ": " + beakers[i].slots);
  }

  const origin = prompt("Which Beaker do you want to move liquids from? ");

  if (origin == "exit") {
    process.exit();
  }

  const destination = prompt("Which Beaker do you want to move liquids to? ");

  if (destination == "exit") {
    process.exit();
  }
  return [origin - 1, destination - 1];
}

//check if the liquids are the same (or if the destination beaker is empty)

function sameLiquid(o, d) {
  var oLiquid = undefined;
  var dLiquid = undefined;

  for (i = beakers[o].slots.length - 1; i >= 0; i--) {
    if (beakers[o].slots[i] != 0) {
      oLiquid = beakers[o].slots[i];
      i = -1;
    }
  }

  for (i = beakers[d].slots.length - 1; i >= 0; i--) {
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

  for (i = beakers[o].slots.length - 1; i >= 0; i--) {
    if (beakers[o].slots[i] != 0) {
      if (beakers[o].slots[i] === beakers[o].slots[i + 1] || volume === 0) {
        volume += 1;
      } else {
        i = -1;
      }
    }
  }

  for (i = beakers[d].slots.length - 1; i >= 0; i--) {
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
