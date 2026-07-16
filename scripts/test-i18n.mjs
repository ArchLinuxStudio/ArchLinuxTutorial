import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createAzureTranslator, syncTranslations } from "./i18n-core.mjs";

const root = mkdtempSync(join(tmpdir(), "archtutorial-i18n-"));

function write(path, content) {
  const target = join(root, path);
  mkdirSync(join(target, ".."), { recursive: true });
  writeFileSync(target, content, "utf8");
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

try {
  const originalFetch = globalThis.fetch;
  try {
    let capturedRequest;
    globalThis.fetch = async (url, options) => {
      capturedRequest = { url: String(url), options };
      const requestBody = JSON.parse(options.body);
      return new Response(
        JSON.stringify(
          requestBody.map((item) => ({
            translations: [{ text: `Translated: ${item.Text}`, to: "en" }],
          })),
        ),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const azureTranslator = createAzureTranslator({
      apiUrl: "https://api.cognitive.microsofttranslator.com/translate",
      apiKey: "test-key",
      region: "global",
      sourceLanguage: "zh-Hans",
      targetLanguage: "en",
    });
    const azureResult = await azureTranslator(["你好"]);
    assert.deepEqual(azureResult, ["Translated: 你好"]);
    const requestUrl = new URL(capturedRequest.url);
    assert.equal(requestUrl.searchParams.get("api-version"), "3.0");
    assert.equal(requestUrl.searchParams.get("from"), "zh-Hans");
    assert.equal(requestUrl.searchParams.get("to"), "en");
    assert.equal(requestUrl.searchParams.get("textType"), "html");
    assert.equal(
      capturedRequest.options.headers["Ocp-Apim-Subscription-Key"],
      "test-key",
    );
    assert.equal(
      capturedRequest.options.headers["Ocp-Apim-Subscription-Region"],
      "global",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  write(
    "i18n.config.json",
    JSON.stringify({
      sourceDirectory: "docs",
      outputDirectory: "docs/uk",
      cacheFile: ".i18n-cache/en.json",
      sourceLanguage: "ZH",
      targetLanguage: "EN",
      excludeFiles: ["_navbar.md"],
      protectedTerms: ["Arch Linux", "pacman"],
    }),
  );
  write(
    "docs/README.md",
    [
      "# 中文首页",
      "",
      "使用 Arch Linux 和 `pacman`。[阅读指南](/guide/start)",
      "",
      "![截图](./image.png)",
      "",
      "```bash",
      "echo 中文代码不翻译",
      "```",
      "",
    ].join("\n"),
  );
  write("docs/_sidebar.md", "- [阅读指南](/guide/start)\n- [关于](about.md)\n");
  write("docs/guide/start.md", "# 开始\n\n第一段。\n\n第二段。\n");
  write("docs/_navbar.md", "- [中文](/)\n");
  write("docs/uk/orphan.md", "obsolete\n");

  const dictionary = new Map([
    ["中文首页", "Chinese home"],
    [
      '使用 <span class="notranslate">Arch Linux</span> 和 ',
      'Use <span class="notranslate">Arch Linux</span> and ',
    ],
    ["。", "."],
    ["阅读指南", "Read the guide"],
    ["截图", "Screenshot"],
    ["关于", "About"],
    ["开始", "Start"],
    ["第一段。", "First paragraph."],
    ["第二段。", "Second paragraph."],
    ["修改后的第二段。", "Updated second paragraph."],
  ]);
  let translatedTexts = 0;
  const translateBatch = async (texts) => {
    translatedTexts += texts.length;
    return texts.map((text) => dictionary.get(text) ?? text);
  };

  const first = await syncTranslations({ root, translateBatch });
  assert.equal(first.sourceFiles, 3);
  assert.equal(first.deletedFiles, 1);
  assert.match(read("docs/uk/README.md"), /^<!-- AUTO-GENERATED:/u);
  assert.match(read("docs/uk/README.md"), /# Chinese home/u);
  assert.match(read("docs/uk/README.md"), /`pacman`/u);
  assert.match(read("docs/uk/README.md"), /\]\(\/uk\/guide\/start\)/u);
  assert.match(read("docs/uk/README.md"), /!\[Screenshot\]\(\.\/image\.png\)/u);
  assert.match(read("docs/uk/README.md"), /echo 中文代码不翻译/u);
  assert.match(read("docs/uk/_sidebar.md"), /\]\(\/uk\/about\.md\)/u);
  assert.throws(() => read("docs/uk/orphan.md"));
  assert.throws(() => read("docs/uk/_navbar.md"));

  const firstCallCount = translatedTexts;
  const second = await syncTranslations({ root, translateBatch });
  assert.equal(second.cacheMisses, 0);
  assert.equal(translatedTexts, firstCallCount);

  write("docs/guide/start.md", "# 开始\n\n第一段。\n\n修改后的第二段。\n");
  const modified = await syncTranslations({ root, translateBatch });
  assert.equal(modified.cacheMisses, 1);
  assert.match(read("docs/uk/guide/start.md"), /Updated second paragraph\./u);

  rmSync(join(root, "docs/guide/start.md"));
  const deleted = await syncTranslations({ root, translateBatch });
  assert.equal(deleted.deletedFiles, 1);
  assert.throws(() => read("docs/uk/guide/start.md"));

  console.log("Translation sync tests passed (add, update, cache, route, and delete).");
} finally {
  rmSync(root, { recursive: true, force: true });
}
