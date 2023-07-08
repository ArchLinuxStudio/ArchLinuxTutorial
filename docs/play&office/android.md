# 安卓刷机

[Arch Wiki 安卓文档](https://wiki.archlinux.org/index.php/android)

## 为什么要刷机

在目前市面上可见的各个手机品牌中，除了其自己魔改的闭源安卓手机系统外，几乎任何一个品牌都会预装上一系列的出厂应用，如浏览器，通讯录，应用市场等。这些应用均为闭源软件，由各个手机厂商开发提供。这里就存在严重的问题，这些魔改系统以及闭源应用软件可能会进行各种间谍功能，对使用者进行监控以及审计。据报告，小米以及华为手机均会对用户的搜索以及浏览进行上报，匹配到关键词如"西藏自由"，"台湾独立"，"民主自由"等词即会进行加密上报，这些关键词可能有成百上千个。由于此类原因，使得使用者必须对手机的系统进行重新刷入，选择一个开源可靠的 ROM 刷入手机可以保障自己的隐私及安全。在硬件层面，也存在审计与监控的可能性，但是目前尚未知明确且可靠的报告，如有条件，可选择非人身所在国家品牌的手机。

> 华为鸿蒙与小米的 MIUI 等中国大陆厂商存在着与威权政府合作的风险，并且这种风险目前来看越来越大，操作系统层面来看，整合所谓"反诈系统"几乎已经是箭在弦上的事情。是否会有硬件级别的监控和审计，目前尚无明确证据。为了你的隐私与安全，如果这些厂商的手机无法自行刷入安全的 ROM，那么你需要拒绝使用这些厂商的产品。

同时，大陆厂商预装的魔改 ROM 中普遍存在大量广告，其中「手机鸿蒙」和「MIUI国内版」最多，大量的广告会占满系统通知栏，给使用者造成很差的使用体验，虽然可以通过冻结相应软件的方法来关闭。但随着时间的流逝，厂商也逐渐堵死了这条路，将「手机管家」、「软件商店」、「智慧XX」、「系统桌面」、「主题商店」等广告软件锁死，如果没有 root 权限则禁止冻结，就算是 adb shell 也不行，此行为广泛出现于「ColorOS」、「OriginOS/FuntouchOS」、「手机鸿蒙/MagicUI」等。此外，在 MIUI 中，虽然 shell 权限允许冻结一些广告软件，但冻结后可能会出现重启系统后卡死在开机第二屏的情况，也就是所谓的「卡米」，防不胜防。

最后，许多大陆厂商的魔改 ROM 的大陆版本会存在一些「流氓行为」，目前比较猖狂的是「锁死默认应用」，尤其是桌面应用「启动器」，在此，我想说：

虽然恶意应用可能会引诱用户将其设置为默认应用然后向用户进行勒索诈骗等恶意行为，但是，难道用户连这点判断能力都没有吗？真把用户当傻子？**人人生而自由，在尊严和权利上一律平等。** 为什么要剥夺用户自由地更换系统默认应用的权利，难道就是为了推广自己那几个广告满天飞，功能远远落后于其他优秀的自由软件的应用吗？为了挣这几个钱脸都不要了？随便找了个看似有点道理但其实漏洞百出的理由就开始剥夺手机用户的基本权利，吃相难看！再者，为什么只在大陆版的 ROM 上推出这些『特色功能』，海外版就没有，难道中国人都是傻子，外国人就比中国人聪明吗？自己把自己当傻子？「禽兽之变诈几何哉？止增笑耳。」

同时，「手机鸿蒙3」中出现的『纯净模式』以及「ColorOS」中安装应用强制登录OPPO账号且无法关闭的行为也都是「流氓行为」，同上。

买手机最好买开放 BootLoader 解锁（刷机的前提）并且官方最好有可用的开源内核（第三方开源 ROM 适配的前提）品牌，较热门的机型，比如小米/红米、Google Pixel、Realme、Fairphone等，避免一些既不开放 BootLoader 解锁，官方系统也不好用的品牌，比如华为/荣耀（如果刷机有难度，华为就是地狱级）、Vivo/iQOO（不存在难度，因为几乎所有机型都没有刷机的可能）等，这样在刷机时可以方便的找到官方的 twrp 和知名的 ROM 包，如[PixelExperience](https://get.pixelexperience.org/devices)，[LineageOS](https://lineageos.org/)，[crDroid](https://crdroid.net/)，[Resurrection Remix](https://resurrectionremix.com/)（不建议，官方已经停更），[Havoc-OS](https://havoc-os.com/)，[ArrowOS](https://arrowos.net/)，[Evolution X](https://evolution-x.org/)（虽然功能比较丰富，但有过「kang」的行为，介意者误用），[dotOS](https://www.droidontime.com/devices)，[grapheneos](https://grapheneos.org/)等，我们统称为「类原生」（相对于真原生 AOSP 而言）。如果是较冷门的品牌或冷门机型，各大官方类原生网站可能没有提供 ROM，只能在网上自行寻找个人改造过的 twrp 和上述 ROM 包的 unofficial ROM，搜索的方式一般为手机或手机代号+ROM，比如「Xiaomi Redmi K60 Pro ROM」或者「mi socrates rom」，必要时也可以在[XDA论坛](https://forum.xda-developers.com/)，资源会相对较多一些。这种个人改造版本的安全性一般不会有啥问题，但稳定性比较难说，而且还可能出现更多的 bug。也有可能你翻遍全网，也找不到冷门机型能用（指好用的、非硬件提供商的官方 ROM）的 twrp 和 ROM。硬件方面，一般推荐买高通骁龙平台的手机，不推荐买联发科平台的，因为更多 ROM 的版本都是适配高通硬件的（高通的包多），同时联发科平台的设备刷机过程中出现问题后救砖的便捷性和简单性也不如高通平台（高通的只要硬件没坏基本都能救回来）。

首先需要安装 linux 上的安卓工具包

```bash
sudo pacman -S android-tools
```

## 解锁 bootloader

再次提醒要购买或使用有官方提供 bootloader 解锁的手机品牌。一般来说像小米这种品牌，官方会提供解锁 bootloader 的途径和工具，但是小米的解锁工具基本在 Microsoft Windows 系统下用。这时候你就只能用一台 Windows 电脑操作，或者使用虚拟机（不推荐，可能会出问题）。

除此之外，如果你能获取，或通过很 hack 的方式拿到 bootloader 的解锁码（华为设备，大部分需要花钱或者拆机短接），那么也可以使用 adb 在 fastboot 模式下进行解锁。

```bash
$ adb reboot bootloader #手机先链接电脑，重启到fastboot
$ fastboot oem unlock 1234567890ABCDEF #在fastboot模式下解锁，要加上正确的16位解锁码才能解锁，否则会出现类似以下报错
FAILED (remote: 'check password failed!')
fastboot: error: Command failed
```

## 刷入 twrp 并进行刷机

没有官方 twrp 的设备，可以在[unofficialtwrp](https://unofficialtwrp.com/devices/)查看下是否有。

如果没有相关信息有几个论坛和网站可以看看

- xda https://forum.xda-developers.com/
- https://androidfilehost.com/ 搜索 开发代号 + 你想要的系统名字

一般 twrp 的版本和 ROM 包有对应关系，刷机前先确认你的两个版本是兼容的，否则刷机过程可能报奇怪的错误，如 unable to mount /system

去下载你机型对应的 twrp。在[官网](https://twrp.me/Devices/)搜索你的机型，下载。如果没有看到你的机型说明官方不支持，你需要自行搜索别人修改的版本。将手机连接电脑，注意要连到 USB2.0 的接口，否则可能有兼容性问题。

让手机进入 fastboot 模式，对于非华为设备，在电脑打开终端，执行

```bash
fastboot flash recovery ./path/of/your-twrp.img

fastboot boot ./path/of/your-twrp.img
```

终端执行完毕的后，手机会自动重启到 Recovery。这里注意，第一个命令执行完毕后执行`fastboot reboot`可以重启，但是许多设备会在首次启动时自动覆盖替换你刷入的自定义 Recovery，这样直接重启可能会发现启动的依旧是官方 Recovery 而非刚才刷的，一些 ROM 甚至会报错不是官方系统等类似信息。为防止这种情况，在手机上通过硬件按键重启进入 recovery，TWRP 将给 ROM 打 patch，以防止 ROM 替换 TWRP。[[1]](https://twrp.me/xiaomi/xiaomimi5.html)

剩下的步骤就是普通的进入 twrp,双清，刷机即可。

> 有时双清或者进入 twrp 可能看到报错，用高级清理，从 ext4 改一下格式，再改回 ext4 可能就解决了

更多命令：

```bash
$ adb shell #打开adb shell
$ adb root #在手机已经root的情况下打开root权限的adb shell
```

## 去除网络限制提示

谷歌从 Android 5.0 开始就引入了「Captive Portal」机制，主要用来检测 WiFI 网络认证是否正常，默认检测访问的是谷歌墙外服务器。在使用国际上常见的类原生安卓时，身处墙内环境此服务会提示网络受限，即使已经开启 Shadowsocks 等服务。针对此问题可使用 adb 命令修改检测访问的服务器为 google.cn 解决。

```
adb shell settings put global captive_portal_server www.google.cn
adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
adb shell settings put global captive_portal_mode 0
```

最后切换一下飞行模式再切回即可解决。

## 刷入谷歌套件

一些场景下因为需要使用 Google play,需要刷入谷歌套件。可选的项目有[opengapps](https://opengapps.org/)、[nikgapps](https://nikgapps.com/)以及[lineageos 提供的套件](https://wiki.lineageos.org/gapps)。一般推荐刷稳定性高些 opengapps ，但其目前更新似乎已经陷入停滞。nikgapps 可以自行定制。

## 解锁 root 权限

如果你的设备可以使用[KernelSU](https://kernelsu.org/zh_CN/)，则首先推荐 KernelSU，因为 KernelSU 运行在内核空间，对用户空间应用有更强的掌控，同时被检测到的概率也极小。

对于无法使用 KernelSU 的设备，使用 Magisk 以解锁 root 权限。在其[官方 release 界面](https://github.com/topjohnwu/Magisk/releases)下载 Magisk apk 文件，将其重命名为.zip 后缀。然后将其拷贝到手机中，最后进入 twrp 刷入此 zip 包即可。

对于Android 5.1 以下设备，如果 Magisk 无法运行或运行出现问题，则可以尝试[SuperSU](https://supersuroot.org/)。注意：此应用属于**专有软件**，且已经停更，除非万不得已，否则不推荐使用

Ref:

- [小米刷机教程](http://www.romleyuan.com/news/readnews?newsid=938)

详细刷机教程参考[刷机指南](https://jesse205.github.io/FlashAndroidDevicesGuidelines/)。
