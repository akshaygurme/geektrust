const util = require("util");

const getAmountToPay = function (principal, year, rate) {
  let interest = principal * year * (rate / 100);
  return principal + interest;
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

const getKey = (name, bank) => name + "-" + bank;

const getEmiRemaining = (borrower, amountPaid) =>
  Math.ceil((borrower.amountToPay - amountPaid) / borrower.EMIAmount);

class Ledger {
  constructor() {
    this.borrowers = {};
  }

  loan(...args) {
    let [bank, name, principal, year, rate] = args;

    const details = {};
    const key = getKey(name, bank);
    details.principal = getValue(principal);
    details.rate = getValue(rate);
    details.year = getValue(year);
    details.numberOfEMI = getNumberOfEMI(year);
    details.amountToPay = getAmountToPay(details.principal, rate, year);
    details.EMIAmount = getEMIAmount(details.numberOfEMI, details.amountToPay);
    details.lumpsum = [];
    this.borrowers[key] = { ...details };
  }

  payment(args) {
    let [bank, name, lumpsumAmount, EmiNumber] = args;
    const key = getKey(name, bank);
    EmiNumber = getValue(EmiNumber);
    this.borrowers[key].lumpsum.push({ lumpsumAmount, EmiNumber });
  }

  balance(...args) {
    let [bank, name, EmiNumber] = args;
    const key = getKey(name, bank);
    const borrower = this.borrowers[key];
    const amountToPay = borrower.amountToPay;
    let result = { bank, name, amountToPay, emiRemaining: 0 };
    let amountPaid = borrower.EMIAmount * EmiNumber;

    borrower.lumpsum.forEach((element) => {
      if (element.EmiNumber <= EmiNumber) {
        amountPaid = amountPaid + +element.lumpsumAmount;
      }
    });

    if (amountPaid < borrower.amountToPay) {
      // to calculate remaining emi
      result.amountToPay = Math.ceil(amountPaid);
      result.emiRemaining = getEmiRemaining({ ...borrower }, amountPaid);
    }
    return result;
  }

  displayStructure() {
    return { ...this.borrowers };
  }
}

module.exports = { Ledger };
