const chai = require("chai");
const assert = chai.assert;
const { Ledger } = require("../src/ledgerCo");

describe("#App Test", () => {
  describe("Test Case 1", () => {
    it("Test Case 1", () => {
      const ledger = new Ledger();
      ledger.loan(...["IDIDI", "Dale", "10000", "5", "4"]);
      ledger.loan(...["MBI", "Harry", "2000", "2", "2"]);
      let actual = [];
      actual.push(ledger.balance(...["IDIDI", "Dale", "5"]));
      actual.push(ledger.balance(...["IDIDI", "Dale", "40"]));
      actual.push(ledger.balance(...["MBI", "Harry", "12"]));
      actual.push(ledger.balance(...["MBI", "Harry", "0"]));

      const expected = [
        {
          amountToPay: 1000,
          bank: "IDIDI",
          emiRemaining: 55,
          name: "Dale",
        },
        {
          amountToPay: 8000,
          bank: "IDIDI",
          emiRemaining: 20,
          name: "Dale",
        },
        {
          amountToPay: 1044,
          bank: "MBI",
          emiRemaining: 12,
          name: "Harry",
        },
        {
          amountToPay: 0,
          bank: "MBI",
          emiRemaining: 24,
          name: "Harry",
        },
      ];
      assert.deepStrictEqual(actual, expected);
    });
  }),
    describe("Test Case 2", () => {
      it("it should store all the attributes in the command", () => {
        const ledger = new Ledger();
        ledger.loan(...["IDIDI", "Dale", "5000", "1", "6"]);
        ledger.loan(...["MBI", "Harry", "10000", "3", "7"]);
        ledger.loan(...["UON", "Shelly", "15000", "2", "9"]);

        ledger.payment(["IDIDI", "Dale", "1000", "5"]);
        ledger.payment(["MBI", "Harry", "5000", "10"]);
        ledger.payment(["UON", "Shelly", "7000", "12"]);
        let actual = [];
        actual.push(ledger.balance(...["IDIDI", "Dale", "3"]));
        actual.push(ledger.balance(...["IDIDI", "Dale", "6"]));
        actual.push(ledger.balance(...["UON", "Shelly", "12"]));
        actual.push(ledger.balance(...["MBI", "Harry", "12"]));

        const expected = [
          {
            amountToPay: 1326,
            bank: "IDIDI",
            emiRemaining: 9,
            name: "Dale",
          },
          {
            amountToPay: 3652,
            bank: "IDIDI",
            emiRemaining: 4,
            name: "Dale",
          },
          {
            amountToPay: 15856,
            bank: "UON",
            emiRemaining: 3,
            name: "Shelly",
          },
          {
            amountToPay: 9044,
            bank: "MBI",
            emiRemaining: 10,
            name: "Harry",
          },
        ];
        assert.deepStrictEqual(actual, expected);
      });
    });
});
