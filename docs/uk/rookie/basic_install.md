<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Arch Linux Basic Installation

This section starts with the installation of the most basic non-graphic ArchLinux system.[Official installation guidelines](https://wiki.archlinux.org/index.php/Installation_guide)

## . Disable

Reflector will select the right speed mirror source for you, but the result is not accurate, and the contents of the configuration file will be emptied, not applicable to new people, and we will disable them first.

```bash
systemctl stop reflector.service
```

## 1. Ensure again that it is UEFI mode

After a series of information screens, you can see that the installation system has been installed with root, and the command can be executed at this time:

```bash
ls /sys/firmware/efi/efivars
```

If you output a bunch of things, or efi variables, this indicates that you are in UEFI mode. Otherwise make sure your startup mode is UEFI.

## 2. Connecting networks

As a general rule, you can almost always use DHCP for IP addresses and DNS-related settings, without extra operation. In the absence of a suitable network, mobile hotspots using mobile phones are also an easy option. If your network environment requires the configuration of static IPs and DNS, refer to Arch Wiki.

For wired connections, just insert a direct web line.

For wireless connections, the following operations are required for network connectivity.

Wireless connections are performed using iwctl commands and network connections are made according to the following steps:

```bash
iwctl                           #执行iwctl命令，进入交互式命令行
device list                     #列出设备名，比如无线网卡看到叫 wlan0
station wlan0 scan              #扫描网络
station wlan0 get-networks      #列出网络 比如想连接YOUR-WIRELESS-NAME这个无线
station wlan0 connect YOUR-WIRELESS-NAME #进行连接 输入密码即可
exit                            #成功后exit退出
```

You can wait a few seconds for the network to be linked before the following network is tested.

```bash
ping www.gnu.org
```

---

**If**You can't connect the network properly. First, confirm that the system is active.[[1]](https://wiki.archlinux.org/index.php/Network_configuration/Wireless#Check_the_driver_status)I don't know.

```bash
ip link  #列出网络接口信息，如不能联网的设备叫wlan0
ip link set wlan0 up #比如无线网卡看到叫 wlan0
```

**If**Then I saw something like that.`Operation not possible due to RF-kill`You're wrong. Keep trying.`rfkill`Command to unlock the wireless card.

```bash
rfkill unblock wifi
```

## 3. Updating of the system clock

```bash
timedatectl set-ntp true    #将系统时间与网络时间进行同步
timedatectl status          #检查服务状态
```

## 4. Division

There are three partitions, one.**We think...**More generic programmes. This step will clear the disk in its entirety.

- EFI Division[[2]](https://wiki.archlinux.org/title/EFI_system_partition#Mount_the_partition):`/efi` 800M
- Root directory:`/` 100G
- User home directory:`/home`All remaining

> The size of this table of contents is only a reference, and generally the linux allocation of 100G is enough. The minimum proposal for root directories is not less than 50G, and too small a root directory would make it impossible to update the system package, for example.

First convert the disk to a gpt type, assuming, for example, that the disk you want to install is sdx. If you use NVME's solid-state hard drive, the disk name you see may be nvme0n1.

```bash
lsblk                       #显示分区情况 找到你想安装的磁盘名称
parted /dev/sdx             #执行parted，进入交互式命令行，进行磁盘类型变更
(parted)mktable             #输入mktable
New disk label type? gpt    #输入gpt 将磁盘类型转换为gpt 如磁盘有数据会警告，输入yes即可
quit                        #最后quit退出parted命令行交互

```

Next use the cfdisk command against the disk partition. The operation after entering the cfdisk is intuitive, using the keyboard orientation key, the Tab key, and the return key to handle the size and format of the partitions. It was generally suggested that the EFI partition be set to the first partition of the disk, and it was said that some of the main plates might be incompatible if the EFI were not set to the first partition. where EFI partition selection`EFI System`Type, two remaining partitions selected`Linux filesystem`Type.

```bash
cfdisk /dev/sdx #来执行分区操作,分配各个分区大小，类型
fdisk -l #分区结束后， 复查磁盘情况
```

## Formatting

With the creation of the partitions, they will need to be formatted using the appropriate documentation systems. Here.`mkfs.ext4`Command format root partitions and home partitions, using`mkfs.vfat`Command formatted EFI partitions. in the sdax command below, x represents the number of the partition. Formatting commands must correspond to the division name generated in the previous partition.

If you have data in advance, you'll be prompted: 'proceed any way?' Press y to continue.

```bash
mkfs.ext4  /dev/sdax            #格式化根目录和home目录的两个分区
mkfs.vfat  /dev/sdax            #格式化efi分区
```

## Mount

When mounted, the mount is sequential, the root partition is mounted before the EFI partition is mounted.
The sdax here is just an example, based on your own actual zoning.

```bash
mount /dev/sdax  /mnt
mkdir /mnt/efi     #创建efi目录
mount /dev/sdax /mnt/efi
mkdir /mnt/home    #创建home目录
mount /dev/sdax /mnt/home
```

## 7. Selection of mirror sources

Edit the mirror list with the following command:

```bash
vim /etc/pacman.d/mirrorlist
```

The first line is the mirror source that will be used. Add medium size or Qinghua at the top.

```
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
```

If the speed is poor, you can manually assign another mirror source. Full list of mirror sources for official reference[Mirror Source Generator](https://archlinux.org/mirrorlist/)I don't know.

> Image sources in China are used here to increase speed of access. But there's a problem with mirror sources (e.g. aarch linux) and third-party sources. LikearchlinuxYou can see what your ip is, when you update the system, when you check the system, when you update the software, what you install. There is every possibility that mirror-source defenders in a powerful country will be able to match these data with those required by the authorities, and that many defenders are online with virtually no real name, and they have no resistance. Further, the powerful country can further locate and identify you by comparing these metadata with other metadata generated by you. A simple example is the ip of a user who is required to provide or monitor software packages such as v2ray/qv2ray, as well as the time of installation, and a list of all its software.

> If the network you installed at Arch Linux is already in proxy mode, you can select a mirror source for a non-authority country that is close to your proxy position. If you have no proxy for the network environment at the time of installation of aarch linux, you need to replace the mirror source of a non-authority country as soon as possible after installation. Some of the better international sources are listed below.

```bash
Server = https://mirror.archlinux.tw/ArchLinux/$repo/os/$arch   #东亚地区:中华民国
Server = https://mirror.0xem.ma/arch/$repo/os/$arch    #北美洲地区:加拿大
Server = https://mirror.aktkn.sg/archlinux/$repo/os/$arch    #东南亚地区:新加坡
Server = https://archlinux.uk.mirror.allworldit.com/archlinux/$repo/os/$arch    #欧洲地区:英国
Server = https://mirrors.cat.net/archlinux/$repo/os/$arch    #东亚地区:日本
```

## 8. Installation of systems

Required base pack

```bash
pacstrap /mnt base base-devel linux linux-headers linux-firmware  #base-devel在AUR包的安装是必须的
```

> Note that there is a need to ensure that the pacman-init.service service is started before the pacstrap or pacman command installation package can be executed, otherwise errors can be triggered that make the installation impossible. Use`systemctl status pacman-init.service`Command to check the current service status. More references in bbs[Post.](https://bbs.archlinux.org/viewtopic.php?id=278518&p=2)

> If there is a keyring-related error at installation, refer to this article[GnuPG-2.1 and the pacman keyring](https://archlinux.org/news/gnupg-21-and-the-pacman-keyring/)And carry out the orders therein.

Required Functional Software

```bash
pacstrap /mnt dhcpcd iwd vim bash-completion   #一个有线所需(iwd也需要dhcpcd) 一个无线所需 一个编辑器 一个补全工具
```

## 9. Generate fstab files

fstab to define disk partitions

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

Review /mnt/etc/fstab to make sure no mistakes

```bash
cat /mnt/etc/fstab
```

## 10.change root

Switch environment to new system/ mnt

```bash
arch-chroot /mnt
```

## 11. Time zone settings

Sets the time zone to create a symbol connection with the appropriate time zone in/etc/localtime. Set the Shanghai time zone as follows.

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

The current UTC time is written to the hardware time.

```bash
hwclock --systohc
```

## 12. Localize Locale

Locale determines the format, character organization and other localization criteria for geography, currency, time zone dates.

Use vim first to edit /etc/locale.gen, remove the annotated symbol (#) for the row where en US.UTF-8 and zh CN.UTF-8 are located. This needs to use the vim search and editing function. If you forget, turn to the previous section to review the vim operation.

```bash
vim /etc/locale.gen
```

The following command is then used to generate locale.

```bash
locale-gen
```

Last import to /etc/locale.conf

```bash
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
```

## 13. Set up hostname

First of all,`/etc/hostname`Set hostname

```bash
vim /etc/hostname
```

Add the host name you want to take for the host here, like myarch.

Next`/etc/hosts`Sets the entry that matches it.

```
vim /etc/hosts
```

Add

```bash
127.0.0.1   localhost
::1         localhost
127.0.1.1   myarch
```

> In some cases, without the hostname, there may be problems with the possibility of starting GUI applications when network conditions change in KDE as if`No protocol specified qt.qpa.xcb: could not connect to display`It's not unusual.[[3]](https://bbs.archlinux.org/viewtopic.php?id=241338)[[4]](https://bbs.archlinux.org/viewtopic.php?id=243674)[[5]](https://wiki.archlinux.org/title/Network_configuration#Local_hostname_resolution)I don't know.

## Set password for root users

```bash
passwd root
```

## 15. Installation of microcodes

```bash
pacman -S intel-ucode   #Intel
pacman -S amd-ucode     #AMD
```

## 16. Installation of a lead program

```bash
pacman -S grub efibootmgr   #grub是启动引导器，efibootmgr被 grub 脚本用来将启动项写入 NVRAM。
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=GRUB
```

Next edit/etc/default/grub files, remove`GRUB_CMDLINE_LINUX_DEFAULT`The last quiet parameter in a row is replaced by the log level value from 3 to 5. This is to follow up on systemic errors and to facilitate the scheduling of errors. Also add the nowatdog parameter to the same line, which will significantly increase the switch speed. Here you need to use the vim editing function. If you forget, turn to the previous section to review the vim operation.

```bash
vim /etc/default/grub
```

The user using the N card needs to note that the KDE6 default uses the wayland session as default, and if you need to use the wayland, you need to open the DRM. Also edit/etc/default/grub files, in`GRUB_CMDLINE_LINUX_DEFAULT`Last addition parameter in line: nvidia drm.modeet=1

The profile required to eventually generate GRUB

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

> We have named bootloader-id as GRUB in the previous order, which is not usually problematic. However, when certain master panels are installed, you will find no nvme start entries. This is because some of the main panel's UEFI firmwares need to store the guidance file in a specific location before displaying the UEFI NVRAM lead entry and do not support custom storage of the efi file[[6]](https://wiki.archlinux.org/index.php/GRUB#Default/fallback_boot_path)I don't know. The solution is to use`--removable`Parameters address the compatibility of some mainboard NVRAM.

```bash
grub-install --target=x86_64-efi --efi-directory=/efi --removable
grub-mkconfig -o /boot/grub/grub.cfg
```

In addition, if your master board is some of the older models, such as the main board of the intel 9 series or older AMD, it is likely that they will not support the start-up of the system from nvme, although this can be done by modifying the BIOS into the NVME support module, but this is not part of the discussion here.

## 17. Installation completed

```bash
exit                # 退回安装环境#
umount -R  /mnt     # 卸载新分区
reboot              # 重启
```

Note that before restarting, you have to remove the disk before restarting, or you have to reboot the program instead of the installed system. Upon restart, open dhcp service to connect the network

```bash
systemctl start dhcpcd  #立即启动dhcp
ping www.gnu.org      #测试网络连接
```

If a wireless link is available, iwd is needed to use iwctl to connect the network

```bash
systemctl start iwd #立即启动iwd
iwctl               #和之前的方式一样，连接无线网络
```

So far, a base, no UI interface, Arch Linux has been installed. Next section, we'll install a graphical interface.

> archlinux In April 2021, a mirror was installed.[Install Script](https://archlinux.org/packages/extra/any/archinstall/), provides options for quick installation. It is similar to all one-key installation scripts and provides automated and inflexible installation processes. The use of such installation scripts is not recommended and, except for reasons of inflexibility, beginners cannot learn anything during such installation. If you need to start a base quickly for any reason,archlinuxEnvironment, then try this script.
