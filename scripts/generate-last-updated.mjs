import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDirectory = resolve(root, "docs");

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.name.toLowerCase().endsWith(".md") ? [path] : [];
  });
}

export function collectLastUpdatedDates() {
  const dates = {};

  for (const file of markdownFiles(docsDirectory)) {
    const documentPath = relative(docsDirectory, file).replaceAll("\\", "/");
    const repositoryPath = `docs/${documentPath}`;
    const date = execFileSync(
      "git",
      ["log", "-1", "--follow", "--format=%cs", "--", repositoryPath],
      { cwd: root, encoding: "utf8" },
    ).trim();

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(`Could not determine the last commit date for ${repositoryPath}.`);
    }

    dates[documentPath] = date;
  }

  return Object.fromEntries(Object.entries(dates).sort(([left], [right]) => left.localeCompare(right)));
}

export function writeLastUpdatedManifest(outputFile) {
  const dates = collectLastUpdatedDates();
  mkdirSync(dirname(outputFile), { recursive: true });
  writeFileSync(outputFile, `${JSON.stringify(dates, null, 2)}\n`, "utf8");
  console.log(`Generated last-updated metadata for ${Object.keys(dates).length} documents.`);
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  writeLastUpdatedManifest(resolve(process.argv[2] || resolve(docsDirectory, "last-updated.json")));
}
