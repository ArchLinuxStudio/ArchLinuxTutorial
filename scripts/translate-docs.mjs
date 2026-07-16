import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { syncTranslations } from "./i18n-core.mjs";

const isDirectRun = resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url);

if (isDirectRun) {
  try {
    const stats = await syncTranslations({
      dryRun: process.argv.includes("--dry-run"),
    });
    console.log(
      [
        `English documentation synchronized (${stats.sourceFiles} files).`,
        `${stats.textSegments} translatable segments:`,
        `${stats.cacheHits} cache hits,`,
        `${stats.cacheMisses} API translations,`,
        `${stats.deletedFiles} deleted pages.`,
      ].join(" "),
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
