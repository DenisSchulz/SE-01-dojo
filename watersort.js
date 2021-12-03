//require prompt-sync function from promt-sync node module to make working with CL input easier

const prompt = require("prompt-sync")();

var beakers = [];

class Beaker {
  constructor(s1, s2, s3) {
    this.slots = [s1, s2, s3];
  }
}

initBeakers();
console.log(checkMove(1 - 1, 2 - 1));

function initBeakers() {
  beakers.push(new Beaker(1, 0, 0));
  beakers.push(new Beaker(2, 1, 2));
  beakers.push(new Beaker(2, 1, 0));

  console.log(beakers);
}

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

function checkMove(o, d) {
  return enoughSpace(o, d);
}

/*
const test = prompt("Test \n");

console.log(test);
*/
