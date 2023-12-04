const util = require("util");
const { input, testInput2 } = require("./input");

// console.log(testInput);

// use this line for in-depth debugging
// console.log(util.inspect(myObject, {showHidden: false, depth: null, colors: true}))

const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;

const dict = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

console.log(
  input
    .split("\n")
    .map((str) => {
      // console.log(str);
      const matches = [...str.matchAll(regex)];

      // console.log(matches.map((e) => e[1]));

      const first = matches[0][1]; // second [1] needed since this regex match is formatted like [ '', 'two', index: 0, input: 'two1nine', groups: undefined ]
      const last = matches.slice(-1)[0][1];

      const digitLeft = dict[first] || first;
      const digitRight = dict[last] || last;

      const res = parseInt(`${digitLeft}${digitRight}`);
      // console.log(res);
      return res;
    })
    .reduce((acc, curr) => (acc += curr), 0)
);
