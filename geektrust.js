var { readFileSync } = require("fs");
let { processCommands } = require("./src/processCommands.js");

const main = function (filePath) {
  const fileContent = readFileSync(filePath, "utf-8");
  const commands = fileContent.split("\n"); //getting all the commands by splitting the Input with \n
  const result = processCommands(commands);
  console.log(result.join("\n")); //printing Result
};

main(process.argv[2]); //passing input file name to main()
