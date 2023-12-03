const util = require("util");
const { input, testInput1, testInput2 } = require("./input");

// console.log(testInput1);

// PART 1

const symbolRegex = /[^\.0-9]/;
const numberRegex = /\d+/g;

const lines = input.split("\n");

const partNumbers = [];

const isPartNumber = (
  numberIndex,
  numberLength,
  currLine,
  prevLine,
  nextLine,
  lineLength
) => {
  const checkStartIndex = numberIndex > 0 ? numberIndex - 1 : 0;
  const checkEndIndex =
    numberIndex + numberLength < lineLength - 1
      ? numberIndex + numberLength
      : lineLength - 1;

  const prevLineRegion = prevLine
    ? prevLine.slice(checkStartIndex, checkEndIndex + 1)
    : null;
  const currLineRegion = currLine
    ? currLine.slice(checkStartIndex, checkEndIndex + 1)
    : null;
  const nextLineRegion = nextLine
    ? nextLine.slice(checkStartIndex, checkEndIndex + 1)
    : null;

  const prevLineHasSymbol = prevLine ? symbolRegex.test(prevLineRegion) : false;
  const currLineHasSymbol = symbolRegex.test(currLineRegion);
  const nextLineHasSymbol = nextLine ? symbolRegex.test(nextLineRegion) : false;

  // check top row
  if (prevLineHasSymbol) return true;
  // check middle row
  if (currLineHasSymbol) return true;
  // check bottom row
  if (nextLineHasSymbol) return true;

  return false;
};

lines.forEach((rawLine, lineIndex) => {
  const line = rawLine.trim();
  const numberMatches = [...line.matchAll(numberRegex)];
  numberMatches.forEach((match) => {
    const number = match[0];
    const prevLine = lineIndex > 0 ? lines[lineIndex - 1].trim() : null;
    const nextLine =
      lineIndex < lines.length - 1 ? lines[lineIndex + 1].trim() : null;
    if (
      isPartNumber(
        match.index,
        number.length,
        line,
        prevLine,
        nextLine,
        line.length
      )
    )
      partNumbers.push(parseInt(number));
  });
});

console.log(partNumbers);
console.log(
  "Part 1",
  partNumbers.reduce((acc, curr) => (acc += curr), 0)
);
// use this line for in-depth debugging
// console.log(util.inspect(myObject, {showHidden: false, depth: null, colors: true}))

// 530855 too low

// PART 2
const gearRegex = /\*/g;
const partNumberRegex = /[0-9]+/g;
const gearRatios = [];

const isNumberAdjacentToIndex = (match, index) => {
  const number = match[0];
  const endIndex = match.index + number.length - 1;
  if (index >= match.index && index <= endIndex) {
    // console.log("overlap case", match.index, endIndex, index);
    return true;
  }
  if (Math.abs(match.index - index) <= 1 || Math.abs(endIndex - index) <= 1) {
    // console.log("adjacent case", match.index, endIndex, index);
    return true;
  }
  return false;
};

const getGearRatio = (gearIndex, prevLine, currLine, nextLine, lineLength) => {
  const checkStartIndex = gearIndex > 0 ? gearIndex - 1 : 0;
  const checkEndIndex =
    gearIndex < lineLength - 1 ? gearIndex + 1 : lineLength - 1;

  const prevLineRegion = prevLine
    ? prevLine.slice(checkStartIndex, checkEndIndex + 1)
    : null;
  const currLineRegion = currLine
    ? currLine.slice(checkStartIndex, checkEndIndex + 1)
    : null;
  const nextLineRegion = nextLine
    ? nextLine.slice(checkStartIndex, checkEndIndex + 1)
    : null;

  const prevLineMatches = prevLineRegion
    ? [...prevLineRegion.matchAll(partNumberRegex)]
    : [];
  const currLineMatches = [...currLineRegion.matchAll(partNumberRegex)];
  const nextLineMatches = nextLineRegion
    ? [...nextLineRegion.matchAll(partNumberRegex)]
    : [];

  const totalMatches = [
    ...prevLineMatches,
    ...currLineMatches,
    ...nextLineMatches,
  ];

  if (totalMatches.length === 2) {
    const pairNumbers = [];

    if (prevLineMatches.length > 0) {
      [...prevLine.matchAll(partNumberRegex)].forEach((match) => {
        if (isNumberAdjacentToIndex(match, gearIndex))
          pairNumbers.push(match[0]);
      });
    }
    if (currLineMatches.length > 0) {
      [...currLine.matchAll(partNumberRegex)].forEach((match) => {
        if (isNumberAdjacentToIndex(match, gearIndex))
          pairNumbers.push(match[0]);
      });
    }
    if (nextLineMatches.length > 0) {
      [...nextLine.matchAll(partNumberRegex)].forEach((match) => {
        if (isNumberAdjacentToIndex(match, gearIndex))
          pairNumbers.push(match[0]);
      });
    }

    // console.log("gear", pairNumbers);
    return pairNumbers.reduce((acc, curr) => (acc *= curr), 1);
  }
  // console.log("not gear");
  return 0;
};

lines.forEach((rawLine, lineIndex) => {
  const line = rawLine.trim();
  const gearMatches = [...line.matchAll(gearRegex)];
  gearMatches.forEach((match) => {
    const prevLine = lineIndex > 0 ? lines[lineIndex - 1].trim() : null;
    const nextLine =
      lineIndex < lines.length - 1 ? lines[lineIndex + 1].trim() : null;
    const gearRatio = getGearRatio(
      match.index,
      prevLine,
      line,
      nextLine,
      line.length
    );
    gearRatios.push(parseInt(gearRatio));
  });
});

console.log(gearRatios);
console.log(
  "Part 2",
  gearRatios.reduce((acc, curr) => (acc += curr), 0)
);
