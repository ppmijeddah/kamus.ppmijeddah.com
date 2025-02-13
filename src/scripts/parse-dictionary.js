/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs").promises;
const path = require("path");

main();

async function main() {
  const root = path.join(__dirname, "..");
  const input = path.join(__dirname, "./dictionary.csv");
  const output_am_to_id = path.join(
    root,
    `./__generated__/dictionary_am_id.json`
  );
  const output_id_to_am = path.join(
    root,
    `./__generated__/dictionary_id_am.json`
  );
  const output_fs_to_am = path.join(
    root,
    `./__generated__/dictionary_fs_am.json`
  );

  console.log(`Parsing dictionary csv in ${input}`);

  const text = await fs.readFile(input, "utf8");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, ...lines] = text.split("\n");

  const am_to_id = lines
    .filter((line) => line.trim())
    .map((line) => {
      const [word, amiyah_arab, indonesia, fushah, fushah_arab, contoh] =
        line.split(",");
      return {
        word: word.toLowerCase(),
        amiyah_arab: amiyah_arab.toLowerCase(),
        indonesia: indonesia.toLowerCase(),
        fushah: fushah.toLowerCase(),
        fushah_arab: fushah_arab.toLowerCase(),
        contoh: contoh.toLowerCase(),
      };
    });
  const id_to_am = [...am_to_id].sort((a, b) =>
    a.indonesia.localeCompare(b.indonesia)
  );
  const fs_to_am = [...am_to_id].sort((a, b) =>
    a.fushah.localeCompare(b.fushah)
  );

  await fs.mkdir(path.dirname(output_am_to_id), { recursive: true });
  await fs.mkdir(path.dirname(output_id_to_am), { recursive: true });
  await fs.mkdir(path.dirname(output_fs_to_am), { recursive: true });
  await fs.writeFile(output_am_to_id, JSON.stringify(am_to_id));
  await fs.writeFile(output_id_to_am, JSON.stringify(id_to_am));
  await fs.writeFile(output_fs_to_am, JSON.stringify(fs_to_am));

  console.log(`Generated dictionary json file to .src/__generated__`);
}
