const util = require("util");
const { input, testInput1, testInput2 } = require("./input");

// console.log(testInput1);

// PART 1

const symbolRegex = /[^\.0-9]/;
const numberRegex = /\d+/g;

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

  console.log(
    "\n",
    prevLineRegion,
    prevLineHasSymbol,
    "\n",
    currLineRegion,
    currLineHasSymbol,
    "\n",
    nextLineRegion,
    nextLineHasSymbol
  );

  // check top row
  if (prevLineHasSymbol) return true;
  // check middle row
  if (currLineHasSymbol) return true;
  // check bottom row
  if (nextLineHasSymbol) return true;

  return false;
};

const lines = input.split("\n");

const partNumbers = [];

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
console.log(partNumbers.reduce((acc, curr) => (acc += curr), 0));
// use this line for in-depth debugging
// console.log(util.inspect(myObject, {showHidden: false, depth: null, colors: true}))

// 530855 too low
