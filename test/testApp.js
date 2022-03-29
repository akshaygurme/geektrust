const chai = require("chai");
const assert = chai.assert;
const { Ledger } = require("../src/ledgerCo");

describe("#App Test", () => {
  describe("Test Case 1", () => {
    const ledger = new Ledger();
    ledger.loan(...["IDIDI", "Dale", "10000", "5", "4"]);
    ledger.loan(...["MBI", "Harry", "2000", "2", "2"]);
    let actual = ledger.balance(...["IDIDI", "Dale", "5"]);
    actual.push(ledger.balance(...["IDIDI", "Dale", "40"]));
    actual.push(ledger.balance(...["MBI", "Harry", "12"]));
    actual.push(ledger.balance(...["MBI", "Harry", "0"]));

    // console.log(actual);
    const expected = [
      "IDIDI",
      "Dale",
      1000,
      55,
      ["IDIDI", "Dale", 8000, 20],
      ["MBI", "Harry", 1044, 12],
      ["MBI", "Harry", 0, 24],
    ];
    assert.deepStrictEqual(actual, expected);
  });
  describe("Test Case 2", () => {
    const ledger = new Ledger();
    ledger.loan(...["IDIDI", "Dale", "5000", "1", "6"]);
    ledger.loan(...["MBI", "Harry", "10000", "3", "7"]);
    ledger.loan(...["UON", "Shelly", "15000", "2", "9"]);

    ledger.payment(["IDIDI", "Dale", "1000", "5"]);
    ledger.payment(["MBI", "Harry", "5000", "10"]);
    ledger.payment(["UON", "Shelly", "7000", "12"]);
    let actual = ledger.balance(...["IDIDI", "Dale", "3"]);
    actual.push(ledger.balance(...["IDIDI", "Dale", "6"]));
    actual.push(ledger.balance(...["UON", "Shelly", "12"]));
    actual.push(ledger.balance(...["MBI", "Harry", "12"]));

    console.log(actual);
    const expected = [
      "IDIDI",
      "Dale",
      1326,
      9,
      ["IDIDI", "Dale", 3652, 4],
      ["UON", "Shelly", 15856, 3],
      ["MBI", "Harry", 9044, 10],
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
