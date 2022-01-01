# Arch Linux 安装使用教程 - ArchTutorial - Arch Linux Studio <!-- {docsify-ignore-all} -->

Arch Linux 安装使用教程，每日实时更新！包含从 Arch Linux 安装，科学上网，透明代理，显卡驱动，日常软件的使用等，另附媒体制作，编程等你可能需要的全部内容。让 Arch Linux 成为你的常用系统吧！

本书提供我们多年使用 Linux 的一些经验，并教与需要的人。与 Linux 密不可分的另一部分: [GNU](https://www.gnu.org/home.zh-cn.html)  
新读者请确保你已经按照步骤完成了`新手上路`章节中的**全部内容**后再向下阅读，否则可能会出现问题。

- 本书特点
  - Linux 二次元电报交流群:[ArchLinuxStudio🇨🇦🏳️‍⚧️🏳️‍🌈](https://t.me/FSF_Ministry_of_Truth)。
  - 无废话，只给出一套**我们认为**较为合适的路线，不会面面俱到。本书是 tutorial,不是 reference，定位与 wiki.archlinux.org 不同。
  - 本书使用 docsify 以及 gitalk 开发，并且网站源码全部开源，可放心留言讨论。本网站亦不使用任何有害跟踪器脚本，你可通过 [Brave 浏览器](https://brave.com/zh/)进行检测验证。
  - 本书会持续更新。每日随时根据最新 arch linux 及相关软件动态更新。[鼓励志愿者提交更新](/contribution.md)。
  - 如有必要，相关位置都会贴上 arch linux 相关官方文档作为参考。
  - 不支持任何双系统。

> **本书采用 CC BY-NC-ND 4.0 协议[[1]](https://github.com/ArchLinuxStudio/ArchLinuxTutorial/issues/68)。欢迎提交Pull requests，但是禁止商业用途与演绎。**

> 请不要在上述群组以外的任何群组反馈本文档相关问题。这会为它们带来困扰以及不愉快的心情。

## 为什么使用 Linux？

简单来说，现在世界上流行的 PC 操作系统有三个，Windows，Linux 与 macOS。

如果你是计算机相关专业的学生或者从业者，非常建议你使用 Linux 作为自己的日常系统。在使用 Linux 系统的过程中，可以无形中接触到各个方面的计算机知识，并且在未来的工作中也会为你带来相关方面的优势。 macOS 在一些方面（即大致为 BSD 与 GNU/Linux 各方面的区别 )与 Linux 的操作并不同，并且由于其封闭的特性，我们不建议使用。Windows 在很多编程环境的配制过程中异常痛苦，且会出现各种各样的问题，强烈不建议使用 Windows 进行编程(除非你学的就是 Windows 系统编程)。

更重要的是，GNU/Linux 是自由软件运动的相关重要产物。[自由软件运动(free software movement)](https://zh.wikipedia.org/wiki/%E8%87%AA%E7%94%B1%E8%BD%AF%E4%BB%B6%E8%BF%90%E5%8A%A8)拒绝专有软件并推广自由软件,它的终极目标在于解放网络世界中的每个人——即每个电脑用户。每个人都应拥有完全掌控所运行软件的权利。[自由软件](https://www.gnu.org/philosophy/free-sw.zh-cn.html)有如下四项原则：

- 自由度 0：无论用户出于何种目的，必须可以按照用户意愿，自由地运行该软件。
- 自由度 1：用户可以自由地学习并修改该软件，以此来帮助用户完成用户自己的计算。作为前提，用户必须可以访问到该软件的源代码。
- 自由度 2：用户可以自由地分发该软件的拷贝，这样就可以助人。
- 自由度 3：用户可以自由地分发该软件修改后的拷贝。借此，用户可以把改进后的软件分享给整个社区令他人也从中受益。作为前提，用户必须可以访问到该软件的源代码。

如果你只是一个普通用户，你一定见识过没有经过你的授权，电脑被装上了成堆的流氓软件的类似经历。专有软件不仅在各个维度强奸着用户，更包含着难以想象的恶意功能。用户的数据，隐私等重要信息会轻而易举被大公司们收集走，并加以滥用，这成为业内公开的秘密已是不争的事实。在专用软件有同类的自由软件替代时，强烈建议你迁移至自由软件。本书会同时记录专有软件与自由软件，因为如果完全摒弃专有软件，一定会直接将很多人阻挡在 linux 之外，这不是我们所希望的，我们希望先将更多人接纳到 GNU/Linux 中，至少这是踏出的第一步。但这并不代表我们支持使用专有软件，我们希望你至少可以先踏入 linux，逐渐使用自由软件替代专有软件。专有软件在本书中仅作简要记录，不会详细描述，因为我们不希望你长期依赖于它。只要某个专有软件有足够优秀的自由软件替代品出现，我们就会移除本教程中的那个专有软件。专有软件在本书中会被角标<sup>专有</sup>或描述额外标记。如果你是有能力的开发者，更希望你可以开发出替代某些专有软件的自由软件。

最后，如果你想尝试完全免费的系统，或是喜欢探索充满新鲜与挑战的事物，Linux 也是你不可错过的体验。

## 为什么使用 Arch Linux？

最重要的，Arch Linux 的软件包是最新的，这在日常使用中非常必要，你可以第一时间享受到新软件的特性，而不用烦心于升级软件时的过旧依赖的问题。其提供的软件包可以让你轻松安装使用，而不用自行编译。除此之外，用户仓库 AUR 由世界各地的 Arch Linux 用户驱动，提供了海量的非官方软件以供选择。Arch Linux 在灵活与易用两方面达到了几乎完美的平衡。

Arch Linux 可以以超高的自由度来定制自己的系统，并且其拥有最完善的[文档](https://wiki.archlinux.org/index.php/Main_page)，使得绝大多数问题都可以通过查看官方文档的方式解决。正是由于其软件更新的策略的激进，如果条件允许，建议使用者经常对 Arch Linux 进行更新。较长时间段内没有升级可能会造成各种问题（俗称 `滚挂了`），虽然大多数问题可以通过救援手段事后补救，但还是常常更新得好。同时，关注 Arch Linux 的[新闻列表](https://archlinux.org/news/)可以帮助你得知最新的升级注意事项。

## 配套视频分 P 列表

有第三方视频作者为本教程制作了讲解视频，欢迎与文档对照收看，效果更好，效率更高。视频可能出现更新不及时的情况，如果遇到分歧，请以文档为准。

- [1:GNU/Linux 与自由软件运动](https://www.youtube.com/watch?v=oabwNGWRtL0)
- [2:安装前的准备](https://www.youtube.com/watch?v=FzKp-Z_Yn4U)
- [3:ArchLinux 基础安装](https://www.youtube.com/watch?v=TZe8L3fzqZ8)
- [4:安装 KDE 与常用软件](https://www.youtube.com/watch?v=BfqbFrE--Bc)
- [5:魔法学院](https://www.youtube.com/watch?v=HNfT8uz7qEM)
- [6:显卡驱动安装综述](https://www.youtube.com/watch?v=k5KsKLofOHs)
- [7:成为不合格的系统管理员](https://www.youtube.com/watch?v=h8sWpIicNt0)
- [8:真理学院](https://www.youtube.com/watch?v=m0ctfPF-2_I)
- [9:功耗控制](https://www.youtube.com/watch?v=N04x1Y51Q2M)
- [10:系统美化](https://www.youtube.com/watch?v=FRN61XPiTyE)
- [11:故障排除](https://www.youtube.com/watch?v=MHm6JMsnVjw)
- [12:办公日常](https://www.youtube.com/watch?v=5Wu4U-trG18)
- [13:视频影音](https://www.youtube.com/watch?v=I8ufGO39NQc)
- [14:游戏娱乐](https://www.youtube.com/watch?v=oakycLgKt54)
- [15:安卓刷机](https://www.youtube.com/watch?v=ek16poKw1MQ)
- [16:直播与多媒体](https://www.youtube.com/watch?v=d2ZLMpdVrkk)
- [17:編程軟件](https://www.youtube.com/watch?v=LOtxFQO82XE)

<!-- windows是最好的Linux发行版？It's only a BORING joke. -->
