(() => {
  "use strict";

  const REPOSITORY = "https://github.com/ArchLinuxStudio/ArchLinuxTutorial";
  const THEME_STORAGE_KEY = "archtutorial-theme";
  let lastUpdatedManifestPromise;
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
    language: "zh-CN",
  });

  function normalizeFile(file) {
    return (file || "README.md").replace(/^\//, "");
  }

  function currentRoute() {
    return decodeURI(window.location.hash.split("?")[0].replace(/^#/, "") || "/");
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
    const minutes = readingMinutes(activeMarkdown);

    return {
      before: `
        <div class="article-meta" aria-label="页面信息">
          <span class="article-meta__item article-reading-time">约 ${minutes} 分钟阅读</span>
          <span class="article-meta__separator" aria-hidden="true"></span>
          <span class="article-meta__item article-updated" data-file="${normalizeFile(activeFile)}">更新于：正在获取…</span>
        </div>
      `,
      after: `
        <footer class="article-footer">
          <p>发现错误或过时步骤？</p>
          <a href="${editUrl(activeFile)}" target="_blank" rel="noopener noreferrer">在 GitHub 上编辑此页 <span aria-hidden="true">↗</span></a>
        </footer>
        <nav class="page-navigation" aria-label="上一篇与下一篇"></nav>
        <section class="comments-section" aria-labelledby="comments-title">
          <div class="comments-heading">
            <p class="eyebrow">GitHub 评论</p>
            <h2 id="comments-title">社区讨论</h2>
            <p>使用 GitHub 登录，参与当前页面的讨论。</p>
          </div>
          <div id="gitalk-container" aria-live="polite"></div>
        </section>
      `,
    };
  }

  async function fetchLastUpdated(file) {
    if (!lastUpdatedManifestPromise) {
      lastUpdatedManifestPromise = fetch(new URL("last-updated.json", document.baseURI), {
        cache: "no-cache",
        headers: { Accept: "application/json" },
      }).then((response) => {
        if (!response.ok) throw new Error(`Last-updated metadata responded with ${response.status}`);
        return response.json();
      });
    }

    const dates = await lastUpdatedManifestPromise;
    const date = dates[normalizeFile(file)];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
      throw new Error(`No last-updated date for ${file}`);
    }
    return date;
  }

  function updateLastModified() {
    const element = document.querySelector(".article-updated");
    if (!element) return;

    const file = element.dataset.file;
    fetchLastUpdated(file)
      .then((date) => {
        element.textContent = `更新于：${date}`;
      })
      .catch(() => {
        element.textContent = "更新日期暂不可用";
      });
  }

  function enhanceCodeBlocks() {
    document.querySelectorAll(".markdown-section pre").forEach((block) => {
      if (block.querySelector(":scope > .copy-code")) return;

      const button = document.createElement("button");
      button.className = "copy-code";
      button.type = "button";
      button.textContent = "复制";
      button.setAttribute("aria-label", "复制代码");
      button.addEventListener("click", async () => {
        const code = block.querySelector("code")?.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "已复制";
        } catch {
          button.textContent = "复制失败";
        }
        window.setTimeout(() => {
          button.textContent = "复制";
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
      wrapper.setAttribute("aria-label", "可横向滚动的表格");
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

    const items = [
      { source: links[currentIndex - 1], className: "previous", label: "上一篇", arrow: "←" },
      { source: links[currentIndex + 1], className: "next", label: "下一篇", arrow: "→" },
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
      container.textContent = "评论暂时无法加载。";
      return;
    }

    try {
      const gitalk = new window.Gitalk(commentOptions());
      gitalk.render("gitalk-container");
    } catch {
      container.textContent = "评论暂时无法加载。";
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
    alias: {
      "/.*/_sidebar.md": "/_sidebar.md",
    },
    auto2top: true,
    routerMode: "hash",
    notFoundPage: true,
    subMaxLevel: 3,
    maxLevel: 4,
    topMargin: 88,
    externalLinkTarget: "_blank",
    externalLinkRel: "noopener noreferrer",
    search: {
      paths: "auto",
      depth: 4,
      noData: "没有找到相关内容",
      placeholder: "搜索教程…",
    },
    plugins: [tutorialPlugin],
  };
})();
