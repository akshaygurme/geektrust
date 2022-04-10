// calculate the total amount borrower has to pay
const getAmountToPay = function (principal, year, rate) {
  let interest = principal * year * (rate / 100);
  return principal + interest;
};

// calculate the amount for single EMI
const getEmiAmount = function (numberOfEmi, amountToPay) {
  let emiAmount = 0;
  if (amountToPay > 0) {
    emiAmount = Math.ceil(amountToPay / numberOfEmi);
  }
  return emiAmount;
};

// returns total amount paid by borrower
const getPaidAmount = function (amountPaid, lumpsum, emiNumber) {
  lumpsum.forEach((element) => {
    if (element.emiNumber <= emiNumber) {
      amountPaid = amountPaid + element.lumpsumAmount;
    }
  });
  return amountPaid;
};

// returns number of EMIs in which borrower will pay the loan
const getNumberOfEmi = (year) => Math.ceil(year * 12);

// will return the key of "borrowers" object
const getKey = (name, bank) => name + "-" + bank;

// to calculate remaining EMIs to pay
const getEmiRemaining = (amountToPay, amountPaid, emiAmount) =>
  Math.ceil((amountToPay - amountPaid) / emiAmount);

class Ledger {
  constructor() {
    this.borrowers = {};
  }

  // Loan command adds all the borrower and loan related data in "borrowers" object
  loan(...args) {
    let [bank, name, principal, year, rate] = args;
    const details = { principal, rate, year };
    const key = getKey(name, bank);
    details.numberOfEmi = getNumberOfEmi(year);
    details.amountToPay = getAmountToPay(principal, rate, year);
    details.emiAmount = getEmiAmount(details.numberOfEmi, details.amountToPay);
    details.lumpsum = [];
    this.borrowers[key] = { ...details };
  }

  // Payment command adds all the lumpsum related data in "borrowers" object
  payment(...args) {
    let [bank, name, lumpsumAmount, emiNumber] = args;
    const key = getKey(name, bank);
    this.borrowers[key].lumpsum.push({ lumpsumAmount, emiNumber });
  }

  // Balance command prints the total amount paid by the borrower and the no of EMIs remaining.
  balance(...args) {
    let [bank, name, emiNumber] = args;
    const key = getKey(name, bank);
    const { amountToPay, emiAmount, lumpsum } = this.borrowers[key];
    let result = { bank, name, amountToPay, emiRemaining: 0 };
    let amountPaid = emiAmount * emiNumber;

    amountPaid = getPaidAmount(amountPaid, lumpsum, emiNumber);
    if (amountPaid < amountToPay) {
      result.amountToPay = Math.ceil(amountPaid);
      result.emiRemaining = getEmiRemaining(amountToPay, amountPaid, emiAmount);
    }
    return result;
  }

  displayStructure() {
    return { ...this.borrowers };
  }
}

module.exports = { Ledger };
