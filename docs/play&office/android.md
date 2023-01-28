# 安卓刷机

[Arch Wiki 安卓文档](https://wiki.archlinux.org/index.php/android)

## 为什么要刷机

在目前市面上可见的各个手机品牌中，除了其自己魔改的闭源安卓手机系统外，几乎任何一个品牌都会预装上一系列的出厂应用，如浏览器，通讯录，应用市场等。这些应用均为闭源软件，由各个手机厂商开发提供。这里就存在严重的问题，这些魔改系统以及闭源应用软件可能会进行各种间谍功能，对使用者进行监控以及审计。据报告，小米以及华为手机均会对用户的搜索以及浏览进行上报，匹配到关键词如"西藏自由"，"台湾独立"，"民主自由"等词即会进行加密上报，这些关键词可能有成百上千个。由于此类原因，使得使用者必须对手机的系统进行重新刷入，选择一个开源可靠的 ROM 刷入手机可以保障自己的隐私及安全。在硬件层面，也存在审计与监控的可能性，但是目前尚未知明确且可靠的报告，如有条件，可选择非人身所在国家品牌的手机。

> 华为鸿蒙与小米的 MIUI 等中国大陆厂商存在着与威权政府合作的风险，并且这种风险目前来看越来越大，操作系统层面来看，整合所谓"反诈系统"几乎已经是箭在弦上的事情。是否会有硬件级别的监控和审计，目前尚无明确证据。为了你的隐私与安全，如果这些厂商的手机无法自行刷入安全的 ROM，那么你需要拒绝使用这些厂商的产品。

买手机最好买知名度大的品牌，较热门的机型，这样在刷机时可以方便的找到官方的 twrp 和知名的 ROM 包，如[LineageOS](https://lineageos.org/)，[crDroid](https://crdroid.net/), [Resurrection Remix](https://resurrectionremix.com/)，[PixelExperience](https://download.pixelexperience.org/devices),[grapheneos](https://grapheneos.org/)等。如果是较冷门的品牌，官方可能没有提供 ROM，只能在网上自行寻找个人改造过的 twrp 和上述 ROM 包的 unofficial ROM，搜索的方式一般为手机的代号+ROM。这种个人改造版本的安全性比较难说，而且还可能有更多的 bug。也有可能你翻遍全网，也找不到冷门机型能用（指好用的、非硬件提供商的官方 ROM）的 twrp 和 ROM。硬件方面，一般推荐买高通骁龙的 cpu,不要买联发科的，因为更多 ROM 的版本都是适配高通硬件的。

首先需要安装 linux 上的安卓工具包

```bash
sudo pacman -S android-tools
```

## 解锁 bootloader

再次提醒要购买或使用有可能解锁 bootloader 的手机品牌。一般来说像小米这种品牌，官方会提供解锁 bootloader 的途径和工具，但是这些工具基本只能在 windows 下用。这时候你就只能用一台 windows 操作，或者使用虚拟机。

除此之外，如果你能获取，或通过很 hack 的方式拿到 bootloader 的解锁码，那么也可以使用 adb 在 fastboot 模式下进行解锁。

```bash
$ adb reboot bootloader #手机先链接电脑，重启到fastboot
$ fastboot oem unlock xxxxxxx #在fastboot模式下解锁，要加上正确的bl码才能解锁，否则会报错
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

让手机进入 fastboot 模式，在电脑打开终端，执行

```bash
fastboot flash recovery ./path/of/your-twrp.img
```

看到终端执行完毕的时候，就可以让手机重启了。这里注意，执行`fastboot reboot`可以重启，但是许多设备会在首次启动时自动覆盖替换你刷入的自定义 recovery，这样直接重启会报错不是官方系统等类似信息。为防止这种情况，在手机上通过硬件按键重启进入 recovery，TWRP 将给 ROM 打 patch，以防止 ROM 替换 TWRP。[[1]](https://twrp.me/xiaomi/xiaomimi5.html)

剩下的步骤就是普通的进入 twrp,双清，刷机即可。

> 有时双清或者进入 twrp 可能看到报错，用高级清理，从 ext4 改一下格式，再改回 ext4 可能就解决了

更多命令：

```bash
$ adb shell #打开adb shell
$ adb root #在手机已经root的情况下打开root权限的adb shell
```

## 解锁 root 权限

使用 Magisk 以解锁 root 权限。在其[官方 release 界面](https://github.com/topjohnwu/Magisk/releases)下载 Magisk apk 文件，将其重命名为.zip 后缀。然后将其拷贝到手机中，最后进入 twrp 刷入此 zip 包即可。

Ref:

- [小米刷机教程](http://www.romleyuan.com/news/readnews?newsid=938)
