import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import "./validate-site.mjs";
import { writeLastUpdatedManifest } from "./generate-last-updated.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
const lastUpdatedManifest = resolve(root, "docs/last-updated.json");

writeLastUpdatedManifest(lastUpdatedManifest);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(resolve(root, "docs"), output, { recursive: true });
writeFileSync(resolve(output, ".nojekyll"), "");

console.log("Static site built in dist/.");
