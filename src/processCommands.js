const { Ledger } = require("./ledgerCo");

const performOperation = function (ledger, operation, ...args) {
  //this function calls functions according to commands and returns the results.
  const [bank, borrower, ...values] = args;
  let result;
  switch (operation) {
    case "LOAN":
      ledger.loan(bank, borrower, ...values.map(Number));
      break;

    case "PAYMENT":
      ledger.payment(bank, borrower, ...values.map(Number));
      break;

    case "BALANCE":
      result = ledger.balance(bank, borrower, ...values.map(Number));
      break;
  }
  return result;
};

const processCommands = function (commands) {
  //for every command calls the performOperation function
  const ledger = new Ledger();
  const output = [];
  commands.forEach((command) => {
    const [operation, ...args] = command.split(" ");
    let result = performOperation(ledger, operation, ...args);
    result = result ? Object.values(result) : undefined;
    result && output.push(result.join(" "));
  });
  return output;
};

module.exports = { processCommands };
