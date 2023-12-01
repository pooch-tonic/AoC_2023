const util = require("util");
const { input, testInput2 } = require("./input");

// console.log(testInput);

// use this line for in-depth debugging
// console.log(util.inspect(myObject, {showHidden: false, depth: null, colors: true}))

const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;

console.log(
  testInput2
    .split("\n")
    .map((e) => {
      console.log(e);
      const str = e
        .replace("one", "1")
        .replace("two", "2")
        .replace("three", "3")
        .replace("four", "4")
        .replace("five", "5")
        .replace("six", "6")
        .replace("seven", "7")
        .replace("eight", "8")
        .replace("nine", "9");
      console.log(str);
      const matches = str.match(regex);
      console.log(matches);
      const res = parseInt(`${matches[0]}${matches.slice(-1)[0]}`);
      console.log(res);
      return res;
    })
    .reduce((acc, curr) => (acc += curr), 0)
);
