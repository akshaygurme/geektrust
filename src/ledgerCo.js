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
const getPaidAmount = function (amountPaid, lumpsum, emiNumber) {
  lumpsum.forEach((element) => {
    if (element.emiNumber <= emiNumber) {
      amountPaid = amountPaid + element.lumpsumAmount;
    }
  });
  return amountPaid;
};

const getNumberOfEMI = (year) => Math.ceil(year * 12);

const getKey = (name, bank) => name + "-" + bank;

const getEmiRemaining = (amountToPay, amountPaid, EMIAmount) =>
  Math.ceil((amountToPay - amountPaid) / EMIAmount); // to calculate remaining emi

class Ledger {
  constructor() {
    this.borrowers = {};
  }

  loan(...args) {
    let [bank, name, principal, year, rate] = args;
    const details = { principal, rate, year };
    const key = getKey(name, bank);
    details.numberOfEMI = getNumberOfEMI(year);
    details.amountToPay = getAmountToPay(principal, rate, year);
    details.EMIAmount = getEMIAmount(details.numberOfEMI, details.amountToPay);
    details.lumpsum = [];
    this.borrowers[key] = { ...details };
  }

  payment(...args) {
    let [bank, name, lumpsumAmount, emiNumber] = args;
    const key = getKey(name, bank);
    this.borrowers[key].lumpsum.push({ lumpsumAmount, emiNumber });
  }

  balance(...args) {
    let [bank, name, emiNumber] = args;
    const key = getKey(name, bank);
    const { amountToPay, EMIAmount, lumpsum } = this.borrowers[key];
    let result = { bank, name, amountToPay, emiRemaining: 0 };
    let amountPaid = EMIAmount * emiNumber;

    amountPaid = getPaidAmount(amountPaid, lumpsum, emiNumber);
    if (amountPaid < amountToPay) {
      result.amountToPay = Math.ceil(amountPaid);
      result.emiRemaining = getEmiRemaining(amountToPay, amountPaid, EMIAmount);
    }
    return result;
  }

  displayStructure() {
    return { ...this.borrowers };
  }
}

module.exports = { Ledger };
