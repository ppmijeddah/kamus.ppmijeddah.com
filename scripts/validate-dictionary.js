/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs").promises;
const path = require("path");

async function main() {
  const input = path.join(process.cwd(), "./data/dictionary.csv");

  console.log(`Validating dictionary CSV in ${input}`);

  const text = await fs.readFile(input, "utf8");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [header, ...lines] = text.split("\n");

  console.log(
    `Found ${lines.filter((l) => l.trim()).length} entries to validate`,
  );

  let validEntries = 0;
  let invalidEntries = 0;

  for (const line of lines) {
    if (!line.trim()) continue;

    const [word, amiyah_arab, indonesia, fushah, fushah_arab, contoh] =
      line.split(",");

    if (word && amiyah_arab && indonesia && fushah && fushah_arab && contoh) {
      validEntries++;
    } else {
      invalidEntries++;
      console.error(`Invalid entry: ${line}`);
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
