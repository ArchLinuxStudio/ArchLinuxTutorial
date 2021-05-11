# 科学上网与翻墙

本节描述如何在 linux 下进行科学上网。不论你是否是程序员，你肯定需要这个东西。如果没有配置好科学上网，那么你在日常使用中会遇到各种问题，因为只要是境外或者被墙的资源或代码等，你都有可能都无法下载下来，或者下载速度慢的让人难以接受。强烈建议所有人配置好科学上网再继续。

> DO NOT USE XRAY 不要使用 XRAY

> Xray 是 V2ray 社区分裂的产物，其主要开发者在各个渠道发表过众多令人不适的言论。很明显其并不认可自由软件运动所倡导的理念，同时其在 Qv2ray 主要开发者退出开发后，Xray 的 Telegram 频道发布的公告明显带有严重的主观感情色彩，没有客观的描述事件本身，利用断章取义的方式诋毁开源软件和社区。即使 Xray-core 是开源的，但这并不能说明什么。Xray 最新的客户端已经宣布为闭源软件。

## 已有科学上网的节点的情况

此处提供一个机场推荐，可以点击[此处](https://foxicloud.com/#/register?code=cLoCawdD)直接购买。

不论你是从机场处获得节点或者任何其他地方获得，如果你已经有了形如`vmess://`或`ss://`前缀的节点，那么可以直接使用 linux 上非常好用的 [Qv2ray](https://qv2ray.net/) 进行科学上网。它是跨平台的，你在 Windows 与 macOS 上均可使用。安装如下几个包：

```bash
sudo pacman -S qv2ray v2ray
```

你需要按照官方文档导入已有的链接，其余细节请详细阅读 Qv2ray 的文档。

如果你不使用原生 shadowsocks/v2ray 而是其余方式，请在 AUR 搜索关键字 qv2ray-plugin，在[结果](https://aur.archlinux.org/packages/?O=0&K=qv2ray-plugin)中选取你所需要的对应插件进行安装。

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
   code => preference => settings  
   搜索 proxy，在其中填入 http 代理地址即可

- proxychains-ng  
  如果对于一个应用，KDE 的全局代理不生效，在终端 export 了 ALL_PROXY 变量再用终端启动此应用代理也不生效，并且这个应用自身也没有配置代理的选项，此时可以尝试使用 proxychains-ng，它可以为单行命令配置代理。它是一个预加载的 hook，允许通过一个或多个 SOCKS 或 HTTP 代理重定向现有动态链接程序的 TCP 流量。

  ```bash
  sudo pacman -S proxychains-ng
  sudo vim /etc/proxychains.conf
  ```

  把配置文件中最后一行改为本地代理的 ip 和端口，如`socks5 127.0.0.1 1089`  
  同时搜索`proxy_dns`， 在这一行前添加#注释掉此行，否则使用 proxychains 启动 yay 会报错  
  使用代理方式为在单一命令前添加 proxychains

  ```bash
  proxychains yay -S crossover
  ```

  拓展链接: [windows 版本 proxychains 的自述文档](https://github.com/shunf4/proxychains-windows/blob/master/README_zh-Hans.md)

## 没有节点，需要自建的节点的情况

这种情况下，你则需要自行购买服务器进行节点搭建，本节不进行教学，仅提供三篇 GFW Report 的高质量文章作为参考。

- [如何部署一台抗封锁的 Shadowsocks-libev 服务器](https://gfw.report/blog/ss_tutorial/zh/)
- [防御 GFW 主动探测的实用指南](https://gfw.report/blog/ss_advise/zh/)
- [Shadowsocks 是如何被检测和封锁的](https://gfw.report/talks/imc20/zh/)

备用手段：建议自建备用，或持有多个机场。不想花钱的或者自备一下[lantern](https://aur.archlinux.org/packages/lantern-bin/)这类软件以防万一。还有一些电报群组有共享的链接资源，如[这个](https://t.me/wtovpn)或者[这个](https://t.me/TG_Mtproxy_1)。

可以看到，为各个软件单独设置代理还是较为麻烦。如果这种方式可以满足你的需求，那么你可以到此为止。如果你需要更全面的流量代理，可以阅读进阶章节中的[透明代理](advanced/transparentProxy)一文。

## 有关 qv2ray 的替代

2021 年 4 月 28 日，qv2ray 迄今为止的代码量最大贡献者 gcc 宣布退出开发。

起因在于其意在取消对 xray 的支持，并在检测到 xray 时导致程序崩溃。xray 从诞生起始终在社区中存在争议。而社区中另外一位仓库 owner 认为这种处理方式太过偏激，不同意这种举措。在交流无果后此 owner 取消了其仓库权限，并将其移除 qv2ray workgroup。这种做法显然是其在感情上无法接受的，随后其注销了 github 帐号并宣布退出开发。而随后 xray 频道发表的公告明显带有严重的主观感情色彩，没有客观的描述事件本身，利用断章取义的方式诋毁开源软件和社区。此公告没有任何实际意义，只会加剧误解的程度。

这种结果是任何一个 linux 用户都不愿看到的，希望 qv2ray 开发组可以重新开启交流，得出一个折中的方案。以防万一，这里也记录一种 qv2ray 的替代方案。

V2rayA 是一个浏览器客户端，在 linux 下支持全局代理，非常方便。可以直接在 AUR 进行安装。安装后需启动服务

```bash
yay -S v2raya
sudo systemctl enable --now v2raya
```

随后在菜单中搜索 v2raya，点击即可打开浏览器页面。在其中加入订阅即可使用。在设置中建议开启全局透明代理，同时开始防止 DNS 劫持功能，否则可能会拿不到被 dns 污染的资源(如 github raw)。

更多使用方法请看[官方文档](https://github.com/v2rayA/v2rayA/wiki)与[项目地址](https://github.com/v2rayA/v2rayA)
