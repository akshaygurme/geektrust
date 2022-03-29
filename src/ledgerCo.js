const util = require("util");

const getAmountToPay = function (principal, year, rate) {
  let interest = principal * year * (rate / 100);
  let amountToPay = principal + interest;
  return amountToPay;
};

const getEMIAmount = function (numberOfEMI, amountToPay) {
  if (amountToPay > 0) {
    return Math.ceil(amountToPay / numberOfEMI);
  } else {
    return 0;
  }
};

const getNumberOfEMI = function (year) {
  return Math.ceil(year * 12);
};

class Ledger {
  constructor() {
    this.borrowers = {};
  }

  loan(...args) {
    // console.log(args, ".......");
    let [bank, borrowerName, principal, year, rate] = args;
    this.borrowers[borrowerName] = {};
    this.borrowers[borrowerName].principal = Number(principal);
    this.borrowers[borrowerName].rateOfInterest = Number(rate);
    this.borrowers[borrowerName].year = Number(year);
    this.borrowers[borrowerName].numberOfEMI = getNumberOfEMI(year);
    this.borrowers[borrowerName].amountToPay = getAmountToPay(
      Number(principal),
      Number(year),
      Number(rate)
    );
    this.borrowers[borrowerName].EMIAmount = getEMIAmount(
      this.borrowers[borrowerName].numberOfEMI,
      this.borrowers[borrowerName].amountToPay
    );
    this.borrowers[borrowerName].lumpsum = [];
    // this.displayStructure();
  }

  payment(args) {
    let [bank, borrowerName, lumpsumAmount, EmiNumber] = args;
    EmiNumber = Number(EmiNumber);
    this.borrowers[borrowerName].lumpsum.push({ lumpsumAmount, EmiNumber });
  }

  balance(...args) {
    let result = [];
    let [bank, borrowerName, EmiNumber] = args;
    result.push(bank);
    result.push(borrowerName);
    let amountPaid = this.borrowers[borrowerName].EMIAmount * EmiNumber;
    this.borrowers[borrowerName].lumpsum.forEach((element) => {
      if (Number(element.EmiNumber) <= Number(EmiNumber)) {
        amountPaid = amountPaid + Number(element.lumpsumAmount);
      }
    });
    if (amountPaid < this.borrowers[borrowerName].amountToPay) {
      result.push(Math.ceil(amountPaid));
      let EmiRemaining = Math.ceil(
        (this.borrowers[borrowerName].amountToPay - amountPaid) /
          this.borrowers[borrowerName].EMIAmount
      );
      result.push(EmiRemaining);
    } else {
      result.push(this.borrowers[borrowerName].amountToPay);
      result.push(0);
    }
    // console.log(result);
    return result;
  }

  displayStructure() {
    // console.log(
    //   util.inspect(this.borrowers, false, null, true /* enable colors */)
    // );
    return { ...this.borrowers };
  }
}

module.exports = { Ledger };
