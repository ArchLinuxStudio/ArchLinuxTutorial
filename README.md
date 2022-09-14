<p align="center">
<img width="240" height="80" align="left" style="float: left; margin: 0 10px 0 0;" src="https://www.archlinux.org/static/logos/archlinux-logo-dark-1200dpi.b42bd35d5916.png" alt="ArchLinuxStudio_ArchLinuxTutorial"/>
</br>
<h1>Arch Linux 安装使用教程</h1>

每日实时更新！本书包含从 Arch Linux 安装，科学上网，魔法充能，到显卡驱动，日常软件的使用等，另附媒体制作，编程，加密货币在 ArchLinux 上的使用等你可能需要的全部内容。让 Arch Linux 成为你的常用系统吧！提供在线网页文档。

本项目隶属于 ArchLinuxStudio，一个加拿大社区组织。ArchLinuxStudio 不是官方 ArchLinux 本身。

</p>

[![Badge](https://img.shields.io/badge/link-ArchLinuxTutorial-%230088cc.svg)](https://archlinuxstudio.github.io/ArchLinuxTutorial)
[![Join matrix community and chat about arch linux](https://img.shields.io/matrix/ArchLinuxStudio:matrix.org?label=matrix&logo=matrix&logoColor=ffffff&color=7389D8&labelColor=6A7EC2&cacheSeconds=60&server_fqdn=matrix.org)](https://matrix.to/#/#ArchLinuxStudio:matrix.org)
[![Join telegram community and chat about arch linux](https://img.shields.io/discord/628978428019736619?label=telegram&logo=telegram&logoColor=ffffff&color=7389D8&labelColor=6A7EC2&cacheSeconds=60)](https://t.me/FSF_Ministry_of_Truth)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FArchLinuxStudio%2FArchLinuxTutorial&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![Lines](https://img.shields.io/tokei/lines/github/ArchLinuxStudio/ArchLinuxTutorial)](https://img.shields.io/tokei/lines/github/ArchLinuxStudio/ArchLinuxTutorial)
[![lastcommit](https://img.shields.io/github/last-commit/ArchLinuxStudio/ArchLinuxTutorial)](https://img.shields.io/github/last-commit/ArchLinuxStudio/ArchLinuxTutorial)
[![Donate with Bitcoin](https://img.shields.io/static/v1?label=DonatewithBTC&message=1Lth3oca4WnMnTnwHBcDLkEqniA2pBxkeC&color=ef8e19)]()
[![Donate with Ethereum](https://img.shields.io/static/v1?label=DonatewithETH&message=0x5A218a8d570d9947f42e0a4916ece7a60A181c2d)]()
[![Donate with Litecoin](https://img.shields.io/static/v1?label=DonatewithLTC&message=LdJXzaSzzrAxfKJdj5effRLcC7k1TbuXJ8&color=325a98)]()
[![Donate with Monero](https://img.shields.io/static/v1?label=DonatewithXMR&message=43KJJZztPtBC7k8ZjJpuw7bThW1mUH6N947TeNxvsSHD7DywRN365WZ7qpSxVopSd7cg4PFjMuUewjfvATUtTKGQLMboU36&color=ea6521)]()

<!-- shields not support telegram online count now, use sample discord instead temporarily -->

## [阅读地址](https://ArchLinuxStudio.github.io/ArchLinuxTutorial/#/)

为推动自由软件运动而撰写的 ArchLinux 中文教程。

- 本书特点
  - 我们始终将读者的隐私和安全放在首位，使用自由软件可以为你提供相当幅度上的保障。提出所谓的"实用"或"避免意识形态争议"而对自由软件运动进行质疑的人或组织是愚蠢且邪恶的。
  - 本书为处于互联网被封锁和审查地区的读者提供完善且可靠的科学上网流程，如果有人认为其是"不和谐的"，我们表示非常遗憾。
  - 本书样式保持尽可能的简洁，以提升读者的网站加载速度。同时，我们认为花哨的样式不应存在于一本较为严肃的书籍中。
  - 无废话，只给出一套**我们认为**较为合适的路线，对于安装流程尽可能保持简洁，不会面面俱到。本书是 tutorial,不是 reference，定位与官方 wiki 不同。更多的内容请读者自行查看 Arch Wiki 或查阅相关资料。知其然知其所以然当然是正确的，但填入过多的内容不是一本 tutorial 所应该做的事。
  - 本书使用 docsify 以及 gitalk 开发，并且网站源码全部开源，可放心留言讨论。本网站亦不使用任何有害跟踪器脚本，所提供的文件下载不进行任何审计与监视，你可通过 [Brave 浏览器](https://brave.com/zh/)以及阅读源码进行检测验证。
  - Linux & ACG [Telegram Group:ArchLinuxStudio🇨🇦🏳️‍⚧️🏳️‍🌈](https://t.me/FSF_Ministry_of_Truth) ||| [Matrix Group:ArchLinuxStudio🇨🇦🏳️‍⚧️🏳️‍🌈](https://matrix.to/#/#ArchLinuxStudio:matrix.org)。

> **本书采用 CC BY-NC-ND 4.0 协议[[1]](https://github.com/ArchLinuxStudio/ArchLinuxTutorial/issues/68)。欢迎提交Pull requests，但是禁止商业用途与演绎。任何"下游文档"都是未经授权且违反协议的。**

> 请不要在上述群组以外的任何群组反馈本文档相关问题。这会为它们带来困扰以及不愉快的心情。

## 支持与捐赠

如果本书对你有所帮助，请推荐给你身边有所需要的朋友们，这是对我们最大的支持！

如果能接受到加密货币捐赠，我们将非常感谢。有你的支持，ArchLinuxStudio 社区将变得更加充实与活跃。

- Donate with Bitcoin: `1Lth3oca4WnMnTnwHBcDLkEqniA2pBxkeC`
- Donate with Ethereum: `0x5A218a8d570d9947f42e0a4916ece7a60A181c2d`
- Donate with Litecoin: `LdJXzaSzzrAxfKJdj5effRLcC7k1TbuXJ8`
- Donate with Monero: `43KJJZztPtBC7k8ZjJpuw7bThW1mUH6N947TeNxvsSHD7DywRN365WZ7qpSxVopSd7cg4PFjMuUewjfvATUtTKGQLMboU36`

## Star 历史

[![Stargazers over time](https://starchart.cc/ArchLinuxStudio/ArchLinuxTutorial.svg)](https://starchart.cc/ArchLinuxStudio/ArchLinuxTutorial)
