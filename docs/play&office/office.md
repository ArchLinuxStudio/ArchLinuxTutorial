# 办公日常

本章记录日常办公需要用到的软件及配置。同时包括各类即时通讯软件和网盘、远程协助等软件的配置与使用。

> QQ 与微信等中国国内知名闭源专有 IM 软件均存在不同程度的间谍行为(实际上不仅仅是 IM 软件，几乎所有你能见到的中国国内大型互联网 APP 均有严重的间谍行为，美其名曰:用户行为监测或用户画像描述)。收集用户信息，扫描用户手机存储内容，监控粘贴版内容，记录手机安装 APP 列表等无耻行为几乎已经成为业内公开的秘密。除了自身作恶，这类专有间谍软件还与威权政府狼狈为奸，迫害与追捕民运人士以及异议人士。同时，腾讯一直以来不遗余力的封杀第三方客户端，导致始终没有一个稳定可用的版本。腾讯于 2020 年出品了官方版本 LinuxQQ，其品质可以用惨不忍睹形容。**我们不支持你使用 QQ 或微信这类专有间谍通讯软件作为你的主要通讯方式。本教程亦不提供任何支持。**

> 欧盟于近些年出台了[GDPR 通用数据保护条例](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)，国内各大知名互联网软件公司在开发海外版软件时均需严格遵守上传数据、用户隐私等规定。然而在开发中国国内版时，则尽可能上传其能获取到的全部用户个人隐私数据，这是无耻且邪恶的。我们希望尽可能多的人抵制使用这种专有软件。

> 希望所有人抵制或放弃此类恶意专有软件是不现实的，如果你不能舍弃使用这些软件，我们只能希望你可以在一个较为安全的隔离环境中使用它们，如一个不存在任何敏感个人信息的隔离物理设备中使用。使用自由开源的，注重隐私保护的通讯软件始终是正确的选择。

## 即时通讯

**我们强烈建议你使用开源自由的通讯软件，这是为了你自身的自由，也是为了身边人的自由。**

### 即时通讯软件的分类

除了 p2p 的模式，即时通讯软件分为客户端软件与服务端软件。你应该选择开源的客户端软件来使用。而对于服务端，除非你打算自行部署服务器程序，否则讨论某个即时通讯软件的服务端是否开源毫无意义，因为永远也没有人知道被部署的是否是被声称的那一份代码。

除了自身是否是开源自由的软件外，即时通讯软件从其服务端部署的形式上，可以分为三类。

- 第一类是完全中心化的通讯软件，这些软件的服务器被运营企业完全控制，并为用户提供服务。典型的例子有微信、QQ、Telegram、Signal 以及 Keybase 等。
- 第二类是分布式的，联邦式的通讯软件，这些软件的运营企业或组织一般会提供官方的服务器，但是同时支持任何人或组织自行部署服务器。同时这些服务器之间可以互相通讯。典型的例子如基于 Matrix 的通讯软件 Element。
- 第三类是完全去中心化，p2p 的通讯软件。这些软件基本无需任何服务器进行服务的提供(可能有少量的引导节点，但其除了引导不提供任何服务)，而是通讯双方直接和对方进行通讯沟通。这是一种最自由，但同时提供功能较为有限的模式。典型的例子如基于 Tox 协议的通讯软件 qTox。

下面介绍一些我们较为推荐的通讯软件。

### Telegram

Telegram，中文名一般称为电报，是一个在世界广泛应用的开源通讯软件，注重隐私保护和单人通讯加密。我们一向提醒读者不应该相信企业不作恶，但是某些极少数的企业在经过时间的检验后确实证明它们是较为值得信赖的，如 Lavabit 以及 Telegram。如过你没有进行极度敏感的活动，那么 Telegram 目前看来是值得信赖的。使用 Telegram 请不要使用+86 的中国境内电话号码注册，**请务必使用虚拟电话注册**，这是为了你的安全着想。如果你可以使用加密货币购买谷歌语音虚拟电话账户，可在[群组](https://t.me/FSF_Ministry_of_Truth)中说明"我想购买谷歌语音账户"，会有我们的管理员与你私聊，协助完成你的购买。或者，你也可以直接联系我们的[管理员](https://t.me/LLC_XMR)进行购买。注册完成后，需要在 Telegram 设置中的`Privacy and Security`中进行如下设置来保障你的隐私安全:

- Phone number 中的 Who can see my phone number 设置为 Nobody；
- Phone number 中的 Who can find me by my number 设置为 My contacts；
- 把 Contacts 一节中的 Sync contact 关闭 (仅能在手机端操作);
- 把 Contacts 一节中的 Suggest Frequent Contacts 关闭 (仅能在手机端操作);
- 点击 Contacts 一节中的 Delete synced contacts，这样即使之前有联系人，也无法再次关联到你(仅能在手机端操作);

> 注意，上述的三个仅能在手机端操作，建议在 Arch Linux 中的安卓模拟器中完成。或者在一个纯净的，刷入开源可信的 ROM 的，并未安装任何中国的闭源间谍软件的手机上操作，这是因为如果你使用了中国手机厂商的闭源操作系统以及闭源间谍软件，它们是可以获取你安装 Telegram 的行为的，并有可能与威权政府合作对你进行进一步的监视甚至抓捕。

通过以下命令在 Arch Linux 上安装 Telegram:

```bash
sudo pacman -S telegram-desktop
```

> 任何技术始终都是双刃剑。Telegram 上进行恐怖活动和诈骗活动是事实，Telegram 官方也在进行持续封禁。但是不能因为这些原因就否定或质疑其存在的意义。Telegram 同时为处于威权和独裁国家中的异议人士与民运人士提供了可靠的平台进行通讯和活动。你一定不想成为这些独裁国家政府的帮凶。

最后，如果你当前使用的设备非常敏感，那么需要在设置、高级中 关闭媒体自动下载。实际上，最安全的方式是在敏感设备上不安装使用 Telegram。

### Element

Element 是一款基于开源 Matrix 协议的分布式、联邦式的即时通讯应用客户端。它所对应的服务端 synapse 同样是自由软件，你可以自行部署服务端程序。

```bash
sudo pacman -S element-desktop
```

Element 相较于 Telegram 的最大优势是其服务端程序是开源自由的，并且可以自行部署。如果进行自行部署，这样可以保障你在与他人进行通讯时，不仅可以确定你使用的客户端是安全的，同时也能确定使用的服务端是安全的。除此之外，Element 支持群组聊天的端对端加密，这也是 Telegram 所不支持的。

由此可以看出，从部署的形势来看，Element 比 Telegram，在自行部署服务端的情况下可以获得更高强度的安全性。如果你从事极度敏感的线上活动，使用 Element 并自行部署 synapse 是比 Telegram 更好的选择。但是，在部署服务器程序的同时也要付出更多的精力与资金进行维护。

Element 官方也提供了官方的服务器 matrix.org 以供用户免费使用。如果其部署的服务确实是其宣称的那部分代码，那么这些服务器在端对端加密的情况下仅能获取一些用户的元数据。如上线时间以及交流对象等。如果自行部署服务器，这些元数据也将掌控在你自己手中。需要提醒的是，如果自行部署了服务器，还对于隐私安全要求程度很高，那么在自行部署的服务器上存在的端对端加密群组中的成员应该均在你自己的服务器上进行注册，在其他服务器，如 matrix.org 中注册的用户应该被禁止加入你自己的群组。因为如果他们加入，你自行部署的服务器上的群组中的元数据以及加密聊天数据会流转至其他服务器，这是一种危险。

### qTox

qTox 是一款基于 tox 协议制作的端对端加密即时通讯工具。除了 tox 的基本功能，qTox 还实现了离线消息发送的功能。tox 最初的想法就是创建一个即时通讯工具，无需使用中央服务器即可运行，并且点对点，端到端加密，保证用户通信的保密性和安全性。然而正是由于它的这种特性，qTox 提供的功能较为有限，如 qTox 中的群组，如果有人下线，那么他就无法接收到离线期间的群组信息。

```bash
sudo pacman -S qtox
```

qTox 在注册时会生成 Tox ID,这个 ID 用来添加好友，并且在此 ID 中存在注册时的用户 IP 信息，用来作为未来进行连接的一种方式。qTox 的连接方式如下，首先 qTox 会去连接一些[启动节点](https://nodes.tox.chat/)，这些启动节点会获取你当前的 IP 并为你提供你想要通讯的对象的 IP。如果启动节点没有你想要通讯的对象的 IP，那么则会尝试使用对方 Tox ID 中的 IP 进行连接。如果均无法建连，则失败。qTox 在中国被屏蔽的原因可能是因为中国政府屏蔽了所有启动节点，同时由于大多数人没有稳定可达的公网 IP,所以导致在不翻墙时无法正确建连。

### IRC

IRC，因特网中继聊天，是一种古老的交流方式，在开源社区中仍被广泛使用，常用的客户端有 WeeChat，以及 Emacs 的 erc。

```bash
sudo pacman -S weechat
```

### 屏幕分享

除了上述软件，对于另外一些手机通讯软件在电脑上的投屏可以尝试使用[scrcpy](https://archlinux.org/packages/community/x86_64/scrcpy/)。
也可以使用 [KDE Connect](https://archlinux.org/packages/extra/x86_64/kdeconnect/) 在电脑上获取 Android 通知。

## 办公套件

主要两个选择是 [LibreOffice](https://wiki.archlinux.org/index.php/LibreOffice)以及[onlyoffice](<https://aur.archlinux.org/packages/onlyoffice-bin/)>)<sup>AUR</sup>。 我们建议你使用开源的 LibreOffice 以及 onlyoffice，而不是专有软件 WPS,前两者其目前的安装已经非常简单。

```bash
sudo pacman -S libreoffice-still   #稳定版
sudo pacman -S libreoffice-fresh   #尝鲜版
yay -S onlyoffice-bin
```

一些老式的 chm 文档的阅读，可以安装`kchmviewer`。

```bash
sudo pacman -S kchmviewer
```

## 打印机

对于日常办公来说，打印机是非常必要的。除此之外，我们建议读者维持一份纸质的密码，包括你可以将你加密货币钱包中的私钥打印出来保存，这是非常好的一个方案。对于打印机的品牌，我们建议使用惠普打印机。其对于 Linux 的支持非常全面，可以去其[网站](https://hplipopensource.com/)查看所支持的设备等详情。在 Arch Linux 上，安装包 hplip 以及 cups ，启动服务后即可使用。

```bash
sudo pacman -S hplip
sudo pacman -S cups
sudo systemctl enable --now cups.service
```

## 笔记本

Joplin 是一个简单的 markdown 笔记本，具有标签和层级等基础功能。并且具有 cli 和 desktop 两个版本。其 LICENSE 为 MIT 。

```
yay -S joplin # cli
yay -S joplin-desktop # desktop
```

Trilium 是一个开源的 electron 笔记软件，它支持 markdown 还有 evernote 格式的导入，并且支持 markdown 和 html 的导出格式。其本身具有标签、无限层级、关系图以及历史记录等功能，基于 CKEditor 所见即所得的 markdown 编辑器。并且支持在服务器上自己搭建。其 LICENSE 为 AGPL 3.0 。

```
yay -S trilium-bin
yay -S trilium-server-bin
```

## 电子书

pdf 可直接用浏览器打开，也可选用其他专用的阅读软件，如[okular](https://archlinux.org/packages/extra/x86_64/okular/)或者[calibre](https://archlinux.org/packages/community/x86_64/calibre/)。okular 在打开大型 epub 时会非常卡顿,并且图片模糊不清，[Foliate](https://archlinux.org/packages/community/x86_64/foliate/) 是阅读 epub 的更佳选择。

## RSS 阅读器

RSS 阅读器 newsflash 是 feedreader 的精神继承者，支持本地 RSS 源和 RSS API 的读取，由 Rust 写成。 目前 feedreader 已经不再维护。也可使用 liferea。

```
sudo pacman -S newsflash
```

## 文献管理

JabRef 是 java 编写的并且与 LaTeX 协作较好的开源文献管理软件，可以与 vim, Emacs 协作，并通过 bib 格式管理文献。

```
yay -S jabref
```

Zotero 是一个开源的，基于 Firefox 解决方案的应用，其可以通过 VSCode 插件和 vim 插件进行引用。beta 版本具有笔记和内置 PDF 阅读器功能。

```
yay -S zotero
yay -S zotero-beta #具有笔记和内置 PDF 阅读器
```

## 截图

推荐使用 flameshot 火焰截图

```
sudo pacman -S flameshot
```

快捷键的命令是`flameshot gui`，可在 KDE 设置中加入设置快捷键为你所熟悉的键位。或者尝试另一种流行的 KDE 出品的截图软件 [spectacle](https://archlinux.org/packages/extra/x86_64/spectacle/)

## 下载存储

> 不要使用任何墙国国内的网盘存储你的个人数据，他们可以根据"相关条款与规定"，或者"自我阉割"的精神觉悟随意处置你的所有数据，在仔细阅读过他们的用户协议后，你会觉得毛骨悚然。墙国网盘只能用来存储无关紧要的垃圾数据。

> 不要使用迅雷、旋风等墙国类似软件。关于 BT 的原理及迅雷的恶行可参考文章[为什么国内 BT 环境如此恶劣？](https://zhuanlan.zhihu.com/p/87193566)

- [Mega](https://aur.archlinux.org/packages/megasync/)<sup>AUR</sup> 新西兰注重隐私的老牌网盘，也可直接使用 [web 版本](https://mega.nz/fm/dashboard)
  > Mega 网盘也许存在一些争议，但是选择 Mega 还是选择一些和威权政府合作非常愉快的网盘，结论非常明显。
- [onedrive](https://aur.archlinux.org/packages/onedrive-abraunegg/)<sup>AUR</sup> 微软创办的网盘业务，linux 下存在一个命令行客户端
- [qbtorrent-enhance-version](https://aur.archlinux.org/packages/qbittorrent-enhanced/)<sup>AUR</sup> 老牌 BT 客户端增强版，支持填入 tracker 的 URL 网址进行拉取，配合[TrackersListCollection 项目](https://github.com/XIU2/TrackersListCollection)使用更佳。

## 图片浏览

在桌面环境与必要应用一节中已经安装了 [gwenview](https://archlinux.org/packages/extra/x86_64/gwenview/)，它基本可以满足日常看图的需求。如果另需快速看图软件，可以尝试以下软件。

- [feh](https://www.archlinux.org/packages/extra/x86_64/feh/)
- [nomacs](https://www.archlinux.org/packages/community/x86_64/nomacs/)

## 常用系统组件

日常办公中所需要用到的各类小工具有很多实现，其中 KDE 的套件中就有很多，可以自行查询，此处仅列出几个常用的例子。

- [Kcalc](https://archlinux.org/packages/extra/x86_64/kcalc/) 计算器
- [Kamoso](https://archlinux.org/packages/extra/x86_64/kamoso/) 相机
- [Cheese](https://archlinux.org/packages/extra/x86_64/kamoso/) 茄子相机
- [KTimer](https://archlinux.org/packages/extra/x86_64/ktimer/) 倒计时执行器

## 远程协助

如需连接 windows 远程机器，你可以使用开源的[freerdp](https://archlinux.org/packages/community/x86_64/freerdp/)协议，配合开源实现[Xrdp](https://wiki.archlinux.org/title/Xrdp)，或者[Rdesktop](https://wiki.archlinux.org/title/Rdesktop)即可。

如需链接 Linux 服务器，大多数场景使用 ssh 即可。

如果以上解决方案不能满足你，那么可以尝试免费使用的专有软件[teamviewer](https://aur.archlinux.org/packages/teamviewer/)<sup>AUR</sup>，其完善的功能基本可以满足全部需求。需要注意安装后需按照提示启动服务。

```bash
sudo systemctl enable --now teamviewerd
```
