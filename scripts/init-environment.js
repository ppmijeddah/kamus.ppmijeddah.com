/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const sourceFile = ".env.prod";
const destinationFile = ".env";

const CWD = process.cwd();
const sourcePath = path.resolve(CWD, sourceFile);
const destinationPath = path.resolve(CWD, destinationFile);

main();

function main() {
  if (!fs.existsSync(sourcePath)) {
    console.error(
      `Error: Source file "${sourceFile}" not found in current directory (${CWD}).`,
    );
    console.error(`Full path checked: ${sourcePath}`);
    process.exit(1);
  }

  fs.copyFileSync(sourcePath, destinationPath);
  console.log(
    `Successfully copied "${sourceFile}" to "${destinationFile}" in current directory (${CWD}).`,
  );
}
