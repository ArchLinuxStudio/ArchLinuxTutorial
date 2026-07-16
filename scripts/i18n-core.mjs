import { createHash, randomUUID } from "node:crypto";
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

const CACHE_VERSION = 2;
const REQUEST_LIMIT_CHARACTERS = 45_000;
const REQUEST_TEXT_LIMIT = 100;
const TRANSIENT_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);
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

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function decodeXml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/giu, (_, digits) =>
      String.fromCodePoint(Number.parseInt(digits, 16)),
    )
    .replace(/&#([0-9]+);/gu, (_, digits) =>
      String.fromCodePoint(Number.parseInt(digits, 10)),
    )
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&");
}

function protectTerms(value, protectedTerms) {
  const terms = [...protectedTerms]
    .filter(Boolean)
    .sort((left, right) => right.length - left.length);
  if (!terms.length) return escapeXml(value);

  const pattern = new RegExp(terms.map(escapeRegExp).join("|"), "giu");
  let cursor = 0;
  let output = "";

  for (const match of value.matchAll(pattern)) {
    output += escapeXml(value.slice(cursor, match.index));
    output += `<span class="notranslate">${escapeXml(match[0])}</span>`;
    cursor = match.index + match[0].length;
  }

  return output + escapeXml(value.slice(cursor));
}

function restoreTerms(value) {
  return decodeXml(
    value
      .replace(/<span\b[^>]*\bclass=["'][^"']*\bnotranslate\b[^"']*["'][^>]*>/giu, "")
      .replace(/<\/span>/giu, ""),
  );
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

function createBatches(items, protectedTerms) {
  const batches = [];
  let current = [];
  let currentCharacters = 0;

  for (const item of items) {
    const protectedText = protectTerms(item.value, protectedTerms);
    const characters = protectedText.length;
    if (characters > REQUEST_LIMIT_CHARACTERS) {
      throw new Error("A single Markdown text segment exceeds the Azure request limit.");
    }
    if (
      current.length >= REQUEST_TEXT_LIMIT ||
      (current.length &&
        currentCharacters + characters > REQUEST_LIMIT_CHARACTERS)
    ) {
      batches.push(current);
      current = [];
      currentCharacters = 0;
    }
    current.push({ ...item, protectedText });
    currentCharacters += characters;
  }

  if (current.length) batches.push(current);
  return batches;
}

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

export function createAzureTranslator({
  apiUrl,
  apiKey,
  region,
  sourceLanguage,
  targetLanguage,
}) {
  if (!apiKey) {
    throw new Error(
      "AZURE_TRANSLATOR_KEY is required for uncached text. Add it as a GitHub Actions secret.",
    );
  }

  return async (texts) => {
    const url = new URL(apiUrl);
    url.searchParams.set("api-version", "3.0");
    url.searchParams.set("from", sourceLanguage);
    url.searchParams.set("to", targetLanguage);
    url.searchParams.set("textType", "html");
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Ocp-Apim-Subscription-Key": apiKey,
      "X-ClientTraceId": randomUUID(),
    };
    if (region) headers["Ocp-Apim-Subscription-Region"] = region;
    const body = texts.map((text) => ({ Text: text }));

    for (let attempt = 0; attempt < 4; attempt += 1) {
      let response;
      try {
        response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(30_000),
        });
      } catch (error) {
        if (attempt === 3) {
          throw new Error(
            `Azure Translator request failed after retries: ${error instanceof Error ? error.message : error}`,
          );
        }
        await delay(1000 * 2 ** attempt);
        continue;
      }

      if (response.ok) {
        const payload = await response.json();
        const translations = Array.isArray(payload)
          ? payload.map((item) => item.translations?.[0]?.text)
          : null;
        if (
          !translations ||
          translations.length !== texts.length ||
          translations.some((translation) => typeof translation !== "string")
        ) {
          throw new Error(
            "Azure Translator returned an unexpected number of translations.",
          );
        }
        return translations;
      }

      const details = (await response.text()).slice(0, 500);
      if (!TRANSIENT_STATUS_CODES.has(response.status) || attempt === 3) {
        throw new Error(
          `Azure Translator request failed (${response.status}): ${details}`,
        );
      }
      const retryAfter = Number(response.headers.get("retry-after"));
      await delay(
        Number.isFinite(retryAfter) && retryAfter > 0
          ? Math.min(retryAfter * 1000, 30_000)
          : 1000 * 2 ** attempt,
      );
    }

    throw new Error("Azure Translator request failed after retries.");
  };
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
  const cache = readJson(cachePath, { version: CACHE_VERSION, entries: {} });
  if (cache.version !== CACHE_VERSION || typeof cache.entries !== "object") {
    throw new Error(`Unsupported translation cache format in ${config.cacheFile}.`);
  }

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
      createAzureTranslator({
        apiUrl: process.env.AZURE_TRANSLATOR_ENDPOINT || config.apiUrl,
        apiKey: process.env.AZURE_TRANSLATOR_KEY,
        region: process.env.AZURE_TRANSLATOR_REGION,
        sourceLanguage: config.sourceLanguage,
        targetLanguage: config.targetLanguage,
      });
    const batches = createBatches(misses, config.protectedTerms ?? []);
    for (const batch of batches) {
      const translated = await translator(batch.map((item) => item.protectedText));
      if (!Array.isArray(translated) || translated.length !== batch.length) {
        throw new Error("Translation provider returned an invalid batch.");
      }
      translated.forEach((value, index) => {
        cache.entries[batch[index].cacheKey] = restoreTerms(value);
      });
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
