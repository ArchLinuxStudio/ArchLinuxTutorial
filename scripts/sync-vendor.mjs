import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const vendorDirectory = resolve(root, "docs/vendor");

const assets = [
  {
    name: "Docsify",
    sources: [
      "node_modules/docsify/dist/docsify.min.js",
      "node_modules/docsify/lib/docsify.min.js",
    ],
    destination: "docsify.min.js",
  },
  {
    name: "Docsify search",
    sources: [
      "node_modules/docsify/dist/plugins/search.min.js",
      "node_modules/docsify/lib/plugins/search.min.js",
    ],
    destination: "search.min.js",
  },
  {
    name: "Gitalk",
    sources: ["node_modules/gitalk/dist/gitalk.min.js"],
    destination: "gitalk.min.js",
  },
  {
    name: "Gitalk styles",
    sources: ["node_modules/gitalk/dist/gitalk.css"],
    destination: "gitalk.css",
  },
  {
    name: "Prism Bash",
    sources: ["node_modules/prismjs/components/prism-bash.min.js"],
    destination: "prism-bash.min.js",
  },
];

mkdirSync(vendorDirectory, { recursive: true });

for (const asset of assets) {
  const source = asset.sources
    .map((candidate) => resolve(root, candidate))
    .find(existsSync);

  if (!source) {
    throw new Error(
      `${asset.name} is missing. Run \"yarn install\" before syncing browser assets.`,
    );
  }

  copyFileSync(source, resolve(vendorDirectory, asset.destination));
}

console.log(`Synced ${assets.length} browser assets to docs/vendor.`);
