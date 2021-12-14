# 魔法学院

> 重要！中国大陆国家互联网信息办公室在 2021 年 11 月 14 号发布的《网络数据安全管理条例（征求意见稿）》中，明确的将俗称的，法律及条文中之前未有明确定义的“墙”定义为`数据跨境安全网关`，在此条例生效后，可以预见“翻墙违法”将正式有法可依。

> 为了你的人身安全，不要在任何装有具有间谍性质的专有软件的设备上使用科学上网客户端。这些设备可以是手机，PC 等。在手机上，权威部门可以轻易得到你所安装的应用列表，并可以查询到你所做的事和发表的言论，并采取进一步控制，这是有先例的。理论上，在 PC 设备上也完全存在这种可能。如果你必须要使用微信，QQ 等具有间谍性质的专有软件，请在完全隔离的物理设备中使用。

本节描述如何在 linux 下进行科学上网。不论你是否是程序员，你肯定需要这个东西。如果没有配置好科学上网，那么你在日常使用中会遇到各种问题，因为只要是境外或者被墙的资源或代码等，你都有可能都无法下载下来，或者下载速度慢的让人难以接受。所有人必须配置好科学上网再继续。

## 已有科学上网的节点的情况

不论你是从机场处获得节点或者任何其他地方获得，如果你已经有了形如`vmess://`或`ss://`前缀的节点，那么可以直接使用 linux 上非常好用的 [Qv2ray](https://qv2ray.net/) 进行科学上网。它是跨平台的。Qv2ray 最新版本 3.0 已经转至 Shadowsocks-NET 项目组下，这里是[项目地址](https://github.com/Shadowsocks-NET/Qv2ray)。

安装如下几个包：

```bash
sudo pacman -S v2ray
yay -S qv2ray-static-bin-nightly
```

安装后在 Plugins 中，选择 V2ray Core Plugin，并进行 V2ray 的设置。现在你已经可以使用。

> 在 Qv2ray3.0 中 VMESS MD5 与非 0 的 AlterID 的形式已不被支持，若你的机场或节点下发的 AlterID 是非 0 是无法使用的。如果服务端支持，你可将 AlterID 改为 0 来使用 VMessAEAD 形式。

你需要按照官方文档导入已有的链接，其余细节请详细阅读 Qv2ray 的文档。

> 需要注意的是，最新的 qv2ray 已经将机场的默认订阅类型改为规范:SIP008。如果你的机场订阅类型为 base64,则需要在分组->订阅设置->订阅类型 中，将 SIP008 改为 base64,否则你将拿不到任何订阅链接中的节点。

在节点链接后，Qv2ray 会自行为你设置系统代理。注意，`系统设置`中的代理配置在 KDE 桌面环境中并不是所有应用都会遵守，经过测试，chrome/chromium 浏览器与 steam 会遵循 KDE 的系统代理设置。没有遵循系统设置代理的应用还需要单独进行代理配置。下面说明几种常用的软件中配置代理的方式。

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

## 没有节点，需要自建的节点的情况

这种情况下，你则需要自行购买服务器进行节点搭建，本节不进行教学，仅提供三篇 GFW Report 的高质量文章作为参考。

- [如何部署一台抗封锁的 Shadowsocks-libev 服务器](https://gfw.report/blog/ss_tutorial/zh/)
- [防御 GFW 主动探测的实用指南](https://gfw.report/blog/ss_advise/zh/)
- [Shadowsocks 是如何被检测和封锁的](https://gfw.report/talks/imc20/zh/)

备用手段：建议自建备用，或持有多个机场以防失联。

不想花钱的也可安装[lantern](https://aur.archlinux.org/packages/lantern-bin/)和[塞风](https://psiphon3.com/zh/index.html)以防万一。它们都是自由软件。lantern 在 archlinux 下可直接安装使用。当你被威权国家进行互联网封锁时，可以非常方便的发送空邮件到get@psiphon3.com以获取塞风下载链接来应急。

还有一些电报群组有共享的链接资源，如[这个](https://t.me/wtovpn)或者[这个](https://t.me/TG_Mtproxy_1)。使用公共节点需要自行承担可能的风险。

## 更加全面的系统级全局代理

由以上各部分可以看到，为各个软件单独设置代理是很麻烦的。如果你把 Linux 作为主力使用，那么配置透明代理也是必须的，可以阅读随后的[透明代理](advanced/transparentProxy)一节。

## 备选方案 V2rayA

V2rayA 是一个浏览器客户端，在 linux 下支持全局代理，非常方便。可以直接在 AUR 进行安装。安装后需启动服务

```bash
yay -S v2raya-bin
sudo systemctl enable --now v2raya
```

随后在菜单中搜索 v2raya，点击即可打开浏览器页面。在其中加入订阅即可使用。在设置中建议开启全局透明代理，同时开始防止 DNS 劫持功能，否则可能会拿不到被 dns 污染的资源(如 github raw)。

更多使用方法请看[官方文档](https://v2raya.org/)与[项目地址](https://github.com/v2rayA/v2rayA)

## 常见问题

- 如果你先前使用过 2.x 的旧版本 Qv2ray ，需要首先删除旧版 Qv2ray 以及不兼容的配置。同时需要注意，Qv2ray 3.0 与旧版插件不兼容。

```bash
rm -rf ~/.config/qv2ray
sudo pacman -R qv2ray-dev-git
```

- 如果你不使用常见的 ss/vmess 而是其余方式，目前 Qv2ray 3.0 并不支持，如有需要可以选择安装 2.7 版本的 `qv2ray-dev-git` 并安装对应插件。请在 AUR 搜索关键字 qv2ray-plugin，在[结果](https://aur.archlinux.org/packages/?O=0&K=qv2ray-plugin)中选取你所需要的对应插件进行安装。注意，安装此包需要翻墙，你可以使用终端代理，或者后续讲述的透明代理。

- proxychains 不能够支持 yay 以及其他一些程序，详见[Incompatible with proxychains](https://github.com/Jguer/yay/issues/429)。这种情况可以考虑终端代理或者透明代理，更推荐透明代理。

---

Ref:

1. [CMake_package_guidelines](https://wiki.archlinux.org/title/CMake_package_guidelines#Prefix_and_library_install_directories)
2. [windows 版本 proxychains 的自述文档](https://github.com/shunf4/proxychains-windows/blob/master/README_zh-Hans.md)
