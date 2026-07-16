import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDirectory = resolve(root, "docs");
const failures = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const files = walk(docsDirectory);
const markdownFiles = files.filter((file) => extname(file).toLowerCase() === ".md");
const index = readFileSync(resolve(docsDirectory, "index.html"), "utf8");
const siteScript = readFileSync(resolve(docsDirectory, "scripts/site.js"), "utf8");
const translationConfig = JSON.parse(
  readFileSync(resolve(root, "i18n.config.json"), "utf8"),
);
const englishDirectory = resolve(root, translationConfig.outputDirectory);
const englishPrefix = `${englishDirectory}${sep}`;
const excludedTranslationFiles = new Set(translationConfig.excludeFiles ?? []);
const chineseMarkdown = markdownFiles
  .filter((file) => !file.startsWith(englishPrefix))
  .map((file) => relative(docsDirectory, file).replaceAll("\\", "/"))
  .filter((file) => !excludedTranslationFiles.has(file))
  .sort();
const englishMarkdown = markdownFiles
  .filter((file) => file.startsWith(englishPrefix))
  .map((file) => relative(englishDirectory, file).replaceAll("\\", "/"))
  .sort();

assert(
  JSON.stringify(chineseMarkdown) === JSON.stringify(englishMarkdown),
  "Chinese and generated English Markdown file sets are out of sync. Run yarn translate.",
);
assert(index.includes('lang="zh-CN"'), "The document language must remain zh-CN.");
assert(index.includes("./vendor/docsify.min.js"), "The local Docsify bundle is not linked.");
assert(index.includes("./scripts/site.js"), "The site controller is not linked.");
assert(!/darkreader|unpkg\.com|fonts\.googleapis\.com/i.test(index), "Unexpected remote UI dependency found in index.html.");

const commentInvariants = [
  'clientID: "296c581fc4b2a837a1e3"',
  'clientSecret: "7e7f0ad1809fa4a1915430ade04835f6849ab56a"',
  'repo: "ArchLinuxTutorialComments"',
  'owner: "ArchLinuxStudio"',
  'admin: ["ryosukeeeeee"]',
  'decodeURI(window.location.hash.split("?")[0])',
];

for (const invariant of commentInvariants) {
  assert(siteScript.includes(invariant), `Gitalk invariant missing: ${invariant}`);
}

const sidebarFiles = [resolve(docsDirectory, "_sidebar.md"), resolve(docsDirectory, "uk/_sidebar.md")];
const internalLinkPattern = /\]\((\/[^)#?]+)(?:[?#][^)]*)?\)/g;

for (const sidebar of sidebarFiles) {
  const source = readFileSync(sidebar, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  for (const match of source.matchAll(internalLinkPattern)) {
    const route = decodeURIComponent(match[1]).replace(/^\//, "");
    const candidates = route
      ? [resolve(docsDirectory, `${route}.md`), resolve(docsDirectory, route, "README.md")]
      : [resolve(docsDirectory, "README.md")];
    assert(candidates.some(existsSync), `Broken sidebar route ${match[1]} in ${relative(root, sidebar)}.`);
  }
}

for (const required of [
  "arch.svg",
  "favicon.ico",
  "styles/theme.css",
  "scripts/site.js",
  "vendor/docsify.min.js",
  "vendor/search.min.js",
  "vendor/gitalk.min.js",
  "vendor/gitalk.css",
  "vendor/prism-bash.min.js",
]) {
  const target = resolve(docsDirectory, required);
  assert(existsSync(target) && statSync(target).size > 0, `Required asset is missing or empty: docs/${required}`);
}

if (failures.length) {
  console.error(`Site validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Site validation passed (${markdownFiles.length} content files checked).`);
