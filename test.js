import { Card, solve } from "./solver.js";
import assert from "assert";

/*
 * Tests for classes
 */
const sequentialCardPairs = [
  ["AH", "2D"],
  ["KC", "AS"],
  ["JD", "TC"],
  ["6S", "7H"],
  ["AC", "KH"],
  ["4S", "3S"],
];
const nonSequentialCardPairs = [
  ["JD", "9D"],
  ["QC", "AC"],
  ["8S", "3S"],
  ["KS", "2C"],
  ["4S", "6S"],
  ["5H", "7H"],
];

it("Card isSequential should return true for sequential cards", () => {
  sequentialCardPairs.forEach((cp) => {
    const cardA = new Card(cp[0]);
    const cardB = new Card(cp[1]);
    assert.equal(cardA.isSequential(cardB), true);
    assert.equal(cardB.isSequential(cardA), true);
  });
});

it("Card isSequential should return false for non-sequential cards", () => {
  nonSequentialCardPairs.forEach((cp) => {
    const cardA = new Card(cp[0]);
    const cardB = new Card(cp[1]);
    assert.equal(cardA.isSequential(cardB), false);
    assert.equal(cardB.isSequential(cardA), false);
  });
});

/*
 * Tests for solve algorithm
 */
const solvable_games = [
  "8S TS 4D 7S 5D 7C 2D JH AC 3S 2H 3H 9H KC QC TD 8D 9C 7H 9D JS QS 4H 5C 5S 4C 2C QD 8C KD 3D KS JD 2S 7D KH AH 5H 9S 4S QH 6S 6D 3C JC TC 8H 6C TH AS AD 6H",
  "5D 9C 5S QS 8S 9D AS 5C 2S QD KC 9H 4H QC 2H 8D 4C 4D JC TS 6D 7H QH 3S 5H JH 6H 2D AC 7S 7C 3D KD 9S 3C TH 6C AH 8H TC 4S 8C AD 3H KS 6S JS 7D JD TD 2C KH",
  "JD 4D AH QC 3H 3C 7H TD 4H 2D 7C 7D 3S KH QS JC 2S 7S JS AS TS AD TC QD 9S 4S 2H 9H 8S JH 6C 3D KS 5S 5C 6H 9C 2C AC 8C 6D 5D TH 8D KC KD 9D 4C 5H 8H QH 6S",
  // this last one takes a long time...
  // "2D 6D AD 9S 4C 7C 7S 7D 9C 2S AC 8D 6S 6H 3C 5H QS JS 4S JH 5C AS 3H 3S AH TD 4D 5S TH 7H KS QH 6C KD 8S 2C TC JC 5D 3D 2H TS 4H JD KC KH 8H QC 8C QD 9D 9H",
];

const partial_games = [
  "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2D KH 8C 6S 6H 2C 8H JC 9C 4D AD TH 2S AS QH 5H AH 3H 2H 4S 6D 3C TS JD 9H KD AC JS 9S 4H 4C 5S 5D 5C",
];

it("solve should solve known games", () => {
  solvable_games.forEach(async (i) => {
    const array = i.split(" ");
    const result = await solve(array.slice(0, 28), array.slice(28, 52));
    assert.equal(result[0], true);
  });
}).timeout(200000);

it("solve should solve partial games", () => {
  partial_games.forEach(async (i) => {
    const array = i.split(" ").map((x) => (x === "0" ? 0 : x));
    const result = await solve(array.slice(0, 28), array.slice(28, 52));
    assert.equal(result[0], true);
  });
});
