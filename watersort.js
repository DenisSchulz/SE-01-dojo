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
/*
const test = prompt("Test \n");

console.log(test);
*/
