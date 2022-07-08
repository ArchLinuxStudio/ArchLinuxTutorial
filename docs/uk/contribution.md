# Contribution <!-- {docsify-ignore-all} -->

Click the github icon in the upper right corner of this article to view this project. There is also a link to `edit this article` at the bottom of each page, click to jump to github for editing.

The outline directory of this book is controlled by the project team members, and the content of the article can be edited freely. The main line of this book is based on practicality, and only provides a simple and concise installation line that we think is currently better. Redundant and meaningless content will not be accepted.

The addition of project resources, such as images, non-essential js files, and non-essential css files, are not accepted. Because of the blockade and restrictions on github in some countries, such files under direct connection will greatly slow down the loading speed of web pages.

This project was originally licensed under the CC BY-SA 4.0 license, and eventually switched to the CC BY-NC-ND 4.0 license, see [Why we changed the license to CC BY-NC-ND 4.0](https://github.com/ArchLinuxStudio/ArchLinuxTutorial/issues/68).

## Documentation contribution

Documentation contribution is very simple, you only need to have an editor, fork the project, modify it, and submit a pull request. Note that if you submit changes in one language, please also submit changes in the other language.

## Format convention

The philosophy of this series of documents is that you don't have to be too strict about formatting, because the content is what really matters. But there are also a few specifications that must be followed, otherwise reading will be affected.

- Use OSS code for development, format the code with the default configuration of the Prettier plugin, and use ctrl+s to automatically format and save after writing some documents.
- Each md document title organizes the content hierarchically, the main title is #, followed by ##, then ###, and so on.
- means that the fragment needs to be wrapped in markdown syntax and specify the code type, such as bash.
- In general, please try to use punctuation such as periods, commas, quotation marks, and colons as normal.
- Use markdown citation syntax for parts that need attention.
- Proper nouns can be hinted using inline code `` syntax, which is more obvious than bold.
- Inline code Please use inline code for hints.

## Code contribution

This project is written using [docsify](https://docsify.js.org/#/). If you want to contribute related code, please read the docsify project documentation first.

This project uses yarn to manage dependencies, and the structure is very simple. If you have not been exposed to it, you may need to briefly understand [yarn](https://classic.yarnpkg.com/en/)

Local debugging:

```bash
yarn install
yarn start
```
