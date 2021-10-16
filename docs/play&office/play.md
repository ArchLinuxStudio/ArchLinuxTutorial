# 娱乐软件

## 网游网络加速

对于在 Linux 上玩网游，网络加速一直是一个难题，尤其是在玩一些外服网游的时候。这里提供一些思路来在 Linux 下对网游加速。

- 一些机场会提供网游游戏节点，这些节点专门为游戏优化，限制流量并且提高倍率，一般可以得到较好的加速效果。在 Linux 中配合 [透明代理](/advanced/transparentProxy)，同时开启对 UDP 流量的代理加速，即可以得到优化网游网速的效果。
- 一些中端或者高端的路由器，会内置一些市面上常见的网游加速器，如果你的路由器有这个功能，那可以直接使用路由器内置的加速器加速本机的网游流量。或者你也可以使用 openwrt 配合安装支持 openwrt 的加速器插件。不要使用网易 uu 路由器加速插件，它会错误的将 Linux PC 识别为安卓手机，根据它的逻辑，如果设备被识别为手机，那只能加速手游而不能加速 PC 游戏。
- 据网友说，wine 运行的网游加速器也能加速 Linux 中运行的网游，此条未成功，未验证。

## 原生仓库游戏

Arch Linux 官方仓库和 AUR 中存在一些原生支持的游戏，列举如下

- [shattered-pixel-dungeon](https://aur.archlinux.org/packages/shattered-pixel-dungeon/) 破碎像素地牢 生存游戏
- [0ad](https://archlinux.org/packages/community/x86_64/0ad/) 被誉为开源帝国时代
- [我的世界](https://aur.archlinux.org/packages/minecraft-launcher) 还有一部分人使用第三方启动器 [HMCL](https://aur.archlinux.org/packages/hmcl/)
- [openra](https://archlinux.org/packages/community/any/openra/) 红警 1 的开源实现

## Steam

由于游戏实在太多，个人肯定无法完成购买全部。如有需要可以进行联络，可以代为测试游戏在 Linux 上的可运行性。

[官方文档](https://wiki.archlinux.org/index.php/Steam)

一些字体和驱动已经在`新手上路`章节中配置完成。若有安装问题请自查。

此外，如果某些游戏启动或者游玩有问题，可以用终端使用`steam`命令启动 steam 客户端，并观察游戏崩溃时的终端报错。一般都是缺少某种依赖造成的，可以根据具体情况自行安装依赖。同时，archlinux 官方文档也提供了一个 [查错页面](https://wiki.archlinux.org/index.php/Steam/Game-specific_troubleshooting)，记录了一些游戏崩溃（如骑马与砍杀等）的解决方式。

安装 Steam<sup>专有</sup>：

```bash
sudo pacman -S steam
```

下面的清单是在 Linux 下拥有`完美体验或者表现良好`的游戏列表，分为原生组和 [Steam Play](https://wiki.archlinux.org/index.php/Steam#Proton_Steam-Play) 组两类。关于非 Linux 平台的游戏，通过 Steam Play 运行的可玩程度，可通过[protondb](https://www.protondb.com/)这个网站进行查询。如果玩某个游戏出现问题，在这个网站里你也可以找到玩家 post 的各个游戏的修正方式。有时最新版 Proton 可能存在问题，这时自行尝试其他版本即可。

另外，github 上还存在一些官方 proton 的 fork 版本，如 [Proton GE](https://github.com/GloriousEggroll/proton-ge-custom)，可以支持一些额外的，官方暂不支持或支持不完善的游戏。使用方式也很简单，根据官方文档，下载 release 的压缩包到指定位置，重启 steam 后即可选择特定版本的 GE proton。

只列出大作以及较好玩的精品，不会列举全部。

> 游戏锁区解决办法：让你的 steam 处于一个国家的代理下，如日本。先随便加一个游戏到购物车，在购物车右上角国家地区改成日本，再去访问已锁区的游戏，就可以浏览购买了。

### 原生游戏组

- [武装突袭 3](https://store.steampowered.com/app/107410/Arma_3/) 完美运行。
- [CS GO](https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/)
  在 2021 年后，csgo 始终无法正常运行。崩溃问题初步判断为视频播放解码出错，解决方案见此[链接](https://github.com/ValveSoftware/csgo-osx-linux/issues/2659#issuecomment-934357559)。注意需要同时加上全屏 fullscreen 参数。
- [十字军之王 3](https://store.steampowered.com/app/1158310/Crusader_Kings_III/) 经典的中世纪模拟器 第三部已经有官方中文了。若启动器闪退启动不了游戏，可以执行游戏目录的./binary/ck3 启动游戏。
- [Dota2](https://store.steampowered.com/app/570/Dota_2/) 完美运行，提供 openGL 与 Vulkan 两种方案。目前已经可以输入中文。
- [RimWorld](https://store.steampowered.com/app/294100/RimWorld/) 一款非常好玩的生存建设类游戏。
- [欧陆风云 4](https://store.steampowered.com/app/236850/Europa_Universalis_IV/) 没有官中。Linux 双字节补丁暂无。
- [Kingdom: Classic](https://store.steampowered.com/app/368230/Kingdom_Classic/) 挺好玩的一个像素风横版闯关类小游戏。同系列还有几个新作。
- [地铁 2033 Redux](https://store.steampowered.com/app/286690/Metro_2033_Redux/) 经典的地铁系列。
- [地铁 Last Light Redux](https://store.steampowered.com/app/287390/Metro_Last_Light_Redux/) 经典的地铁系列。
- [星露谷物语](https://store.steampowered.com/app/413150/Stardew_Valley/) 二次元像素风农场模拟器。
- [饥荒](https://store.steampowered.com/app/219740/Dont_Starve/) 中文显示有问题，需要订阅并启用中文 mod，如[这个](https://steamcommunity.com/sharedfiles/filedetails/?id=874857181&searchtext=%E4%B8%AD%E6%96%87)
- [Oxygen Not Included(缺氧)](https://store.steampowered.com/app/457140/Oxygen_Not_Included/) 同样是 Klei 出品，2D 模拟经营类游戏。
- [泰拉瑞亚](https://store.steampowered.com/app/105600/Terraria/) 不用介绍了吧？
- [全战三国](https://store.steampowered.com/app/779340/Total_War_THREE_KINGDOMS/) 全战系列的三国篇。
- [骑马与砍杀](https://store.steampowered.com/app/22100/Mount__Blade/) 最爱骑砍。
- [骑马与砍杀：战团](https://store.steampowered.com/app/48700/Mount__Blade_Warband/)
- [武装突袭 1(闪点行动)](https://store.steampowered.com/app/594550/Arma_Cold_War_Assault_MacLinux/) 血统上为武装突袭第一代。
- [中土世界 暗影摩多](https://store.steampowered.com/app/241930/Middleearth_Shadow_of_Mordor/) 兽人养成器。
- [Portal 系列](https://store.steampowered.com/app/400/Portal/) V 社著名解谜游戏。
- [监狱建造师](https://store.steampowered.com/app/233450/Prison_Architect/) 好玩的坐牢游戏。
- [Surviving Mars](https://store.steampowered.com/app/464920/Surviving_Mars/) 好玩的火星生存游戏。
- [Factorio(异星工厂)](https://store.steampowered.com/app/427520/Factorio/) 模拟经营，策略类游戏，自带 100%汉化。喜欢自动化的玩家可以一试。(并且对显卡要求不高，该条目的贡献者用着 UHD630 如是说道)
- [Rise to Ruins](https://store.steampowered.com/app/328080/Rise_to_Ruins/) 类似 RimWorld 模式的像素风模拟经营游戏。

### Steam Play 组

默认使用最新的 Steam 官方 Pronton 版本即可。如果不行，可尝试使用其他版本的 Proton 或者 GE Pronton。

- [巫师 3](https://store.steampowered.com/app/292030/_3/) 完美运行。
- [赛博朋克 2077](https://store.steampowered.com/app/1091500/_2077/) 可玩，基本无闪退发生。
- [荒野大镖客 2](https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/) 完美运行。
- [骑马与砍杀 2](https://store.steampowered.com/app/261550/Mount__Blade_II_Bannerlord/) 略有卡顿，启动器存在 bug，无法启动游戏，需要进行一点修改。进入游戏文件夹的./bin/Win64_Shipping_Client 文件夹中，执行如下命令
  ```bash
  mv TaleWorlds.MountAndBlade.Launcher.exe TaleWorlds.MountAndBlade.Launcher.exe.bak # 备份源文件
  ln -s Bannerlord.Native.exe TaleWorlds.MountAndBlade.Launcher.exe # 通过符号链接让启动器直接指向Bannerlord.Native.exe
  ```
  [相关 issue 讨论](https://github.com/ValveSoftware/Proton/issues/3706)
- [只狼](https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition/) 完美运行。
- [上古卷轴 5](https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/) 完美运行。
- [ATRI -My Dear Moments-](https://store.steampowered.com/app/1230140/ATRI_My_Dear_Moments/) 可爱的あとり 第一时间预购了 但始终没时间玩。 可使用 Proton 4.11-13 版本。
- [cute honey](https://store.steampowered.com/app/1347430/Cute_Honey/) 已锁国区。一款社保黄油。可使用 Proton 5.0-10 版本。
- [LOVE³ -爱立方-](https://store.steampowered.com/app/939600/LOVE/) 一款社保黄油。steam dlc 有社保补丁 dlc。可使用 Proton 5.0-10 版本。
- [三国志 11](https://store.steampowered.com/app/628070/Romance_of_the_Three_Kingdoms_XI_with_Power_Up_Kit/) 可使用 Proton 5.0-10 版本。
- [Kenshi](https://store.steampowered.com/app/233860/Kenshi/) 废土生存类游戏，非常好玩。可使用 Proton 5.0-10 版本。
- [光环士官长合集](https://store.steampowered.com/app/976730/Halo_The_Master_Chief_Collection/) 大名鼎鼎的光环系列。启动时需要在启动参数中加入`-windowed`，否则会报错 fatal error。可在进入游戏后自行调整分辨率。可使用 Proton 5.0-10 版本。
- [Stronghold HD](https://store.steampowered.com/app/40950/Stronghold_HD/) 要塞 1 重制版，近乎完美，只是不能 Alt+Tab 切换，会卡死。
- [Stronghold Crusader (Extreme) HD](https://store.steampowered.com/app/40970/Stronghold_Crusader_HD/) 要塞 1 十字军重制版，近乎完美，只是不能 Alt+Tab 切换，会卡死。
- [Stronghold 2](https://store.steampowered.com/app/40960/Stronghold_2_Steam_Edition/) 要塞 2。完美运行。
- [Stronghold Legends](https://store.steampowered.com/app/40980/Stronghold_Legends_Steam_Edition/) 要塞传奇。完美运行。
- [战意](https://store.steampowered.com/app/835570/_/) 中世纪网游。注意需要使用 GE Proton 的新版本。
- [Just Cause](https://store.steampowered.com/app/6880/Just_Cause/)
- [侠盗猎车手圣安地列斯](https://store.steampowered.com/app/12120/Grand_Theft_Auto_San_Andreas/)
- [Seek girl 系列黄油](https://store.steampowered.com/app/998930/Seek_Girl/) 好玩的 🐍 击游戏。玩之前记得先去装社保补丁

## Lutris

Lutris 基于 Wine，提供了大量游戏在 Linux 下的解决方案。其为你已经配置好了 Wine 相关的一切配置，你只需要安装游玩即可。一般极少需要额外配置。进入 [官网](https://lutris.net/) 在右上角搜索你想玩的游戏。点击进入游戏页面后，可以看到在相应版本右侧有一个 install 按钮，点击后即可拉起 Lurtis 进行安装。玩游戏前要先装好 [驱动](https://github.com/lutris/docs/blob/master/InstallingDrivers.md) 和 [依赖](https://github.com/lutris/docs/blob/master/WineDependencies.md)。下面针对一些群主玩的游戏进行一些额外说明。

### 暴雪战网

[暴雪战网](https://lutris.net/games/battlenet/) 直接安装后可能无法登录，这是因为缺乏某些库。阅读历史 Issue，安装如下库后解决问题。

```bash
sudo pacman -S giflib lib32-giflib libpng lib32-libpng libldap lib32-libldap gnutls lib32-gnutls mpg123 lib32-mpg123 openal lib32-openal v4l-utils lib32-v4l-utils libpulse lib32-libpulse alsa-plugins lib32-alsa-plugins alsa-lib lib32-alsa-lib libjpeg-turbo lib32-libjpeg-turbo libxcomposite lib32-libxcomposite libxinerama lib32-libxinerama ncurses lib32-ncurses opencl-icd-loader lib32-opencl-icd-loader libxslt lib32-libxslt libva lib32-libva gtk3 lib32-gtk3 gst-plugins-base-libs lib32-gst-plugins-base-libs vulkan-icd-loader lib32-vulkan-icd-loader cups samba dosbox
```

> 如果你发现还是无法登陆，检查你的代理设置。比如你是国服的帐号，但是代理挂的是日本的，那是无法登陆的，可以换一个香港的代理再尝试。

### WargamingGameCenter（坦克世界、战舰世界等)）

[WargamingGameCenter（坦克世界、战舰世界等）](https://lutris.net/games/wargaming-game-center/) 在页面上选择亚服即可进行安装（如果你玩亚服，则需要使用[透明代理](/advanced/transparentProxy)对 UDP 流量进行加速）。注意安装结束后，有可能会卡在 wargaming 启动器，整个启动器会黑掉，在右下角托盘右键关闭就可以继续安装流程。

如果无法更新游戏，在需要更新游戏的时候，将 Wine 版本设置为系统的 Wine staging 版本，如果最新的 wine-staging 版本仍然闪退，可以退回到 5.19 版本，这是以往验证的可用版本。如果依旧无法更新，可以尝试重新安装启动器（安装前先删除容器内 wgc 的文件夹，注意不是游戏本体的文件夹，无需重新下游戏本体）。在更新完毕后，需要启动游戏时，将 wine 版本设置为 Lutris 自带的版本。

如遇到无法启动闪退的情况，可以尝试在命令行启动 Lutris，再启动坦克世界即可，玄学、不知道原因。如果启动器中启动游戏还是闪退，可以尝试把 Lutris 容器的启动文件从启动器改到 WOT 游戏本体的可执行文件。这个方法在外服可以，国服就不行，因为启动游戏本体后要输入帐号密码，尝试了旧的空中网帐密、新的 360 帐密都不行，提示帐号密码错误或已过期。想了想原因可能是 360 在启动器做了套娃，有自身的验证登陆手段。这时候就需要用另一个更通用的方式，可以使用 Lutris 的功能 `Run EXE inside wine prefix`，然后选择坦克世界游戏本体就可以通过验证玩游戏了。`Run EXE inside wine prefix` 的位置在 Lutris 下方，点击小酒杯，最后一个。

如果你玩国服，群主在 Lutris 上传了国服的安装脚本，目前还没通过审核。

关于插件，可以在官方的 [Mod Hub](https://wgmods.net/) 下载，使用方式和 Windows 上是相同的，个人习惯更换背景音乐为 Old Memories，以及安装[阿斯兰插件包(Aslain's WoT Modpack)](https://wgmods.net/46/)中的屏蔽狂点小地图以及断线快速重连。如果习惯使用坦克世界盒子，也可以安装在同一个容器里，经过测试，除了没有效率值之外，其他功能是可以正常使用的。

## 原生 Wine

安装使用原生 [Wine](https://wiki.archlinux.org/index.php/Wine) 也可运行 windows 游戏，但是很多情况下需要你自行处理 Windows 下的依赖问题，常用的工具是 [winetricks](https://archlinux.org/packages/multilib/x86_64/winetricks/)。这种方式费时费力，只运行无需处理依赖的小游戏或者 gal 还好。

## 性能监控

和微星的 Afterburner 软件中性能显示的部分类似，Linux 上也有一款同类软件可以监控游戏中的电脑性能，名为[MangoHud](https://github.com/flightlessmango/MangoHud)。使用方式可参见此项目的 readme。此外，官方提供图形化的参数设置软件 [GOverlay](https://github.com/benjamimgois/goverlay#arch--manjaro--other-arch-derivatives)，可以自行选择安装。

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

最近的 steam 官方的 proton 不能正确检测系统的 fsync,依然以 esync 模式启动游戏。更换 GE 版本的 proton 可以正确检测并使用 fsync 模式启动游戏。

## snap

snap 中存在一些高质量的游戏包，如 cncnet 可以进行红警 2 的联机游戏。按照[官方 wiki](https://wiki.archlinux.org/title/Snap)安装 snap 并启动服务。接下来按照[snap 红警的 readme](https://github.com/mmtrt/cncra2yr)安装并进行设置。游戏的本体文件可以前往[红警之家下载](http://www.uc129.com/yuanchuang/)。注意,cncnet 是自己实现了一个启动器，然后调用游戏本体，这其中 cncnet 一定进行了某些 patch。直接执行游戏本体会有各种问题，目前还未找到较好的解决办法。cncnet 不能进行战役游戏。

## 游戏手柄

一般情况下手柄通过数据线连接计算机即可直接使用。支持无线的手柄（DUALSHOCK® 3、DUALSHOCK® 4、Xbox 360、Xbox One、8BitDo 等）也可以通过蓝牙直接连接，无需额外操作。

### Xbox 无线适配器

虽然无线手柄一般情况下可以通过蓝牙直连，但是通常这样会有较大的延迟。推荐使用 [Xbox 无线适配器](https://www.microsoftstore.com.cn/accessories/microsoft-xbox-wireless-adapter) 以获得近乎有线的低延迟体验。

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

## 性能提升

在进行某些游戏时，如《Total War: THREE KINGDOMS》，如遇到性能问题，可尝试调节 cpu 频率调节器[[1]](https://support.feralinteractive.com/docs/zh_cn/threekingdomstw/1.0.15/linux/faqs/?access=zooevrj6xb&utm_source=game_linux&utm_medium=link&utm_campaign=game_linux_threekingdomstw_support#i_linux_cpu_governor)。注意此模式会让 cpu 处于最高性能状态、风扇狂转，如果你的散热撑不住甚至会降频，得不偿失，斟酌使用。
