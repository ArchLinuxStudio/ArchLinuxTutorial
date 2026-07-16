# 英文文档自动翻译

中文 `docs` 目录是本站内容的唯一来源。`docs/uk` 中的英文 Markdown 由构建流程生成，请不要直接编辑。

## 实现方式

翻译完全使用开源的 [Argos Translate](https://github.com/argosopentech/argos-translate) 在本地完成，不调用在线翻译 API，也不需要注册账号、添加密钥或绑定付款方式。

- 翻译引擎：Argos Translate 1.11.0（MIT）
- 语言模型：`translate-zh_en` 1.9
- 运行位置：开发者本机或 GitHub Actions Runner
- 外部请求：仅在首次安装时下载 Python 依赖和开源语言模型
- 后续运行：只翻译未命中仓库缓存的新增或修改段落

GitHub Actions 会缓存语言模型，并把生成的英文页面与 `.i18n-cache/argos-zh-en.json` 一并提交回仓库。无需配置 Repository secret 或 variable。

## 同步规则

- 新增中文 Markdown：创建同路径英文页面。
- 修改中文 Markdown：只翻译没有命中段落缓存的内容。
- 删除中文 Markdown：删除同路径英文页面。
- 移动或重命名：删除旧英文页面并创建新页面。
- 代码块、行内代码、链接目标、图片地址和 HTML 注释保持原样。
- 根路径文档链接自动增加 `/uk` 前缀。
- `i18n.config.json` 中配置的项目品牌名称保持原文。
- 翻译失败时不写入部分结果，也不会部署不完整版本。

## 本地运行

首次运行先安装 Python 依赖：

```bash
python -m pip install -r requirements-i18n.txt
```

然后执行：

```bash
yarn translate
```

第一次运行会自动下载固定版本的中英语言模型。以后日常只需要维护中文文档；英文页面和翻译缓存由自动化流程维护。

如果系统中的 Python 命令不是 `python` 或 `python3`，可以通过 `ARGOS_PYTHON` 环境变量指定解释器路径。
