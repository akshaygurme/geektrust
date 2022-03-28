var { readFileSync } = require("fs");
let { processCommands } = require("./src/processCommands.js");

const main = function (filePath) {
  const fileContent = readFileSync(filePath, "utf-8");
  const commands = fileContent.split("\n"); //getting all the commands by splitting the Input with newline
  const result = processCommands(commands); //passing all the commands

  console.log(result);
};

main(process.argv[2]);
