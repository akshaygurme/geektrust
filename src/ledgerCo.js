const util = require("util");

const getAmountToPay = function (principal, year, rate) {
  let interest = principal * year * (rate / 100);
  let amountToPay = principal + interest;
  return amountToPay;
};

const getEMIAmount = function (numberOfEMI, amountToPay) {
  let emiAmount = 0;
  if (amountToPay > 0) {
    emiAmount = Math.ceil(amountToPay / numberOfEMI);
  }
  return emiAmount;
};

const getNumberOfEMI = (year) => Math.ceil(year * 12);

const getValue = (value) => Number(value);

class Ledger {
  constructor() {
    this.borrowers = {};
  }

  loan(...args) {
    let [bank, name, principal, year, rate] = args;

    principal = getValue(principal);
    rate = getValue(rate);
    year = getValue(year);
    const numberOfEMI = getNumberOfEMI(year);
    const amountToPay = getAmountToPay(principal, rate, year);
    const EMIAmount = getEMIAmount(numberOfEMI, amountToPay);
    const lumpsum = [];
    const borrowerDetails = {
      principal,
      rate,
      year,
      numberOfEMI,
      amountToPay,
      EMIAmount,
      lumpsum,
    };
    this.borrowers[name] = { ...borrowerDetails };
  }

  payment(args) {
    let [bank, name, lumpsumAmount, EmiNumber] = args;
    EmiNumber = getValue(EmiNumber);
    this.borrowers[name].lumpsum.push({ lumpsumAmount, EmiNumber });
  }

  balance(...args) {
    let [bank, name, EmiNumber] = args;
    const borrower = this.borrowers[name];
    const amountToPay = borrower.amountToPay;
    let result = { bank, name, amountToPay, emiRemaining: 0 };

    let amountPaid = borrower.EMIAmount * EmiNumber;

    borrower.lumpsum.forEach((element) => {
      if (Number(element.EmiNumber) <= Number(EmiNumber)) {
        amountPaid = amountPaid + Number(element.lumpsumAmount);
      }
    });

    if (amountPaid < borrower.amountToPay) {
      // to calculate remaining emi
      result.amountToPay = Math.ceil(amountPaid);
      result.emiRemaining = Math.ceil(
        (borrower.amountToPay - amountPaid) / borrower.EMIAmount
      );
    }

    return result;
  }

  displayStructure() {
    return { ...this.borrowers };
  }
}

module.exports = { Ledger };
