(() => {
  "use strict";

  const REPOSITORY = "https://github.com/ArchLinuxStudio/ArchLinuxTutorial";
  const THEME_STORAGE_KEY = "archtutorial-theme";
  const updateCache = new Map();
  let activeMarkdown = "";
  let activeFile = "README.md";

  const commentOptions = () => ({
    clientID: "296c581fc4b2a837a1e3",
    clientSecret: "7e7f0ad1809fa4a1915430ade04835f6849ab56a",
    repo: "ArchLinuxTutorialComments",
    owner: "ArchLinuxStudio",
    admin: ["ryosukeeeeee"],
    distractionFreeMode: false,
    id: decodeURI(window.location.hash.split("?")[0]),
    language: "en",
  });

  function normalizeFile(file) {
    return (file || "README.md").replace(/^\//, "");
  }

  function currentRoute() {
    return decodeURI(window.location.hash.split("?")[0].replace(/^#/, "") || "/");
  }

  function isEnglishRoute() {
    return currentRoute() === "/uk" || currentRoute().startsWith("/uk/");
  }

  function readingMinutes(markdown) {
    const clean = markdown
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/https?:\/\/\S+/g, " ");
    const hanCharacters = (clean.match(/[\u3400-\u9fff]/g) || []).length;
    const words = (clean.match(/[A-Za-z0-9][A-Za-z0-9'_-]*/g) || []).length;
    return Math.max(1, Math.ceil(hanCharacters / 350 + words / 220));
  }

  function encodedFilePath(file) {
    return normalizeFile(file)
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
  }

  function editUrl(file) {
    return `${REPOSITORY}/edit/master/docs/${encodedFilePath(file)}`;
  }

  function articleChrome() {
    const english = isEnglishRoute();
    const minutes = readingMinutes(activeMarkdown);
    const readingLabel = english ? `${minutes} min read` : `约 ${minutes} 分钟阅读`;
    const updateLabel = english ? "Updated: fetching…" : "更新于：正在获取…";
    const editLabel = english ? "Edit this page on GitHub" : "在 GitHub 上编辑此页";
    const discussionTitle = english ? "Community discussion" : "社区讨论";
    const discussionText = english
      ? "Sign in with GitHub to join the discussion for this page."
      : "使用 GitHub 登录，参与当前页面的讨论。";

    return {
      before: `
        <div class="article-meta" aria-label="Page information">
          <span class="article-meta__item article-reading-time">${readingLabel}</span>
          <span class="article-meta__separator" aria-hidden="true"></span>
          <span class="article-meta__item article-updated" data-file="${normalizeFile(activeFile)}">${updateLabel}</span>
        </div>
      `,
      after: `
        <footer class="article-footer">
          <p>${english ? "Found a problem or an outdated step?" : "发现错误或过时步骤？"}</p>
          <a href="${editUrl(activeFile)}" target="_blank" rel="noopener noreferrer">${editLabel} <span aria-hidden="true">↗</span></a>
        </footer>
        <nav class="page-navigation" aria-label="${english ? "Previous and next pages" : "上一篇与下一篇"}"></nav>
        <section class="comments-section" aria-labelledby="comments-title">
          <div class="comments-heading">
            <p class="eyebrow">${english ? "GitHub Comments" : "GitHub Comments"}</p>
            <h2 id="comments-title">${discussionTitle}</h2>
            <p>${discussionText}</p>
          </div>
          <div id="gitalk-container" aria-live="polite"></div>
        </section>
      `,
    };
  }

  async function fetchLastUpdated(file) {
    const normalized = normalizeFile(file);
    if (updateCache.has(normalized)) return updateCache.get(normalized);

    const storageKey = `archtutorial-updated:${normalized}`;
    const cached = sessionStorage.getItem(storageKey);
    if (cached) {
      updateCache.set(normalized, cached);
      return cached;
    }

    const endpoint =
      "https://api.github.com/repos/ArchLinuxStudio/ArchLinuxTutorial/commits" +
      `?per_page=1&path=docs/${encodedFilePath(normalized)}`;
    const response = await fetch(endpoint, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);

    const commits = await response.json();
    const date = commits?.[0]?.commit?.committer?.date?.slice(0, 10);
    if (!date) throw new Error("No commit date returned");

    updateCache.set(normalized, date);
    sessionStorage.setItem(storageKey, date);
    return date;
  }

  function updateLastModified() {
    const element = document.querySelector(".article-updated");
    if (!element) return;

    const file = element.dataset.file;
    const english = isEnglishRoute();
    fetchLastUpdated(file)
      .then((date) => {
        element.textContent = english ? `Updated: ${date}` : `更新于：${date}`;
      })
      .catch(() => {
        element.textContent = english ? "Update date unavailable" : "更新日期暂不可用";
      });
  }

  function enhanceCodeBlocks() {
    document.querySelectorAll(".markdown-section pre").forEach((block) => {
      if (block.querySelector(":scope > .copy-code")) return;

      const button = document.createElement("button");
      button.className = "copy-code";
      button.type = "button";
      button.textContent = isEnglishRoute() ? "Copy" : "复制";
      button.setAttribute("aria-label", isEnglishRoute() ? "Copy code" : "复制代码");
      button.addEventListener("click", async () => {
        const code = block.querySelector("code")?.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = isEnglishRoute() ? "Copied" : "已复制";
        } catch {
          button.textContent = isEnglishRoute() ? "Failed" : "复制失败";
        }
        window.setTimeout(() => {
          button.textContent = isEnglishRoute() ? "Copy" : "复制";
        }, 1600);
      });
      block.append(button);
    });
  }

  function enhanceTables() {
    document.querySelectorAll(".markdown-section table").forEach((table) => {
      if (table.parentElement?.classList.contains("table-scroll")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-scroll";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", isEnglishRoute() ? "Scrollable table" : "可横向滚动的表格");
      table.before(wrapper);
      wrapper.append(table);
    });
  }

  function uniquePageLinks() {
    const seen = new Set();
    return [...document.querySelectorAll(".sidebar-nav a")].filter((link) => {
      const hash = link.hash || "";
      const route = decodeURI(hash.split("?")[0].replace(/^#/, "") || "/");
      if (!hash.startsWith("#/") || hash.includes("?id=") || seen.has(route)) return false;
      seen.add(route);
      return true;
    });
  }

  function buildPageNavigation() {
    const container = document.querySelector(".page-navigation");
    if (!container) return;

    const links = uniquePageLinks();
    const route = currentRoute();
    const currentIndex = links.findIndex((link) => {
      const linkRoute = decodeURI(link.hash.split("?")[0].replace(/^#/, "") || "/");
      return linkRoute === route;
    });
    if (currentIndex < 0) return;

    const english = isEnglishRoute();
    const items = [
      { source: links[currentIndex - 1], className: "previous", label: english ? "Previous" : "上一篇", arrow: "←" },
      { source: links[currentIndex + 1], className: "next", label: english ? "Next" : "下一篇", arrow: "→" },
    ];

    for (const item of items) {
      if (!item.source) continue;
      const link = document.createElement("a");
      link.className = `page-navigation__link page-navigation__link--${item.className}`;
      link.href = item.source.getAttribute("href");
      const direction = document.createElement("span");
      direction.className = "page-navigation__direction";
      direction.textContent = `${item.arrow} ${item.label}`;
      const title = document.createElement("strong");
      title.textContent = item.source.textContent.trim();
      link.append(direction, title);
      container.append(link);
    }
  }

  function renderComments() {
    const container = document.getElementById("gitalk-container");
    if (!container) return;
    if (typeof window.Gitalk !== "function") {
      container.textContent = isEnglishRoute()
        ? "Comments are temporarily unavailable."
        : "评论暂时无法加载。";
      return;
    }

    try {
      const gitalk = new window.Gitalk(commentOptions());
      gitalk.render("gitalk-container");
    } catch {
      container.textContent = isEnglishRoute()
        ? "Comments are temporarily unavailable."
        : "评论暂时无法加载。";
    }
  }

  function updateLanguageControls() {
    const english = isEnglishRoute();
    const route = currentRoute();
    const languageLink = document.querySelector(".language-switch");

    document.documentElement.lang = english ? "en" : "zh-CN";
    if (languageLink) {
      const target = english
        ? route.replace(/^\/uk(?=\/|$)/, "") || "/"
        : `/uk${route === "/" ? "/" : route}`;
      languageLink.href = `#${target}`;
      languageLink.textContent = english ? "中" : "EN";
      languageLink.setAttribute("aria-label", english ? "切换到中文" : "Switch to English");
    }
  }

  function updateThemeButton() {
    const button = document.querySelector(".theme-toggle");
    if (!button) return;
    const dark = document.documentElement.dataset.theme === "dark";
    button.setAttribute("aria-label", dark ? "切换浅色主题" : "切换深色主题");
    button.title = dark ? "浅色主题" : "深色主题";
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(THEME_STORAGE_KEY, next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      next === "dark" ? "#0b1118" : "#f5f8fb",
    );
    updateThemeButton();
  }

  function updateScrollUi() {
    const root = document.documentElement;
    const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
    const bar = document.querySelector(".reading-progress span");
    const backToTop = document.querySelector(".back-to-top");
    if (bar) bar.style.transform = `scaleX(${progress})`;
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 560);
  }

  function bindGlobalInteractions() {
    const mobileSidebarQuery = window.matchMedia("(max-width: 900px)");

    document.querySelector(".theme-toggle")?.addEventListener("click", toggleTheme);
    document.querySelector(".back-to-top")?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", updateScrollUi, { passive: true });
    window.addEventListener("resize", updateScrollUi, { passive: true });
    document.addEventListener("keydown", (event) => {
      const tag = event.target?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || event.target?.isContentEditable;
      if (event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const search = document.querySelector(".search input");
        if (search) {
          event.preventDefault();
          search.focus();
        }
      }
    });
    document.addEventListener("click", (event) => {
      if (!mobileSidebarQuery.matches) return;

      const sidebar = document.querySelector(".sidebar");
      const target = event.target;
      if (!sidebar?.classList.contains("show") || !(target instanceof Element)) return;
      if (sidebar.contains(target) || target.closest(".sidebar-toggle")) return;

      document.querySelector(".sidebar-toggle-button")?.click();
    });
    updateThemeButton();
    updateScrollUi();
  }

  function tutorialPlugin(hook, vm) {
    hook.beforeEach((markdown) => {
      activeMarkdown = markdown;
      activeFile = normalizeFile(vm.route.file);
      return markdown;
    });

    hook.afterEach((html, next) => {
      const chrome = articleChrome();
      next(`${chrome.before}${html}${chrome.after}`);
    });

    hook.mounted(() => {
      bindGlobalInteractions();
    });

    hook.doneEach(() => {
      updateLanguageControls();
      updateLastModified();
      enhanceCodeBlocks();
      enhanceTables();
      buildPageNavigation();
      renderComments();
      updateScrollUi();
    });
  }

  window.$docsify = {
    name: "ArchTutorial",
    nameLink: "#/",
    logo: "./arch.svg",
    repo: REPOSITORY,
    homepage: "README.md",
    loadNavbar: false,
    loadSidebar: true,
    auto2top: true,
    routerMode: "hash",
    notFoundPage: true,
    subMaxLevel: 3,
    maxLevel: 4,
    topMargin: 88,
    externalLinkTarget: "_blank",
    externalLinkRel: "noopener noreferrer",
    formatUpdated: "{YYYY}-{MM}-{DD}",
    search: {
      paths: "auto",
      depth: 4,
      noData: "没有找到相关内容",
      placeholder: "搜索教程…",
    },
    plugins: [tutorialPlugin],
  };
})();
