# 魔法加油站

不论你是否是程序员，你肯定需要这个东西。本文`不会教授`魔法上网的搭建步骤，假定你已经有了一串 ss 或者任何什么的链接，然后仅告诉你在 Linux 上个人认为当前最好用的客户端和配置方式。

目前 Linux 上最好用的是 [Qv2ray](https://qv2ray.net/) 这个软件。它是跨平台的，你在 Windows 与 macOS 均可使用。安装如下几个包

```bash
sudo pacman -S qv2ray v2ray
```

你需要按照官方文档导入已有的链接，其余细节请详细阅读 Qv2ray 的文档。

如果你不使用原生 shadowsocks/v2ray 而是其余方式，请在 AUR 搜索关键字 qv2ray-plugin，在[结果](https://aur.archlinux.org/packages/?O=0&K=qv2ray-plugin)中选取你所需要的对应插件进行安装。

可在首选项，入站设置中勾选设置系统代理，Qv2ray 会自行帮你设置`系统代理`。注意，`系统设置`中的代理配置在 KDE 桌面环境中并不是所有应用都会遵守，经过测试，chrome/chromium 浏览器与 steam 会遵循 KDE 的系统代理设置。没有遵循系统设置代理的应用还需要单独进行代理配置。下面说明几种常用的软件中配置代理的方式。

- Firefox 浏览器  
  火狐浏览器自身的设置选项中存在代理配置，进行配置即可。

- 终端  
  可以通过 export 命令设置当前终端的代理方式。比如使用 tldr 或 github raw 等资源需要设置 https 代理。

```bash
export https_proxy=http://127.0.0.1:8889
```

- code OSS  
   code => preference => settings  
   搜索 proxy，在其中填入 http 代理地址即可

- proxychains-ng  
  如果对于一个应用，KDE 的全局代理不生效，在终端 export 了 ALL_PROXY 变量再用终端启动此应用代理也不生效，并且这个应用自身也没有配置代理的选项，此时可以尝试使用 proxychains-ng，它可以为单行命令配置代理。它是一个预加载的 hook，允许通过一个或多个 SOCKS 或 HTTP 代理重定向现有动态链接程序的 TCP 流量。

  ```bash
  sudo pacman -S proxychains-ng
  sudo vim /etc/proxychains.conf
  ```

  把配置文件中最后一行改为本地代理的 ip 和端口，如`socks5 127.0.0.1 1080`  
  同时搜索`proxy_dns`， 在这一行前添加#注释掉此行，否则使用 proxychains 启动 yay 会报错  
  使用代理方式为在单一命令前添加 proxychains

  ```bash
  proxychains yay -S crossover
  ```

  拓展链接: [windows 版本 proxychains 的自述文档](https://github.com/shunf4/proxychains-windows/blob/master/README_zh-Hans.md)

备用手段：建议自建备用，或持有多个机场。不想花钱的或者自备一下[lantern](https://aur.archlinux.org/packages/lantern-bin/)这类软件以防万一。还有一些电报群组有共享的链接资源，如[这个](https://t.me/wtovpn)或者[这个](https://t.me/TG_Mtproxy_1)。

可以看到，为各个软件单独设置代理还是较为麻烦。如果这种方式可以满足你的需求，那么你可以到此为止。如果你需要更全面的流量代理，可以阅读下面的透明代理章节。
