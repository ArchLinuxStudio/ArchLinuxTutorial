import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

export const GENERATED_NOTICE =
  "<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->";

const CACHE_VERSION = 4;
const TRANSLATABLE_PATTERN =
  /[\u3400-\u9fff\uf900-\ufaff，。！？；：“”‘’（）【】《》、]/u;
const ASSET_PATTERN = /\.(?:avif|gif|ico|jpe?g|pdf|png|svg|webp|zip)(?:[?#]|$)/iu;

function slash(path) {
  return path.split(sep).join("/");
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function protectTerms(value, protectedTerms) {
  const terms = [...protectedTerms]
    .filter(Boolean)
    .sort((left, right) => right.length - left.length);
  if (!terms.length) return { value, matches: [] };

  const pattern = new RegExp(terms.map(escapeRegExp).join("|"), "giu");
  let cursor = 0;
  let protectedValue = "";
  const matches = [];

  for (const match of value.matchAll(pattern)) {
    protectedValue += value.slice(cursor, match.index);
    protectedValue += `<x${matches.length}>`;
    matches.push(match[0]);
    cursor = match.index + match[0].length;
  }

  return {
    value: protectedValue + value.slice(cursor),
    matches,
  };
}

function restoreTerms(value, matches) {
  let restored = value;
  for (const [index, term] of matches.entries()) {
    const placeholder = `<x${index}>`;
    const pieces = restored.split(placeholder);
    if (pieces.length !== 2) {
      return null;
    }
    restored = pieces.join(term);
  }
  return restored;
}

function splitProtectedTerms(value, protectedTerms) {
  const terms = [...protectedTerms]
    .filter(Boolean)
    .sort((left, right) => right.length - left.length);
  if (!terms.length) return [{ value, translate: true }];

  const pattern = new RegExp(terms.map(escapeRegExp).join("|"), "giu");
  const pieces = [];
  let cursor = 0;
  for (const match of value.matchAll(pattern)) {
    if (match.index > cursor) {
      pieces.push({ value: value.slice(cursor, match.index), translate: true });
    }
    pieces.push({ value: match[0], translate: false });
    cursor = match.index + match[0].length;
  }
  if (cursor < value.length) {
    pieces.push({ value: value.slice(cursor), translate: true });
  }
  return pieces;
}

function visit(node, parent, callback) {
  callback(node, parent);
  if (!Array.isArray(node.children)) return;
  for (const child of node.children) visit(child, node, callback);
}

function routeForEnglish(url, sourceFile) {
  if (
    !url ||
    url.startsWith("#") ||
    url.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/iu.test(url) ||
    ASSET_PATTERN.test(url)
  ) {
    return url;
  }

  if (url === "/") return "/uk/";
  if (url === "/uk" || url.startsWith("/uk/")) return url;
  if (url.startsWith("/")) return `/uk${url}`;

  if (sourceFile.startsWith("_")) {
    const clean = url.replace(/^\.\//u, "");
    if (!clean.startsWith("../") && !clean.startsWith("uk/")) {
      return `/uk/${clean}`;
    }
  }

  return url;
}

function linkDestinationReplacement(node, source, sourceFile) {
  if (node.type !== "link" || !node.position || !node.url) return null;

  const translatedUrl = routeForEnglish(node.url, sourceFile);
  if (translatedUrl === node.url) return null;

  const start = node.position.start.offset;
  const end = node.position.end.offset;
  const lastChildEnd = node.children?.at(-1)?.position?.end?.offset ?? start;
  const tail = source.slice(lastChildEnd, end);
  const match = tail.match(/^\]\(\s*(?:<([^>]+)>|([^\s)]+))/u);
  const capturedUrl = match?.[1] ?? match?.[2];
  if (!match || capturedUrl !== node.url) return null;

  const localUrlOffset = match[0].indexOf(capturedUrl);
  const urlStart = lastChildEnd + localUrlOffset;
  return { start: urlStart, end: urlStart + capturedUrl.length, value: translatedUrl };
}

function definitionDestinationReplacement(node, source, sourceFile) {
  if (node.type !== "definition" || !node.position || !node.url) return null;

  const translatedUrl = routeForEnglish(node.url, sourceFile);
  if (translatedUrl === node.url) return null;

  const start = node.position.start.offset;
  const end = node.position.end.offset;
  const raw = source.slice(start, end);
  const match = raw.match(/^\s*\[[^\]]+\]:\s*(?:<([^>]+)>|([^\s]+))/u);
  const capturedUrl = match?.[1] ?? match?.[2];
  if (!match || capturedUrl !== node.url) return null;

  const localUrlOffset = match[0].indexOf(capturedUrl);
  return {
    start: start + localUrlOffset,
    end: start + localUrlOffset + capturedUrl.length,
    value: translatedUrl,
  };
}

export function analyzeMarkdown(source, sourceFile, config) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(source);
  const replacements = [];
  const textSegments = [];

  function addTextSegment(start, end) {
    const value = source.slice(start, end);
    if (!TRANSLATABLE_PATTERN.test(value)) return;
    const cacheKey = hash(
      JSON.stringify({
        version: CACHE_VERSION,
        translationEngine: config.translationEngine,
        modelPackage: config.modelPackage,
        modelVersion: config.modelVersion,
        sourceLanguage: config.sourceLanguage,
        targetLanguage: config.targetLanguage,
        protectedTerms: config.protectedTerms,
        value,
      }),
    );
    const segment = { start, end, value, cacheKey };
    replacements.push(segment);
    textSegments.push(segment);
  }

  visit(tree, null, (node) => {
    if (
      node.type === "text" &&
      node.position?.start?.offset !== undefined &&
      node.position?.end?.offset !== undefined
    ) {
      const start = node.position.start.offset;
      const end = node.position.end.offset;
      addTextSegment(start, end);
    }

    if (node.type === "image" && node.position && node.alt) {
      const start = node.position.start.offset;
      const raw = source.slice(start, node.position.end.offset);
      const match = raw.match(/^!\[([^\]]*)\]\(/u);
      if (match) {
        const altStart = start + 2;
        addTextSegment(altStart, altStart + match[1].length);
      }
    }

    const linkReplacement = linkDestinationReplacement(node, source, sourceFile);
    if (linkReplacement) replacements.push(linkReplacement);
    const definitionReplacement = definitionDestinationReplacement(
      node,
      source,
      sourceFile,
    );
    if (definitionReplacement) replacements.push(definitionReplacement);
  });

  return { replacements, textSegments };
}

function applyReplacements(source, replacements, translations) {
  const ordered = [...replacements].sort((left, right) => right.start - left.start);
  let output = source;
  let previousStart = source.length + 1;

  for (const replacement of ordered) {
    if (replacement.end > previousStart) {
      throw new Error("Overlapping Markdown replacements detected.");
    }
    const value = replacement.cacheKey
      ? translations[replacement.cacheKey]
      : replacement.value;
    if (value === undefined) {
      throw new Error(`Missing translation for ${replacement.cacheKey}.`);
    }
    output = `${output.slice(0, replacement.start)}${value}${output.slice(replacement.end)}`;
    previousStart = replacement.start;
  }

  return output;
}

export function createArgosTranslator({
  projectRoot,
  pythonExecutable = process.env.ARGOS_PYTHON ||
    (process.platform === "win32" ? "python" : "python3"),
  scriptPath = "scripts/argos-translator.py",
  sourceLanguage,
  targetLanguage,
  modelPackage,
  modelVersion,
  spawnProcess = spawn,
}) {
  const resolvedScriptPath = resolve(projectRoot, scriptPath);
  return (texts) =>
    new Promise((resolveTranslation, rejectTranslation) => {
      const child = spawnProcess(
        pythonExecutable,
        [
          resolvedScriptPath,
          "--from",
          sourceLanguage,
          "--to",
          targetLanguage,
          "--model-package",
          modelPackage,
          "--model-version",
          modelVersion,
        ],
        {
          cwd: projectRoot,
          env: { ...process.env, ARGOS_DEVICE_TYPE: process.env.ARGOS_DEVICE_TYPE || "cpu" },
          stdio: ["pipe", "pipe", "pipe"],
          windowsHide: true,
        },
      );
      let stdout = "";
      let stderr = "";
      let finished = false;
      const timeout = setTimeout(() => {
        if (finished) return;
        finished = true;
        child.kill();
        rejectTranslation(new Error("Argos translation timed out after 30 minutes."));
      }, 30 * 60 * 1000);

      child.stdout.setEncoding("utf8");
      child.stderr.setEncoding("utf8");
      child.stdout.on("data", (chunk) => {
        stdout += chunk;
      });
      child.stderr.on("data", (chunk) => {
        stderr = `${stderr}${chunk}`.slice(-12_000);
      });
      child.on("error", (error) => {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        rejectTranslation(
          new Error(`Unable to start Argos Translate with ${pythonExecutable}: ${error.message}`),
        );
      });
      child.on("close", (code) => {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        if (code !== 0) {
          rejectTranslation(
            new Error(stderr.trim() || `Argos Translate exited with code ${code}.`),
          );
          return;
        }

        try {
          const payload = JSON.parse(stdout);
          if (
            !Array.isArray(payload.translations) ||
            payload.translations.length !== texts.length ||
            payload.translations.some((translation) => typeof translation !== "string")
          ) {
            throw new Error("unexpected translation result");
          }
          resolveTranslation(payload.translations);
        } catch (error) {
          rejectTranslation(
            new Error(
              `Argos Translate returned invalid JSON: ${error instanceof Error ? error.message : error}`,
            ),
          );
        }
      });

      child.stdin.end(JSON.stringify({ texts }));
    });
}

async function translateMisses(misses, protectedTerms, translateBatch) {
  const plans = misses.map((item) => ({
    item,
    protected: protectTerms(item.value, protectedTerms),
  }));
  const translated = await translateBatch(
    plans.map((plan) => plan.protected.value),
  );
  if (!Array.isArray(translated) || translated.length !== plans.length) {
    throw new Error("Translation provider returned an invalid result.");
  }

  const values = translated.map((value, index) =>
    restoreTerms(value, plans[index].protected.matches),
  );
  const fallbackPlans = plans
    .map((plan, index) => ({
      index,
      pieces: splitProtectedTerms(plan.item.value, protectedTerms),
    }))
    .filter((plan) => values[plan.index] === null);

  if (fallbackPlans.length) {
    const fallbackTexts = fallbackPlans.flatMap((plan) =>
      plan.pieces.filter((piece) => piece.translate).map((piece) => piece.value),
    );
    const fallbackTranslations = fallbackTexts.length
      ? await translateBatch(fallbackTexts)
      : [];
    if (
      !Array.isArray(fallbackTranslations) ||
      fallbackTranslations.length !== fallbackTexts.length
    ) {
      throw new Error("Translation provider returned an invalid fallback result.");
    }

    let cursor = 0;
    for (const plan of fallbackPlans) {
      values[plan.index] = plan.pieces
        .map((piece) => {
          if (!piece.translate) return piece.value;
          const translation = fallbackTranslations[cursor];
          cursor += 1;
          return translation;
        })
        .join("");
    }
  }

  return plans.map((plan, index) => ({
    cacheKey: plan.item.cacheKey,
    value: values[index],
  }));
}

function removeEmptyDirectories(directory, keepDirectory) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyDirectories(join(directory, entry.name), keepDirectory);
  }
  if (directory !== keepDirectory && readdirSync(directory).length === 0) {
    rmSync(directory, { recursive: true });
  }
}

export async function syncTranslations({
  root,
  configPath = "i18n.config.json",
  translateBatch,
  dryRun = false,
} = {}) {
  const projectRoot = resolve(root ?? process.cwd());
  const resolvedConfigPath = resolve(projectRoot, configPath);
  const config = readJson(resolvedConfigPath, null);
  if (!config) throw new Error(`Translation config not found: ${resolvedConfigPath}`);

  const sourceDirectory = resolve(projectRoot, config.sourceDirectory);
  const outputDirectory = resolve(projectRoot, config.outputDirectory);
  const cachePath = resolve(projectRoot, config.cacheFile);
  const outputWithinSource = relative(sourceDirectory, outputDirectory);
  if (
    !existsSync(sourceDirectory) ||
    !outputWithinSource ||
    outputWithinSource === ".." ||
    outputWithinSource.startsWith(`..${sep}`) ||
    isAbsolute(outputWithinSource)
  ) {
    throw new Error("The translation output directory must be inside the source directory.");
  }
  const excluded = new Set(config.excludeFiles ?? []);
  const savedCache = readJson(cachePath, { version: CACHE_VERSION, entries: {} });
  const cache =
    savedCache.version === CACHE_VERSION && typeof savedCache.entries === "object"
      ? savedCache
      : { version: CACHE_VERSION, entries: {} };

  const sourceFiles = walk(sourceDirectory)
    .filter((file) => extname(file).toLowerCase() === ".md")
    .filter((file) => !file.startsWith(`${outputDirectory}${sep}`))
    .map((file) => ({ path: file, relative: slash(relative(sourceDirectory, file)) }))
    .filter((file) => !excluded.has(file.relative))
    .sort((left, right) => left.relative.localeCompare(right.relative, "en"));
  if (!sourceFiles.length) {
    throw new Error("No source Markdown files found; refusing to remove generated pages.");
  }

  const analyses = sourceFiles.map((file) => {
    const source = readFileSync(file.path, "utf8");
    return { ...file, source, ...analyzeMarkdown(source, file.relative, config) };
  });

  const activeCacheKeys = new Set(
    analyses.flatMap((file) => file.textSegments.map((segment) => segment.cacheKey)),
  );
  const uniqueMisses = new Map();
  let cacheHits = 0;
  for (const file of analyses) {
    for (const segment of file.textSegments) {
      if (cache.entries[segment.cacheKey] !== undefined) {
        cacheHits += 1;
      } else {
        uniqueMisses.set(segment.cacheKey, segment);
      }
    }
  }

  const misses = [...uniqueMisses.values()];
  if (misses.length) {
    const translator =
      translateBatch ??
      createArgosTranslator({
        projectRoot,
        sourceLanguage: config.sourceLanguage,
        targetLanguage: config.targetLanguage,
        modelPackage: config.modelPackage,
        modelVersion: config.modelVersion,
      });
    const translatedMisses = await translateMisses(
      misses,
      config.protectedTerms ?? [],
      translator,
    );
    for (const translated of translatedMisses) {
      cache.entries[translated.cacheKey] = translated.value;
    }
  }

  const outputs = analyses.map((file) => {
    const translated = applyReplacements(file.source, file.replacements, cache.entries);
    const content = translated.startsWith(GENERATED_NOTICE)
      ? translated
      : `${GENERATED_NOTICE}\n\n${translated}`;
    return {
      path: resolve(outputDirectory, ...file.relative.split("/")),
      relative: file.relative,
      content,
    };
  });

  const expectedOutputs = new Set(outputs.map((file) => file.path.toLowerCase()));
  const orphanedOutputs = walk(outputDirectory).filter(
    (file) => extname(file).toLowerCase() === ".md" && !expectedOutputs.has(file.toLowerCase()),
  );

  const prunedEntries = Object.fromEntries(
    Object.entries(cache.entries)
      .filter(([key]) => activeCacheKeys.has(key))
      .sort(([left], [right]) => left.localeCompare(right, "en")),
  );

  if (!dryRun) {
    for (const file of outputs) {
      mkdirSync(dirname(file.path), { recursive: true });
      if (!existsSync(file.path) || readFileSync(file.path, "utf8") !== file.content) {
        writeFileSync(file.path, file.content, "utf8");
      }
    }
    for (const file of orphanedOutputs) rmSync(file);
    removeEmptyDirectories(outputDirectory, outputDirectory);
    writeJson(cachePath, { version: CACHE_VERSION, entries: prunedEntries });
  }

  return {
    sourceFiles: sourceFiles.length,
    textSegments: analyses.reduce((total, file) => total + file.textSegments.length, 0),
    cacheHits,
    cacheMisses: misses.length,
    deletedFiles: orphanedOutputs.length,
    outputDirectory: slash(relative(projectRoot, outputDirectory)),
  };
}
