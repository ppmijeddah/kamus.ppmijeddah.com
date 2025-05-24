/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs").promises;
const { EOL } = require("os");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const path = require("path");

const sourceCsvPath = path.join(process.cwd(), "data", "dictionary.csv");
const targetCsvPath = path.join(
  process.cwd(),
  "data",
  "dictionary-with-uuid.csv",
);

async function upsertUuidBasedOnContent() {
  console.log("Starting UUID upsert process...");
  console.log(`Source CSV (without UUIDs): ${sourceCsvPath}`);
  console.log(`Target CSV (with UUIDs, will be updated): ${targetCsvPath}`);

  const existingUuidMap = new Map();

  // 1. Try to read the existing target CSV to populate the map
  try {
    const targetFileContent = await fs.readFile(targetCsvPath, "utf8");
    const targetLines = targetFileContent.split(EOL);
    console.log(
      `Found existing target file ${targetCsvPath} with ${targetLines.length} lines.`,
    );

    if (targetLines.length > 1) {
      // Has at least a header and one data line
      // Skip header of target file
      for (let i = 1; i < targetLines.length; i++) {
        const line = targetLines[i];
        if (line.trim() === "") continue;

        const firstCommaIndex = line.indexOf(",");
        if (firstCommaIndex > -1) {
          const existingUuid = line.substring(0, firstCommaIndex).trim();
          const contentKey = line.substring(firstCommaIndex + 1); // The rest of the line is the key

          if (uuidValidate(existingUuid)) {
            existingUuidMap.set(contentKey, existingUuid);
          } else {
            console.warn(
              `Found invalid UUID "${existingUuid}" in target file for content: "${contentKey.substring(0, 50)}..." - it will be regenerated if content matches source.`,
            );
          }
        }
      }
    }
    console.log(
      `Populated ${existingUuidMap.size} existing UUIDs from ${targetCsvPath}`,
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        `Target file ${targetCsvPath} not found. Will create it with new UUIDs.`,
      );
    } else {
      console.error(`Error reading target file ${targetCsvPath}:`, error);
    }
  }

  // 2. Read the source CSV and process its rows
  let sourceFileContent;
  try {
    sourceFileContent = await fs.readFile(sourceCsvPath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`Error: The source file ${sourceCsvPath} was not found.`);
    } else {
      console.error(`Error reading source file ${sourceCsvPath}:`, error);
    }
    process.exit(1);
    return;
  }

  const sourceLines = sourceFileContent.split(EOL);
  const outputLines = [];

  if (
    sourceLines.length === 0 ||
    (sourceLines.length === 1 && sourceLines[0].trim() === "")
  ) {
    console.log("Source CSV file is empty.");
    await fs.writeFile(targetCsvPath, "", "utf8");
    console.log(`Target file ${targetCsvPath} created empty.`);
    return;
  }

  const sourceHeader = sourceLines[0];
  outputLines.push(`UUID,${sourceHeader}`);

  let newUuidsGenerated = 0;
  let existingUuidsUsed = 0;

  for (let i = 1; i < sourceLines.length; i++) {
    const currentSourceRowContent = sourceLines[i];

    if (currentSourceRowContent.trim() === "") {
      if (
        i < sourceLines.length - 1 ||
        (i === sourceLines.length - 1 && sourceFileContent.endsWith(EOL + EOL))
      ) {
        outputLines.push(currentSourceRowContent);
      }
      continue;
    }

    let uuidToUse;
    if (existingUuidMap.has(currentSourceRowContent)) {
      uuidToUse = existingUuidMap.get(currentSourceRowContent);
      existingUuidsUsed++;
    } else {
      uuidToUse = uuidv4();
      newUuidsGenerated++;
    }
    outputLines.push(`${uuidToUse},${currentSourceRowContent}`);
  }

  // 3. Write the result to the target CSV
  let outputContent = "";
  if (outputLines.length > 0) {
    outputContent = outputLines.join(EOL);
    if (
      outputLines.length === 1 &&
      outputLines[0].trim() === `UUID,${sourceHeader}` &&
      sourceLines.length === 1
    ) {
    } else if (
      outputLines[outputLines.length - 1] &&
      outputLines[outputLines.length - 1].trim() !== ""
    ) {
      outputContent += EOL;
    } else if (
      outputLines.length > 0 &&
      outputLines[outputLines.length - 1] &&
      outputLines[outputLines.length - 1].trim() === "" &&
      sourceFileContent.endsWith(EOL + EOL) &&
      sourceLines.length > 1
    ) {
      outputContent += EOL;
    }
  }

  await fs.writeFile(targetCsvPath, outputContent, "utf8");
  console.log(`\nProcessing complete.`);
  console.log(`  ${existingUuidsUsed} existing UUIDs were used.`);
  console.log(`  ${newUuidsGenerated} new UUIDs were generated.`);
  console.log(`Output successfully written to: ${targetCsvPath}`);
  console.log("Please review the target file to ensure correctness.");
}

upsertUuidBasedOnContent();
