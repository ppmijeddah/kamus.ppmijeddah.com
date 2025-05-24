/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs").promises;
const path = require("path");
const { validate: uuidValidate } = require("uuid");

async function main() {
  const input = path.join(process.cwd(), "./data/dictionary-with-uuid.csv");

  console.log(`Validating dictionary CSV in ${input}`);

  const text = await fs.readFile(input, "utf8");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [header, ...lines] = text.split("\n");

  console.log(
    `Found ${lines.filter((l) => l.trim()).length} entries to validate`,
  );

  let validEntries = 0;
  let invalidEntries = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const lineNumber = i + 2;

    const [
      uuid,
      indonesia,
      amiyah,
      amiyah_arab,
      fushah,
      fushah_arab,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      category,
      contoh,
    ] = line.split(",");

    const isUuidValid = uuid && uuidValidate(uuid.trim());
    const areOtherFieldsValid =
      amiyah && amiyah_arab && indonesia && fushah && fushah_arab && contoh;

    if (isUuidValid && areOtherFieldsValid) {
      validEntries++;
    } else {
      invalidEntries++;
      if (!isUuidValid) {
        console.error(`Invalid or missing UUID on line ${lineNumber}: ${line}`);
      }
      if (!areOtherFieldsValid) {
        console.error(`Missing data fields on line ${lineNumber}: ${line}`);
      }
    }
  }

  console.log(`Validation complete:`);
  console.log(`- Valid entries: ${validEntries}`);
  console.log(`- Invalid entries: ${invalidEntries}`);

  if (invalidEntries > 0) {
    console.error(
      "Dictionary contains invalid entries. Please fix them before proceeding.",
    );
    process.exit(1);
  }

  console.log("Dictionary validation successful!");
}

main().catch((err) => {
  console.error("Error in validation process:", err);
  process.exit(1);
});
