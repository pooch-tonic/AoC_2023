const util = require("util");
const { input, testInput1 } = require("./input");

// console.log(testInput1);

// PART 1
const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const games = input.split("\n");
const validGameIds = [];

games.forEach((game, index) => {
  const gameSplitRes = game.split(":");
  const gameId = parseInt(gameSplitRes[0].split(" ")[1]);
  const sets = gameSplitRes[1].split(";");
  const isGameValid = sets.every((set) => {
    const items = set.split(",");
    const isSetValid = items.every((item) => {
      const [quantity, color] = item.trim().split(" ");
      if (parseInt(quantity) <= bag[color]) return true;
      return false;
    });
    if (isSetValid) return true;
    return false;
  });
  if (isGameValid) validGameIds.push(gameId);
});

console.log(validGameIds);
console.log(validGameIds.reduce((acc, curr) => (acc += curr), 0));

// PART 2
const powers = [];

games.forEach((game, index) => {
  const minQuantities = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const sets = game.split(":")[1].split(";");
  sets.forEach((set) => {
    const items = set.split(",");
    items.forEach((item) => {
      const [quantity, color] = item.trim().split(" ");
      if (parseInt(quantity) > minQuantities[color])
        minQuantities[color] = parseInt(quantity);
    });
  });
  powers.push(minQuantities.red * minQuantities.green * minQuantities.blue);
});

console.log(powers);
console.log(powers.reduce((acc, curr) => (acc += curr), 0));

// use this line for in-depth debugging
// console.log(util.inspect(myObject, {showHidden: false, depth: null, colors: true}))
