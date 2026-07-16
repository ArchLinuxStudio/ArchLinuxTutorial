# 英文文档自动翻译

中文 `docs` 目录是本站内容的唯一来源。`docs/uk` 中的英文 Markdown 由构建流程生成，请不要直接编辑。

## 首次启用

1. 在 Azure 中创建单服务 **Translator** 资源，区域选择 **Global**，定价层选择 **Free F0**。
2. 在资源的 **Keys and Endpoint** 页面复制其中一个密钥。
3. 打开 GitHub 仓库的 **Settings → Secrets and variables → Actions**。
4. 新建名为 `AZURE_TRANSLATOR_KEY` 的 Repository secret，并填入 Azure Translator 密钥。
5. 如果资源不是 Global 区域，再创建名为 `AZURE_TRANSLATOR_REGION` 的 Repository variable，值为资源区域代码。
6. 在 GitHub Actions 中手动运行一次 **Deploy documentation**，或推送一次中文文档修改。

密钥只提供给 GitHub Actions，不会写入仓库、生成文件或浏览器代码。

## 同步规则

- 新增中文 Markdown：创建同路径英文页面。
- 修改中文 Markdown：只请求翻译没有命中段落缓存的内容。
- 删除中文 Markdown：删除同路径英文页面。
- 移动或重命名：表现为删除旧英文页面并创建新页面。
- 代码块、行内代码、链接目标、图片地址和 HTML 注释保持原样。
- 根路径文档链接自动增加 `/uk` 前缀。
- `i18n.config.json` 中的 Arch Linux 术语保持原文。
- API 请求失败时不写入部分翻译，也不会部署不完整版本。

本地拥有 Azure Translator 密钥时，可以设置 `AZURE_TRANSLATOR_KEY` 环境变量后运行 `yarn translate`。区域资源还需设置 `AZURE_TRANSLATOR_REGION`；Global 资源可以省略。日常只需维护中文文档，英文生成文件和 `.i18n-cache` 缓存由 GitHub Actions 提交。
