<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Desktop Environment and Usual Applications

Official documents:[Work after installation](https://wiki.archlinux.org/index.php/General_recommendations)This section describes only the basic components required to make the system truly operational.

Note: with document<sup>AUR</sup>Angled software represents third-party software packaged by the user.[AUR](https://aur.archlinux.org/)In the absence of Arch official support, problems of late updating, inability to install and error in use may arise. If you have a problem, you can go to your AUR page to see if there are any solutions in other comments. The use of similar software is not recommended if it is not officially supported.

## 1. Ensuring that the system is up to date

If you have finished the previous section and have been restarted and placed for some time, you will need to reconnect the network as at the end of the previous section and then update the system.

```bash
pacman -Syyu    #升级系统中全部包
```

## 2. Preparation of non-root users

Add users, such as new users called testuser

```bash
useradd -m -G wheel -s /bin/bash testuser  #wheel附加组可sudo，以root用户执行命令 -m同时创建用户家目录
```

Set password for new user testuser

```bash
passwd testuser
```

Edit sudoers profile

```bash
EDITOR=vim visudo  # 需要以 root 用户运行 visudo 命令
```

Find a line like this below. Put the annotated symbol in front.`#`Get rid of it.`:wq`Save and exit it.

```sudoers
#%wheel ALL=(ALL:ALL) ALL
```

Here's a little explanation.
%wheel stands for the wheel group, the percentage is prefix
ALL = Delegates are valid on all hosts (if the same`sudoers`File down to multiple hosts)
(ALL) Representative can be a target user
All Representatives can execute arbitrary orders.
A more detailed example:

```sudoers
%mailadmin   snow,rain=(root) /usr/sbin/postfix, /usr/sbin/postsuper, /usr/bin/doveadm
nobody       ALL=(root) NOPASSWD: /usr/sbin/rndc reload
```

Group mailadmin can perform some mail server control commands as root users. You can do it on both "snow" and "rain."
User nobody can execute as root user`rndc reload`Command. Can be executed on all hosts. You can also not enter a password. Normally, sudo is required to enter the code of the caller.

## 3. Install KDE Plasma Desktop Environment

```bash
pacman -S plasma-meta konsole dolphin  #安装plasma-meta元软件包以及终端和文件管理器
```

## 4. Configure greener sddm

<!-- pacman -S sddm //包含在plasma-meta了 不用单独装
但是plasma-desktop 没有 还是要装
-->

```
systemctl enable sddm
```

## Setup exchange file swap (optional)

In the desktop environment, the exchange partitions or files are used to perform hibernate functions that preserve the current environment in the exchange files or partition parts of the disk. In addition to this, certain specific software needs swap to run correctly. The exchange of documents is of the same type as a division, and the exchange of documents is more flexible and readily resizeable, adding and deleting.[[1]](https://wiki.archlinux.org/title/Swap#Swap_file)

```bash
dd if=/dev/zero of=/swapfile bs=1M count=4096 status=progress #创建4G的交换空间 大小根据需要自定
chmod 600 /swapfile #设置正确的权限
mkswap /swapfile #格式化swap文件
swapon /swapfile #启用swap文件
```

Finally, in/etc/fstab**Append**As follows:

```bash
/swapfile none swap defaults 0 0
```

KDE provides its own open-box sleep function (suspend), which hangs the system to memory and consumes a small amount of electricity. Hibernate will hang the system to exchange partitions or files, with little electricity consumption. Sleep functions already satisfy the needs of the majority of people, and if you must need hibernation, you can refer to it.[Official documents](https://wiki.archlinux.org/title/Power_management/Suspend_and_hibernate)Sets the steps associated with hibernation.

## Start 32 bit support Library

```bash
vim /etc/pacman.conf
```

Removes the two-line note in the section [multilib] to open 32-bit library support.

Finally: wq save exit, refresh pacman database

```bash
pacman -Syyu
```

Restart the computer to see the welcome interface and enter the password for the new user to log on to the desktop

## 7. Installation of basic functional packages

After entering the desktop, search for konsole. It is the default command line terminal for the KDE desktop environment.

Network settings in the desktop environment first:

```bash
sudo systemctl disable iwd                                                  #确保iwd开机处于关闭状态，其无线连接会与NetworkManager冲突
sudo systemctl stop iwd                                                     #同上，立即关闭iwd
sudo systemctl enable --now NetworkManager                                  #确保先启动NetworkManager，并进行网络连接 若iwd已经与NetworkManager冲突 则执行完上一步重启一下电脑即可。
```

Some basic functional packages are then installed.

```bash
sudo pacman -S sof-firmware alsa-firmware alsa-ucm-conf                     #一些可能需要的声音固件
sudo pacman -S ntfs-3g                                                      #识别NTFS格式的硬盘
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei                   #安装几个开源中文字体 一般装上文泉驿就能解决大多wine应用中文方块的问题
sudo pacman -S noto-fonts-cjk noto-fonts-emoji noto-fonts-extra             #安装谷歌开源字体及表情
sudo pacman -S firefox chromium                                             #安装常用的火狐、谷歌浏览器
sudo pacman -S ark                                                          #与dolphin同用右键解压
sudo pacman -S p7zip unrar unarchiver lzop lrzip                            #安装ark可选依赖
sudo pacman -S packagekit-qt5 packagekit appstream-qt appstream             #确保Discover(软件中心）可用 需重启
sudo pacman -S gwenview                                                     #图片查看器
sudo pacman -S git wget kate bind                                                #一些工具
```

> Do not install too many fonts: When more than 255 fonts, some QT programs may not be able to correctly display certain expressions and symbols, as detailed in the links[2](https://wiki.archlinux.org/title/fonts#Emoji_and_symbols)I don't know.

## 8. Setting up DNS

Generally speaking, most computer-connected routers can now automatically handle DNS. If you cannot handle the routers, additional DNS settings are required. Meanwhile, if you use the default DNS provided by the ISP, your web access log will exist**Bigger**, the risk of disclosure or storage of records by the authorities. In addition to this, the DNS provided by the ISP may have been decrypted to some servers that are no longer functioning or poor. Even if your network environment can automatically handle DNS settings, we suggest that you use a credible international universal DNS settings. The following configuration will fix Google DNS, but the delay in accessing the network may increase. After reading the subsequent proxy section, your DNS requests will be sent through the agent, which will guarantee your privacy and safety to the maximum extent possible in the DNS transmission.

vim Edit/etc/resolv.conf, delete existing entries and add

```bash
nameserver 8.8.8.8
nameserver 2001:4860:4860::8888
nameserver 8.8.4.4
nameserver 2001:4860:4860::8844
```

If your router can automatically handle DNS, resolvconf will overwrite the settings in the /etc/resolv.conf for each network connection by using the router settings, adding a non-variable sign to the following command so that it does not cover the configuration as above[[3]](https://wiki.archlinux.org/title/Domain_name_resolution#Overwriting_of_/etc/resolv.conf)[[4]](https://nssurge.zendesk.com/hc/zh-cn/articles/360011927114-DNS-%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8D%97)I don't know.

```bash
sudo chattr +i /etc/resolv.conf
```

## Set up system in Chinese

Open_System Settings_>  Regional Settings add Chinese to the language.

Next Edit`~/.config/plasma-localerc`, change the LANG value from zh CN.UTF-8

## 10. Installation

AUR is archlinuxuser repositiry. Any user can upload their own URL packages, which is why Arch Linux has many software available. Since anyone can upload and there is a corresponding risk, it is generally sufficient to opt for a popularly accepted package.

Use[yay](https://github.com/Jguer/yay)or[paru](https://github.com/Morganamilo/paru)You can install packages in the AUR. Because[China mainland government blockade Github](https://zh.wikipedia.org/wiki/%E5%AF%B9GitHub%E7%9A%84%E5%AE%A1%E6%9F%A5%E5%92%8C%E5%B0%81%E9%94%81#%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD)The reason for this is that you probably can't install yay in the normal way in the official warehouse of yay, so ArchLinuxStudio provides a bin package that can be installed directly for your temporary use at installation.

Set up yay on the following order.

```bash
wget https://raw.githubusercontent.com/ArchLinuxStudio/ArchLinuxTutorial/master/docs/res/yay-bin-12.3.3-1-x86_64.pkg.tar.zst
sudo pacman -U yay-bin-12.3.3-1-x86_64.pkg.tar.zst
```

> Gythub.io and Raw.githubusercontent.com have also been blocked by the mainland Chinese government, although the blockade has not been significant for the time being. If you are stuck while you are downloading, you can try to download the ctrl+c command once you have stopped, or you can try to change the network environment of your mobile phone for download again, with the same sense when you install Qv2ray. When you have a global agent, you will no longer have to worry about any cyber-blocking. We will continue to provide readers of this book with a reliable process for breaking through Internet censorship.

## 11. Installation Input Method

[Fcitx5 Official Document](<https://wiki.archlinux.org/index.php/Fcitx5_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)The Chinese and Japanese input laws are well experienced.

```bash
sudo pacman -S fcitx5-im #基础包组
sudo pacman -S fcitx5-chinese-addons #官方中文输入引擎
sudo pacman -S fcitx5-anthy #日文输入引擎
yay -S fcitx5-pinyin-moegirl #萌娘百科词库 由于中国大陆政府对github封锁，你可能在此卡住。如卡住，可根据后文设置好代理后再安装
sudo pacman -S fcitx5-pinyin-zhwiki #中文维基百科词库
sudo pacman -S fcitx5-material-color #主题
```

Set Environment Variable: Edit Files`EDITOR=vim sudoedit /etc/environment`Add the following. konsole and dolfin both need these environment variables, but the chorome and firefox are not needed to enter Chinese

```bash
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
```

Open_System Settings_ > _Area Settings_ > _Input Method_Click first`运行Fcitx`, the spelling is the default addition. If you need more input methods like five, click again.`添加输入法`, you can add five input methods by clicking on it.

Next Click_Spelling_Right configuration button, click`云拼音`and`在程序中显示预编辑文本`Final application.

Back to input method settings, click`配置附加组件`Got it._Classic User Interface_Select one of your favorite colors for the final application in the theme.

Write-off, re-landing, and you can see that you can already enter Chinese into the software.

---

- RIME
The Chinese Rhyming Input Engine (Rime Input Method Engineering, also known as Rime Input) is an open-source Chinese input method developed by PfD and is currently hosted by GitHub on the project website and source code. Based on the same core structure, the input method is divided into three official editions: Linux issue, China Rhymns, Windows issue, Weasel, MacOS issue, Squirel. There are also several third-party releases: Linux, fcitx-rime, Windows, PRIME, MacOS, XiME, Android, iOS, iRime.

Here's how the fcitx5-rime is installed.
'"'bash
Sudo Pacman - S fcitx5-rime #not fcitx-rime because fcitx conflicts with fcitx5
'"""""
Then open it. Open it._System Settings_ > _Area Settings_ > _Input Method_>, click to add input method, find RIME, then add RIME input method.
The RIME input method is defaulted to be flexible by press<key>Ctrl</key>+<key>~</key>, you can open the menu and use the keyboard.<key>←</key><key>→</key>, choose the lunar spell, the simplified word, the car back.

## 12. Configure System Default Editor

By default, Arch Linux uses vi editor for some terminal editing scenes, but we use vim. If you do not make an additional configuration, there will be an error in the terminal call editor in a context like guit. Edit`EDITOR=vim sudoedit /etc/profile`File, add the following to set vim to default EDITOR

```bash
export EDITOR='vim'
```

So you don't have to specify every time you execute an order.`EDITOR=vim`Got it.

## 13. Enable Bluetooth-related functionality

For Bluetooth and Wi-Fi cards, Intel products are recommended under Linux. The poor compatibility and stability of the Bottung and Ribbon products in Linux can cause unnecessary problems, such as driving, poor or no BLE support.

If you have Bluetooth equipment, you need to install Bluetooth packages and activate Bluetooth services. Then add the device and connection to the system settings. Attention, file transfer function now requires additional installation. Package`bluez-obex`, its function and 2024 have been`bluez`Separated from the bag.

```bash
sudo pacman -S bluez bluez-utils bluez-obex
sudo systemctl enable --now bluetooth
```

Set the switch on the Bluetooth device, edit`/etc/bluetooth/main.conf`Documentation, will`AutoEnable`Set to True If some devices are still unable to access automatic connection, try to continue`Experimental`and`KernelExperimental`The value of both is set to true.

Broadcom has poor support under Linux, both wireless and bluetooth modules. For wireless functions, the broadcom-wl package is usually installed directly.

```bash
sudo pacman -S broadcom-wl
```

For Bluetooth module, need to see[broadcom-bt-firmware](https://github.com/winterheart/broadcom-bt-firmware)Repository, find a hcd file in the brcm folder suitable for your own card model, download it and place it in the`/lib/firmware/brcm`Synchronising "%s" If you are unable to confirm which hcd file your own card type corresponds to, download and place it in the folder.

ref:

- [Broadcom wireless ArchWiki](https://wiki.archlinux.org/title/broadcom_wireless)
- [Fix WiFi and Bluetooth problems in ArcoLinux or Arch Linux](https://kaneis.wordpress.com/2020/12/16/fix-bluetooth-problem-not-scanning-any-devices-in-arcolinux-or-arch-linux-with-broadcom-bluetooth-usb-dongle-or-broadcom-half-mini-card-bcm94352-hmb-azurewave-aw-ce123h-supports-wifi-ac-and-bt4le/)
- [ [Broadcom BCM4352] A fix for empty bluetooth scan/visibility](https://bbs.archlinux.org/viewtopic.php?id=228561)

<!-- ## 11.异型字体设置

个人的设置是英文使用 Hack，中文使用 Noto Sans CJK SC。可以在系统设置->外观->字体中进行设置。如遇到`门复关`等字形现实为日型字体，有关用户全局级别更改日文异型字的设置，可参考[官方文档](<https://wiki.archlinux.org/index.php/Localization_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Simplified_Chinese_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BF%AE%E6%AD%A3%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%E6%98%BE%E7%A4%BA%E4%B8%BA%E5%BC%82%E4%BD%93%EF%BC%88%E6%97%A5%E6%96%87%EF%BC%89%E5%AD%97%E5%BD%A2>) -->
