# 魔法学院

> **[访问互联网权](https://zh.wikipedia.org/wiki/%E8%A8%AA%E5%95%8F%E4%BA%92%E8%81%AF%E7%B6%B2%E6%AC%8A)认为所有人必须能够访问互联网，以行使和享受其言论自由、通信自由、见解自由以及其他基本人权。任何国家及地区不合理地限制个人对互联网的访问都是对基本人权的践踏。**

**为了你的人身安全，不要在任何装有具有间谍性质的专有软件的设备上使用科学上网客户端。这些设备可以是手机，PC 等。在手机上,威权政府的监管机构可以轻易得到你所安装的应用列表，并可以查询到你所做的事和发表的言论，并采取进一步控制，这是有先例的。理论上，在 PC 设备上也完全存在这种可能。如果你必须要使用微信，QQ 等具有间谍性质的专有软件，请在完全隔离的物理设备中使用。更多内容请阅读[现代隐私保护指南](https://archlinuxstudio.github.io/ModernSecurityProtectionGuide/#/)，这对你的安全非常重要！**

本节描述如何在 linux 下进行科学上网。本节以及后续的全局代理章节都是**必读章节**。如果没有配置好科学上网，那么你在日常使用中会遇到各种问题，不论是被封锁的资源或代码，还是查阅相关问题资料，你都有可能都无法下载和浏览。所有人**必须**配置好科学上网再继续。

## 1.节点的准备

简单来讲节点是形如如下的神秘链接，不论你以何种方式获得的这些连接，如果你已经拥有，可以直接阅读下面一小节。

```txt
ss://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
vmess://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

如果你没有这些连接，可以自行部署或者购买机场的订阅服务。

如果自行部署，你则需要自行购买处于自由互联网的服务器并进行节点搭建，这不在本文讨论范围内，仅提供三篇 GFW Report 的高质量文章作为参考。但是这些文章已被 GFW 屏蔽。我们之后会提供一些办法解决这个问题。

<!-- TODO GFW fucked GFW report! -->

- [如何部署一台抗封锁的 Shadowsocks-libev 服务器](https://gfw.report/blog/ss_tutorial/zh/)
- [防御 GFW 主动探测的实用指南](https://gfw.report/blog/ss_advise/zh/)
- [Shadowsocks 是如何被检测和封锁的](https://gfw.report/talks/imc20/zh/)

---

如果购买机场的订阅服务，可以参考它们的订阅流程以获取节点。在我们列出一些较为可信的机场服务以供选择，但是**我们不提供任何担保**。需要提醒的是，机场服务基本属于灰色产业，随时有停止服务的可能，购买建议以月付进行以避免过大损失。

- [GLaDOS](https://glados.rocks) 邮箱注册后使用激活码`9FMKX-GYLMK-ZYIZW-5U3T0`激活账户并获取免费时长。GLaDOS 的优势在于可以进行签到来免费使用，而且运营时间较长，较为可信。GLaDOS 并无明显的政治审计，较为可信。缺点在于速度并不算优秀。
- [白月光](https://ss.cn88.net/#/register?code=wH0Pr5l8) 新运营的机场，优点在于速度较为优秀，对流媒体解锁支持较为迅速。缺点在于其对于法轮功和虚拟货币矿场进行审计屏蔽，有一定的政治审计倾向。
- [佛系云](#) 我们列出的第一家机场。其提供了无审查的高速机场服务，曾是我们非常推荐的机场。目前服务尚可用，但是机场主处于失联状态，建议不要再进行续费。目前我们得到的消息是其受到威权政府警察的追捕，所以需要暂时隐匿，其保证其服务器会一直续费，来维持机场的可用，但我们无法确定这个保证的有效性和真实性。在重新得到机场主的确切消息之前，我们不再提供注册链接。

---

如果你不想花任何费用，可安装[lantern](https://aur.archlinux.org/packages/lantern-bin/)和[赛风](https://psiphon3.com/zh/index.html)这类软件。它们都是自由软件。

其中 lantern 在 archlinux 下可直接安装使用。因为 lantern 提供了没有被墙的 amazonaws 下载链接，通过 yay 安装即可。

```bash
yay -S lantern-bin
sudo ln -s /usr/lib64/libpcap.so /usr/lib64/libpcap.so.0.8
```

在安装完毕后，启动蓝灯即可浏览被封锁的网页。在右上角的设置中可以找到`显示高级设置`，在其中可以看到 HTTP(S)以及 SOCKS 代理服务器的地址和端口，这些值在后续的步骤中将被使用。

如果你使用赛风，可以非常方便的发送空邮件到get@psiphon3.com以获取赛风下载链接。赛风应用目前只支持 Windows\Android\IOS\MacOS 平台。当你在这些平台上能够访问自由互联网时，可以去各个渠道搜索可用的节点和代理资源，如[这个](https://t.me/wtovpn)或者[这个](https://t.me/TG_Mtproxy_1)。注意，使用公共节点需要自行承担可能的风险。

## 2.安装

Qv2ray 3.0 和 V2rayA 是两款非常优秀的在 Linux 上可用的科学上网通用客户端。你可以把二者都安装，以作备用。

<!-- 本节的每个步骤都将分为 Qv2ray 3.0 和 V2rayA 分别讲述。 -->

### Qv2ray 3.0

和上一节中所述相同的原因，由于[中国大陆政府封锁 Github](https://zh.wikipedia.org/wiki/%E5%AF%B9GitHub%E7%9A%84%E5%AE%A1%E6%9F%A5%E5%92%8C%E5%B0%81%E9%94%81#%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD)的原因，你很可能没有办法用正常 yay 的方式通过 AUR 安装[Qv2ray 3.0](https://github.com/Shadowsocks-NET/Qv2ray)，所以 ArchLinuxStudio 提供一份可以直接安装的包以供你使用。

```bash
sudo pacman -S v2ray
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/qv2ray-git-3080.dac7ed16.r.-1-x86_64.pkg.tar.zst
sudo pacman -U qv2ray-git-3080.dac7ed16.r.-1-x86_64.pkg.tar.zst
```

> github.io 也被中国大陆政府封锁，只是封锁力度暂时还没有很大。如你在此过程中卡住，可以尝试 ctrl+c 终止命令后重新尝试下载，也可尝试更换手机热点的网络环境再次进行下载。当你配置好全局代理后，你将不再需要担心任何网络封锁问题。我们将持续为本书读者提供突破互联网审查的可靠流程。

安装后在 Plugins 中，选择 V2ray Core Plugin，并进行 V2ray 的设置。现在你已经可以使用，你需要按照官方文档导入已有的链接或订阅，其余细节请详细阅读 [Qv2ray 的文档](https://qv2ray.net/)。有如下几个注意事项：

- Qv2ray3.0 中 VMESS MD5 与非 0 的 AlterID 的形式已不被支持，若你的机场或节点下发的 AlterID 是非 0 是无法使用的。如果服务端支持，你可将 AlterID 改为 0 来使用 VMessAEAD 形式。
- Qv2ray3.0 已经将机场的默认订阅类型改为规范:SIP008。如果你的机场订阅类型为 base64,则需要在分组->订阅设置->订阅类型 中，将 SIP008 改为 base64,否则你将拿不到任何订阅链接中的节点。
- **如果**你先前使用过 2.x 的旧版本 Qv2ray ，需要删除旧版 Qv2ray 以及不兼容的配置，同时旧版 Qv2ray 与新版 Qv2ray 不能共存。

  ```bash
  rm -rf ~/.config/qv2ray
  sudo pacman -R qv2ray-dev-git
  ```

- Qv2ray 3.0 与旧版插件不兼容，原有 Qv2ray 2.x 旧版插件不可使用。目前 Qv2ray 3.0 集成了 VMess、Shadowsocks 以及 Trojan 的支持，并通过[插件仓库](https://github.com/Shadowsocks-NET/QvPlugins)提供 命令行插件、测速插件、Trojan-Go 和 Naive 的支持。如果你需要使用其中的插件，则需要自行编译，并将其置入目标目录。同时，ArchLinuxStudio 也提供预先为你编译好的插件以方便你的使用。其中的 Trojan-Go 插件目前似乎并不能正常使用，其中的 hostname 以及 port 不能被正常解析[[1]](https://github.com/Shadowsocks-NET/QvPlugins/issues/1)。

  - [命令行插件](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-Command.so)
  - [测速插件](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-LatencyTest.so)
  - [Trojan-Go](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-TrojanGo.so)
  - [Naive](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-NaiveProxy.so)

### V2rayA

V2rayA 是一个浏览器客户端，使用非常方便。由于作者提供了在墙内的下载地址，可以直接在 AUR 进行安装。安装后需启动服务。

```bash
sudo pacman -S v2ray
yay -S v2raya-bin
sudo systemctl enable --now v2raya
```

随后在菜单中搜索 v2raya，点击即可打开浏览器页面。在其中加入订阅即可使用。更多使用方法请看[官方文档](https://v2raya.org/)与[项目地址](https://github.com/v2rayA/v2rayA)

## 3. 代理的初步设置

在经过上述步骤后，你应该已经有了 SOCKS5 代理以及 HTTP 代理的地址和端口。接下来进行设置。

在节点链接后，你可在`系统设置` -> `网络设置` -> `代理`中设置代理。注意，`系统设置`中的代理配置在 KDE 桌面环境中并不是所有应用都会遵守，经过测试，chrome/chromium/brave 浏览器与 steam 等应用会遵循 KDE 的系统代理设置。没有遵循系统设置代理的应用还需要单独进行代理配置。下面说明几种常用的软件中单独配置代理的方式。

- Firefox 浏览器  
  火狐浏览器自身的设置选项中存在代理配置，进行配置即可。

- 终端  
  可以通过 export 命令设置当前终端的代理方式。比如使用 tldr 或 github raw 等资源需要设置 https 代理。

  ```bash
  export https_proxy=http://127.0.0.1:8889
  export http_proxy=http://127.0.0.1:8889
  export all_proxy=http://127.0.0.1:8889
  ```

  > 不同终端命令所识别的环境变量名不同，如 all_proxy 对 curl 生效，而对 wget 则不生效，具体可查看各个命令的 man page。

- code OSS  
   File => Preference => Settings  
   搜索 proxy，在其中填入 http 代理地址即可

- proxychains-ng  
  如果对于一个应用，KDE 的全局代理不生效，在终端 export 了 ALL_PROXY 变量再用终端启动此应用代理也不生效，并且这个应用自身也没有配置代理的选项，此时可以尝试使用 proxychains-ng，它可以为单行命令配置代理。它是一个预加载的 hook，允许通过一个或多个 SOCKS 或 HTTP 代理重定向现有动态链接程序的 TCP 流量。

  ```bash
  sudo pacman -S proxychains-ng
  sudo vim /etc/proxychains.conf
  ```

  把配置文件中最后一行改为本地代理的 ip 和端口，如`socks5 127.0.0.1 1089`

  proxychains 不能够支持 yay 以及其他一些程序，详见[Incompatible with proxychains](https://github.com/Jguer/yay/issues/429)。这种情况可以使用透明代理。

## 4. 更加全面的系统级全局代理

由以上各部分可以看到，为各个软件单独设置代理是很麻烦的。如果你把 Linux 作为主力使用，那么配置透明代理也是必须的，如果你使用 V2rayA,那么可以很方便的在设置中开启全局代理，如果你使用 Qv2ray，请阅读随后的[透明代理](rookie/transparentProxy)一节。

对于全局代理的情况下，开启 UDP 支持，DNS 请求也将被拦截并导入 v2ray 中，更详细的描述将在下节进行。

---

Ref:

1. [CMake_package_guidelines](https://wiki.archlinux.org/title/CMake_package_guidelines#Prefix_and_library_install_directories)
2. [windows 版本 proxychains 的自述文档](https://github.com/shunf4/proxychains-windows/blob/master/README_zh-Hans.md)

> 中国大陆国家互联网信息办公室在 2021 年 11 月 14 号发布的《网络数据安全管理条例（征求意见稿）》中，明确的将俗称的，法律及条文中之前未有明确定义的“墙”定义为`数据跨境安全网关`，在此条例生效后，可以预见“翻墙违法”将正式有法可依。
