const util = require("util");
const { input, testInput1, testInput2 } = require("./input");
const { match } = require("assert");

// console.log(testInput1);

const source = input;

// PART 1

let points = 0;

source.split("\n").forEach((line) => {
  const [left, right] = line.split("|");
  const [cardInfo, winningNumbersInfo] = left.split(":");
  const winningNumbers = winningNumbersInfo
    .trim()
    .replaceAll("  ", " ")
    .split(" ");
  const myNumbers = right.trim().replaceAll("  ", " ").split(" ");
  const matches = winningNumbers.filter((winningNumber) => {
    if (myNumbers.some((e) => e === winningNumber)) return true;
    return false;
  });
  const earnedPoints = matches.length > 0 ? Math.pow(2, matches.length - 1) : 0;
  points += earnedPoints;
  console.log(matches, earnedPoints);
});

console.log("part 1:", points);

// use this line for in-depth debugging
// console.log(util.inspect(myObject, {showHidden: false, depth: null, colors: true}))

// PART 2
const allCards = source.split("\n");
const scratchedCards = [];

const scratchCard = (cardNumber) => {
  const card = allCards[cardNumber - 1];
  const [left, right] = card.split("|");
  const [cardInfo, winningNumbersInfo] = left.split(":");
  const winningNumbers = winningNumbersInfo
    .trim()
    .replaceAll("  ", " ")
    .split(" ");
  const myNumbers = right.trim().replaceAll("  ", " ").split(" ");
  const matches = winningNumbers.filter((winningNumber) => {
    if (myNumbers.some((e) => e === winningNumber)) return true;
    return false;
  });
  scratchedCards.push(cardNumber);

  for (let i = 1; i <= matches.length; i++) {
    scratchCard(cardNumber + i);
  }
};

for (let i = 1; i <= allCards.length; i++) {
  scratchCard(i);
}

console.log("part 2:", scratchedCards.sort(), scratchedCards.length);
