# Arch Linux 基础安装

本节从安装最基础的无图形化 ArchLinux 系统开始。[官方安装指南](https://wiki.archlinux.org/index.php/Installation_guide)

## 0.禁用 reflector

reflector 会为你选择速度合适的镜像源，但其结果并不准确，同时会清空配置文件中的内容，对于新人来讲并不适用，我们首先对其进行禁用。

```bash
systemctl stop reflector.service
```

## 1.再次确保是否为 UEFI 模式

在一系列的信息刷屏后，可以看到已经以 root 登陆安装系统了，此时可以执行的命令：

```bash
ls /sys/firmware/efi/efivars
```

若输出了一堆东西，即 efi 变量，则说明已在 UEFI 模式。否则请确认你的启动方式是否为 UEFI。

## 2.连接网络

一般来说，你连接的网络几乎均可以通过 DHCP 的方式来进行 IP 地址和 DNS 的相关设置，你无需进行额外操作。在没有合适网络的情况下，使用手机的移动热点也是很方便的选择。如果你的网络环境需要配置静态 IP 和 DNS,请自行参考 Arch Wiki。

对于有线连接来说，直接插入网线即可。

对于无线连接，则需进行如下操作进行网络连接。

无线连接使用 iwctl 命令进行，按照如下步骤进行网络连接：

```bash
iwctl                           #执行iwctl命令，进入交互式命令行
device list                     #列出设备名，比如无线网卡看到叫 wlan0
station wlan0 scan              #扫描网络
station wlan0 get-networks      #列出网络 比如想连接YOUR-WIRELESS-NAME这个无线
station wlan0 connect YOUR-WIRELESS-NAME #进行连接 输入密码即可
exit                            #成功后exit退出
```

可以等待几秒等网络建立链接后再进行下面测试网络的操作。

```bash
ping www.gnu.org
```

---

**如果**你不能正常连接网络，首先确认系统已经启用网络接口[[1]](https://wiki.archlinux.org/index.php/Network_configuration/Wireless#Check_the_driver_status)。

```bash
ip link  #列出网络接口信息，如不能联网的设备叫wlan0
ip link set wlan0 up #比如无线网卡看到叫 wlan0
```

**如果**随后看到类似`Operation not possible due to RF-kill`的报错，继续尝试`rfkill`命令来解锁无线网卡。

```bash
rfkill unblock wifi
```

## 3.更新系统时钟

```bash
timedatectl set-ntp true    #将系统时间与网络时间进行同步
timedatectl status          #检查服务状态
```

## 4.分区

这里总共设置三个分区，是一个**我们认为**较为通用的方案。此步骤会清除磁盘中全部内容，请事先确认。

- EFI 分区[[2]](https://wiki.archlinux.org/title/EFI_system_partition#Mount_the_partition)： `/efi` 800M
- 根目录： `/` 100G
- 用户主目录： `/home` 剩余全部

> 这里根目录的大小仅为参考，一般来说个人日常使用的 linux 分配 100G 已经够用了。根目录最小建议不小于 50G，根目录过小会造成无法更新系统软件包等问题。

首先将磁盘转换为 gpt 类型，这里假设比如你想安装的磁盘名称为 sdx。如果你使用 NVME 的固态硬盘，你看到的磁盘名称可能为 nvme0n1。

```bash
lsblk                       #显示分区情况 找到你想安装的磁盘名称
parted /dev/sdx             #执行parted，进入交互式命令行，进行磁盘类型变更
(parted)mktable             #输入mktable
New disk label type? gpt    #输入gpt 将磁盘类型转换为gpt 如磁盘有数据会警告，输入yes即可
quit                        #最后quit退出parted命令行交互

```

接下来使用 cfdisk 命令对磁盘分区。进入 cfdisk 后的操作很直观，用键盘的方向键、Tab 键、回车键配合即可操作分配各个分区的大小与格式。一般建议将 EFI 分区设置为磁盘的第一个分区，据说有些主板如果不将 EFI 设置为第一个分区，可能有不兼容的问题。其中 EFI 分区选择`EFI System`类型，其余两个分区选择`Linux filesystem`类型。

```bash
cfdisk /dev/sdx #来执行分区操作,分配各个分区大小，类型
fdisk -l #分区结束后， 复查磁盘情况
```

## 5.格式化

建立好分区后，需要对分区用合适的文件系统进行格式化。这里用`mkfs.ext4`命令格式化根分区与 home 分区，用`mkfs.vfat`命令格式化 EFI 分区。如下命令中的 sdax 中，x 代表分区的序号。格式化命令要与上一步分区中生成的分区名字对应才可以。

磁盘若事先有数据，会提示你: 'proceed any way?' 按 y 回车继续即可。

```bash
mkfs.ext4  /dev/sdax            #格式化根目录和home目录的两个分区
mkfs.vfat  /dev/sdax            #格式化efi分区
```

## 6.挂载

在挂载时，挂载是有顺序的，先挂载根分区，再挂载 EFI 分区。
这里的 sdax 只是例子，具体根据你自身的实际分区情况来。

```bash
mount /dev/sdax  /mnt
mkdir /mnt/efi     #创建efi目录
mount /dev/sdax /mnt/efi
mkdir /mnt/home    #创建home目录
mount /dev/sdax /mnt/home
```

## 7.镜像源的选择

使用如下命令编辑镜像列表：

```bash
vim /etc/pacman.d/mirrorlist
```

其中的首行是将会使用的镜像源。添加中科大或者清华的放在最上面即可。

```
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
```

如果其速度不佳，可以手动指定其他镜像源。完整的镜像源列表可参考官方[镜像源生成器](https://archlinux.org/mirrorlist/)。

> 这里使用中国境内的镜像源以提高访问速度。然而这存在问题，镜像源(如 arch linux 清华镜像源)以及第三方源(如 archlinux-cn)可以知道你的 ip 是什么，什么时候更新了系统，什么时候检查了系统，什么时候更新了什么软件，你安装的软件列表是什么。在威权国家的镜像源维护者完全有可能根据威权当局的要求提供这些数据，很多维护者在网络上几乎是实名上网的，他们没有任何抵抗能力，进一步的，威权国家可以根据这些元数据与你产生的其他元数据进行比对，从而对你进行进一步的定位与辨识。简单举一个例子，要求维护者提供或监视安装了 v2ray/qv2ray 等软件包的使用者的 ip,以及安装时间，以及其全部软件列表。

> 如果你在安装 arch linux 时的网络已经处于代理模式下，可以选择一个与你代理位置较近的，非威权国家的镜像源来使用。如果你在安装 arch linux 时的网络环境没有代理，那么在安装结束后，需要尽快更换一个非威权国家的镜像源来使用。如下列举一些较为优质的国际源。

```bash
Server = https://mirror.archlinux.tw/ArchLinux/$repo/os/$arch   #东亚地区:中华民国
Server = https://mirror.0xem.ma/arch/$repo/os/$arch    #北美洲地区:加拿大
Server = https://mirror.aktkn.sg/archlinux/$repo/os/$arch    #东南亚地区:新加坡
Server = https://archlinux.uk.mirror.allworldit.com/archlinux/$repo/os/$arch    #欧洲地区:英国
Server = https://mirrors.cat.net/archlinux/$repo/os/$arch    #东亚地区:日本
```

## 8.安装系统

必须的基础包

```bash
pacstrap /mnt base base-devel linux linux-headers linux-firmware  #base-devel在AUR包的安装是必须的
```

> 注意，目前需要首先确保等待 pacman-init.service 服务启动后，才能执行 pacstrap 或 pacman 命令安装包，否则会引发错误使得安装过程无法进行。使用`systemctl status pacman-init.service`命令来检查当前服务状态。更多内容参考 bbs 中的[帖子](https://bbs.archlinux.org/viewtopic.php?id=278518&p=2)

> 若安装时出现密钥环相关错误，参考此文章[GnuPG-2.1 and the pacman keyring](https://archlinux.org/news/gnupg-21-and-the-pacman-keyring/)并执行其中的命令。

必须的功能性软件

```bash
pacstrap /mnt dhcpcd iwd vim bash-completion   #一个有线所需(iwd也需要dhcpcd) 一个无线所需 一个编辑器 一个补全工具
```

## 9.生成 fstab 文件

fstab 用来定义磁盘分区

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

复查一下 /mnt/etc/fstab 确保没有错误

```bash
cat /mnt/etc/fstab
```

## 10.change root

把环境切换到新系统的/mnt 下

```bash
arch-chroot /mnt
```

## 11.时区设置

设置时区，在/etc/localtime 下用/usr 中合适的时区创建符号连接。如下设置上海时区。

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

随后进行硬件时间设置，将当前的正确 UTC 时间写入硬件时间。

```bash
hwclock --systohc
```

## 12.设置 Locale 进行本地化

Locale 决定了地域、货币、时区日期的格式、字符排列方式和其他本地化标准。

首先使用 vim 编辑 /etc/locale.gen，去掉 en_US.UTF-8 所在行以及 zh_CN.UTF-8 所在行的注释符号（#）。这里需要使用 vim 的寻找以及编辑功能，如果你忘记了，请翻到上一节复习 vim 的操作。

```bash
vim /etc/locale.gen
```

然后使用如下命令生成 locale。

```bash
locale-gen
```

最后向 /etc/locale.conf 导入内容

```bash
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
```

## 13.设置主机名

首先在`/etc/hostname`设置主机名

```bash
vim /etc/hostname
```

加入你想为主机取的主机名，这里比如叫 myarch。

接下来在`/etc/hosts`设置与其匹配的条目。

```
vim /etc/hosts
```

加入如下内容

```bash
127.0.0.1   localhost
::1         localhost
127.0.1.1   myarch
```

> 某些情况下如不设置主机名，在 KDE 下可能会存在网络情况变更时无法启动 GUI 应用的问题，在终端中出现形如`No protocol specified qt.qpa.xcb: could not connect to display`的错误，这种情况较为少见[[3]](https://bbs.archlinux.org/viewtopic.php?id=241338)[[4]](https://bbs.archlinux.org/viewtopic.php?id=243674)[[5]](https://wiki.archlinux.org/title/Network_configuration#Local_hostname_resolution)。

## 14.为 root 用户设置密码

```bash
passwd root
```

## 15.安装微码

```bash
pacman -S intel-ucode   #Intel
pacman -S amd-ucode     #AMD
```

## 16.安装引导程序

```bash
pacman -S grub efibootmgr   #grub是启动引导器，efibootmgr被 grub 脚本用来将启动项写入 NVRAM。
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=GRUB
```

接下来编辑/etc/default/grub 文件，去掉`GRUB_CMDLINE_LINUX_DEFAULT`一行中最后的 quiet 参数，同时把 log level 的数值从 3 改成 5。这样是为了后续如果出现系统错误，方便排错。同时在同一行加入 nowatchdog 参数，这可以显著提高开关机速度。这里需要使用 vim 的编辑功能，如果你忘记了，请翻到上一节复习 vim 的操作。

```bash
vim /etc/default/grub
```

最后生成 GRUB 所需的配置文件

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

> 我们在之前的命令中指定了 bootloader-id 为 GRUB，这一般不会出现问题。然而在某些主板安装完成后，你会发现没有 nvme 启动条目。这是因为某些主板的 UEFI 固件在显示 UEFI NVRAM 引导条目之前，需要在特定的位置存放可引导文件，不支持自定义存放 efi 文件[[6]](https://wiki.archlinux.org/index.php/GRUB#Default/fallback_boot_path)。解决方式是使用`--removable` 参数解决一些主板 NVRAM 的兼容性问题。

```bash
grub-install --target=x86_64-efi --efi-directory=/efi --removable
grub-mkconfig -o /boot/grub/grub.cfg
```

除此之外，如果你的主板是一些较老的型号，如 intel 9 系列以下或者较老 AMD 的主板，它们很可能不支持从 nvme 启动系统，虽然可以通过修改 BIOS 加入 NVME 支持模块来解决，但这不在本文讨论范围内。

## 17.完成安装

```bash
exit                # 退回安装环境#
umount -R  /mnt     # 卸载新分区
reboot              # 重启
```

注意，重启前要先拔掉优盘，否则你重启后还是进安装程序而不是安装好的系统。重启后，开启 dhcp 服务，即可连接网络

```bash
systemctl start dhcpcd  #立即启动dhcp
ping www.gnu.org      #测试网络连接
```

若为无线链接，则还需要启动 iwd 才可以使用 iwctl 连接网络

```bash
systemctl start iwd #立即启动iwd
iwctl               #和之前的方式一样，连接无线网络
```

到此为止，一个基础的，无 UI 界面的 Arch Linux 已经安装完成了。紧接着下一节，我们来安装图形界面。

> archlinux 在 2021 年 4 月在安装镜像中内置了一个[安装脚本](https://archlinux.org/packages/extra/any/archinstall/)，提供一些选项，即可快速安装。其和所有一键安装脚本类似，提供自动化，且不灵活的安装过程。不建议使用这种安装脚本，除了不灵活的原因，初学者也无法在这种安装过程中学到任何东西。如果你因为任何原因需要快速启动一个基础的 archlinux 环境，那么可以尝试此脚本。
