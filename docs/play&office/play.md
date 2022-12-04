# 娱乐软件

## 网游网络加速

对于在 Linux 上玩网游，网络加速一直是一个难题，尤其是在玩一些外服网游的时候。这里提供一些思路来在 Linux 下对网游加速。

- 一些机场会提供网游游戏节点，这些节点专门为游戏优化，限制流量并且提高倍率，一般可以得到较好的加速效果。在 Linux 中配合 [透明代理](/advanced/transparentProxy)，同时开启对 UDP 流量的代理加速，即可以得到优化网游网速的效果。
- 一些中端或者高端的路由器，会内置一些市面上常见的网游加速器，如果你的路由器有这个功能，那可以直接使用路由器内置的加速器加速本机的网游流量。或者你也可以使用 openwrt 配合安装支持 openwrt 的加速器插件。不要使用网易 uu 路由器加速插件，它会错误的将 Linux PC 识别为安卓手机，根据它的逻辑，如果设备被识别为手机，那只能加速手游而不能加速 PC 游戏。目前，网易 uu 加速器已将 Linux PC 移出识别范围，如有需求，请使用其他品牌的路由器加速插件。
- 在虚拟机或 wine 执行市面上常见的网游加速客户端，理论上也是可以起到加速效果的。但是目前来说执行起来较为复杂，理论上是可行的，未来可能会有更方便的工具出现。关于原理可以参考[Wine 待研究课题：让 Windows 版网游加速器的虚拟网卡模式可在 Linux 下工作](https://hu60.cn/q.php/xsBEbMHq-5hkgyEFTaIlwB-00AAA/bbs.topic.95016.html)以及[在 Linux 中通过虚拟机使用 Windows 版网游加速器](https://hu60.cn/q.php/bbs.topic.95932.html)

## 原生仓库游戏

Arch Linux 官方仓库和 AUR 中存在一些原生支持的游戏，列举如下

- [shattered-pixel-dungeon](https://aur.archlinux.org/packages/shattered-pixel-dungeon/) 破碎像素地牢 生存游戏
- [0ad](https://archlinux.org/packages/community/x86_64/0ad/) 被誉为开源帝国时代
- [openra](https://archlinux.org/packages/community/any/openra/) 红警 1 的开源实现

## Steam

[官方文档](https://wiki.archlinux.org/index.php/Steam)

一些字体和驱动已经在`新手上路`章节中配置完成。若有安装问题请自查。

此外，如果某些游戏启动或者游玩有问题，可以用终端使用`steam`命令启动 steam 客户端，并观察游戏崩溃时的终端报错。一般都是缺少某种依赖造成的，可以根据具体情况自行安装依赖。同时，archlinux 官方文档也提供了一个 [查错页面](https://wiki.archlinux.org/index.php/Steam/Game-specific_troubleshooting)，记录了一些游戏崩溃的解决方式。

安装 Steam<sup>专有</sup>：

```bash
sudo pacman -S steam
```

steam 上的游戏可分为有 Linux 原生支持的，以及通过[Steam Play](https://wiki.archlinux.org/index.php/Steam#Proton_Steam-Play)游玩的两大类。Steam Play(Proton) 基于 Wine,可以让你在 Linux 上游玩只支持 Windows 平台的游戏。关于非 Linux 平台的游戏，通过 Steam Play 运行的可玩程度，可通过[protondb](https://www.protondb.com/)这个网站进行查询。如果玩某个游戏出现问题，在这个网站里你也可以找到玩家发布的各个游戏的修正方式。有时最新版 Proton 可能存在问题，这时自行尝试其他版本即可。

另外，github 上还存在一些官方 Proton 的 fork 版本，如 [Proton GE](https://github.com/GloriousEggroll/proton-ge-custom)，可以支持一些额外的，官方暂不支持或支持不完善的游戏。使用方式也很简单，根据官方文档，下载 release 的压缩包到指定位置，重启 steam 后即可选择特定版本的 GE proton。

如有些游戏启动器启动不了，可以去游戏目录尝试直接执行游戏本体的可执行文件。

有问题还可以去 github 查询。如 V 社的 [csgo 仓库](https://github.com/ValveSoftware/csgo-osx-linux/issues)

最近的 steam 官方的 proton 不能正确检测系统的 fsync,依然以 esync 模式启动游戏。更换 GE 版本的 proton 可以正确检测并使用 fsync 模式启动游戏。

> 游戏锁区解决办法：让你的 steam 处于一个国家的代理下，如日本。先随便加一个游戏到购物车，在购物车右上角国家地区改成日本，再去访问已锁区的游戏，就可以浏览购买了。

## Lutris

Lutris 基于 Wine，提供了大量游戏在 Linux 下的解决方案。其为你已经配置好了 Wine 相关的一切配置，你只需要安装游玩即可。一般极少需要额外配置。进入 [官网](https://lutris.net/) 在右上角搜索你想玩的游戏。点击进入游戏页面后，可以看到在相应版本右侧有一个 install 按钮，点击后即可拉起 Lurtis 进行安装。玩游戏前要先装好 [驱动](https://github.com/lutris/docs/blob/master/InstallingDrivers.md) 和 [依赖](https://github.com/lutris/docs/blob/master/WineDependencies.md)。注意，此两个文档中没有列出 vkd3d 与 lib32-vkd3d 两个可选安装项，然而目前大多数大型游戏均需安装此两个包，读者需按需添加安装。同时在 lutris 中，需要根据容器种类选择开启 Esync 或 Fsync。

在 Lutris 的各个游戏页面，一般有玩家上传的报告，如你遇到不能运行的状况，可以详细翻阅一下历史 Issue,包括已经标记为已解决的。

如果你发现还是无法登陆某些游戏，检查你的代理设置。比如你是国服的帐号，但是代理挂的是日本的，那是无法登陆的，可以换一个香港的代理再尝试。

如果无法更新游戏，在需要更新游戏的时候，将 Wine 版本设置为系统的 Wine staging 版本，如果最新的 wine-staging 版本仍然闪退，可以退回到以前可用的容器版本。如果依旧无法更新，可以尝试重新安装游戏启动器。在更新完毕后，需要启动游戏时，再将 wine 版本设置为 Lutris 自带的版本。

如遇到无法启动闪退的情况，可以尝试在命令行启动 Lutris，再启动游戏即可，玄学、不知道原因。如果启动器中启动游戏还是闪退，可以尝试把 Lutris 容器的启动文件从启动器改到游戏本体的可执行文件。还有另一个更通用的方式，可以使用 Lutris 的功能 `Run EXE inside wine prefix`，然后选择游戏本体就可以通过验证玩游戏了。`Run EXE inside wine prefix` 的位置在 Lutris 下方，点击小酒杯，最后一个。

如果习惯使用各类游戏插件，也可以安装在同一个容器里，一般功能是可以正常使用的。

## 原生 Wine

安装使用原生 [Wine](https://wiki.archlinux.org/index.php/Wine) 也可运行 windows 游戏，但是很多情况下需要你自行处理 Windows 下的依赖问题，常用的工具是 [winetricks](https://archlinux.org/packages/multilib/x86_64/winetricks/)。这种方式费时费力，只运行无需处理依赖的小游戏或者 gal 还好。

终端运行 winecfg，可以开启 wine 设置页面，按照终端提示可以安装缺少的包。

## Galgame

本小节对 Wine 运行 Galgame 可能存在的问题进行描述。

如果存在某些语言的字体问题，最直接的方法是将所需要的字体放置于容器的字体目录中。wine 的默认目录为`~/.wine`。

使用 Wine 运行游戏可能会出现 [GStreamer](https://wiki.archlinux.org/title/GStreamer) 插件缺失的问题，如

```bash
Missing decoder: Advanced Streaming Format (ASF) (video/x-ms-asf)
```

在按照 Wiki 安装好各个插件后，错误可能依然存在，这是因为大多 Galgame 需要 32 位兼容库，而目前 arch linux 官方 Multilib 仓库中的 gst32 位兼容库并不完整，如目前缺失`lib32-gst-plugins-ugly`这个包，此包目前只存在于 AUR 中，但是已经落后。ASF 存在于此包中，因此缺失导致此报错。

Ref:

- https://bbs.archlinux.org/viewtopic.php?id=249982
- https://archlinux.org/packages/?q=gst
- https://aur.archlinux.org/packages/lib32-gst-plugins-ugly

## 性能提升

在进行某些游戏时，如《Total War: THREE KINGDOMS》，如遇到性能问题，可尝试调节 cpu 频率调节器[[1]](https://support.feralinteractive.com/docs/zh_cn/threekingdomstw/1.0.15/linux/faqs/?access=zooevrj6xb&utm_source=game_linux&utm_medium=link&utm_campaign=game_linux_threekingdomstw_support#i_linux_cpu_governor)。

[GameMode](https://github.com/FeralInteractive/gamemode) 是一款综合性的游戏性能调整软件，其提供了多种游戏性能优化功能。如有需要可以查询 github 页面查看详情。

## 性能监控

和微星的 Afterburner 软件中性能显示的部分类似，Linux 上也有一款同类软件可以监控游戏中的电脑性能，名为[MangoHud](https://github.com/flightlessmango/MangoHud)。使用方式可参见此项目的 readme。在 ArchLinux 中，安装包 [mangohud](https://aur.archlinux.org/packages/mangohud)以及[lib32-mangohud](https://aur.archlinux.org/packages/lib32-mangohud)。

此外，MangoHud 官方提供图形化的参数设置软件 [GOverlay](https://github.com/benjamimgois/goverlay#arch--manjaro--other-arch-derivatives)，可以自行选择安装。

## 可选内核更换

一般来说，采用了 fsync 的 patch 的内核游戏性能会更好。尤其在一些采用.Net 的 wine 游戏中，fsync 会有明显的性能提升[[1]](https://github.com/ValveSoftware/Proton/issues/3706#issuecomment-636632984)。目前 Linux 内核并没有加入 fsync 功能，可以更换 zen 内核。

```bash
sudo pacman -S linux-zen linux-zen-headers
```

安装完毕后重新更新一下 grub 即可。

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

> 如果你使用英伟达显卡，记得更换驱动为相应的 dkms 版本。一般来说较新的显卡安装 nvidia-dkms 即可。

## 游戏手柄

一般情况下手柄通过数据线连接计算机即可直接使用。支持无线的手柄（DUALSHOCK® 3、DUALSHOCK® 4、Xbox 360、Xbox One、8BitDo 等）也可以通过蓝牙直接连接，无需额外操作。

虽然无线手柄一般情况下可以通过蓝牙直连，但是通常这样会有较大的延迟。使用 [Xbox 无线适配器](https://www.microsoftstore.com.cn/accessories/microsoft-xbox-wireless-adapter) 以获得近乎有线的低延迟体验。

为了在 Arch Linux 下使用 Xbox 无线适配器，需要安装第三方开源驱动 [xow](https://github.com/medusalix/xow)。

1. 安装 [xow](https://aur.archlinux.org/packages/xow-git/)<sup>AUR</sup>：

   ```sh
   yay -S xow
   ```

2. 启动 `xcow` 服务：

   ```sh
   sudo systemctl enable xow.service
   ```

3. 重启计算机，插入 Xbox 无线适配器并和 Xbox 手柄配对即可

实际体验和 Windows 下并无差异。对延迟敏感的音游（如 [喵斯快跑](https://store.steampowered.com/app/774171/Muse_Dash/)）在游戏设置中微调偏移值即可。
