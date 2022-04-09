const { Ledger } = require("./ledgerCo");

const performOperation = function (ledger, operation, ...args) {
  //this function calls functions according to commands and returns the results.

  let result;
  switch (operation) {
    case "LOAN":
      ledger.loan(...args);
      break;

    case "PAYMENT":
      ledger.payment(args);
      break;

    case "BALANCE":
      result = ledger.balance(...args);
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
  ledger.displayStructure(); // to display the structure finally created
  return output;
};

module.exports = { processCommands };
