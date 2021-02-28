# Arch Linux 基础安装二十步

从安装最基础的 ArchLinux 系统开始，由于当前已经是 2021 年，安装将全部以 UEFI+GPT 的形式进行，传统 BIOS 方式不再赘述。  
官方文档: [安装指南](https://wiki.archlinux.org/index.php/Installation_guide)  
相关视频链接： [2020ArchLinux 安装教程](https://www.bilibili.com/video/BV1qf4y1D7Da/) 视频中可看到全部操作步骤 强烈建议观看视频配合文字学习。

> 如果你的环境只能使用无线网络安装，需要事先把自己所用的 wifi 名称改成自己能记住的英文名称。因为安装时无法显示和输入中文名的 wifi，你会看到一堆不知道是什么的方块。

> 有些笔记本电脑上存在无线网卡的硬件开关或者键盘控制，安装前需要确保你的无线网卡硬件开关处于打开状态。

### 1.刻录启动优盘

准备一个 2G 以上的优盘，刻录一个安装启动盘。

Windows 下推荐使用[Power ISO](https://www.poweriso.com/download.php)或者[Rufus](https://rufus.ie/)进行光盘刻录。二者皆为免费使用的软件。具体操作请自行查阅，都非常简单。

Linux 下可以直接用 dd 命令进行刻录。注意 of 的参数为 sdx,不是 sdx1 sdx2 等。

```bash
sudo dd bs=4M if=/path/to/archlinux.iso of=/dev/sdx status=progress oflag=sync
```

bs=4M 指定一个较为合理的文件输入输出块大小。  
status=progress 用来输出刻录过程总的信息。  
oflag=sync 用来控制写入数据时的行为特征。确保命令结束时数据及元数据真正写入磁盘，而不是刚写入缓存就返回。

### 2.主板 BIOS 相关设置

在开机的时候，按下 F2/F8/F10 等(取决与你的主板型号，具体请查阅你主板的相关信息)按键，进入主板的 BIOS 设置界面。

#### 关闭主板设置中的 Secure Boot

找到一项名为 Secure Boot(名称可能略有差异)的选项，将其 Disable 禁用。

#### 调整硬盘启动顺序

找到类似名为 Boot Options 的设置选项，将 USB 优盘的启动顺序调至首位。

#### 调整启动方式为 UEFI

在某些旧的主板里，需要调整启动模式为 UEFI,而非传统的 BIOS。找到类似名为 Boot Mode 的选项，确保将其调整为 UEFI only，而非 legacy。

最后插入优盘，保存退出，一般的按键是 F10。此时系统重启，不出意外你应该已经进入 archlinux 的安装界面。

#### 检测是否为 UEFI

在一系列的信息刷屏后，可以看到已经以 root 登陆安装系统了，此时第一个执行的命令是：

```bash
ls /sys/firmware/efi/efivars
```

若输出了一堆东西，说明已在 UEFI 模式。否则请确认你的启动方式是否为 UEFI。

### 3.连接网络

无线连接:

```bash
iwctl                           #进入交互式命令行
device list                     #列出设备名，比如无线网卡看到叫 wlan0
station wlan0 scan              #扫描网络
station wlan0 get-networks      #列出网络 比如想连接CMCC-5AQ7这个无线
station wlan0 connect CMCC-5AQ7 #进行连接 输入密码即可
exit                            #成功后exit退出
```

有线连接:  
正常来说，只要插上一个已经联网的路由器分出的网线(DHCP)，直接就能联网。

可以等待几秒等网络建立链接后再进行下步测试网络的操作。

### 4.测试网络

```bash
ping www.baidu.com
```

若能看到数据返回，即说明已经联网，ctrl+c 终止退出当前命令。如果还是无法连接，使用 `ip link set xxx up` 命令确认你已经激活了对应的网卡，再重新继续网络链接与测试。若看到类似`Operation not possible due to RF-kill`的报错，继续尝试`rfkill unblock wifi`来解锁无线网卡。

### 5.禁用 reflector

2020 年新版 archliveiso 加入了 reflector 服务，它会自己更新 mirrorlist，然而其结果并不准确，并且会删除掉部分源信息，包括中国的源，这里联网后的第一件事就是将其禁用。也许它是一个好用的工具，但是很明显，它并不适合在安装的时候启用，尤其在中国。

```bash
systemctl stop reflector.service
```

### 6.更新系统时钟

```bash
timedatectl set-ntp true    #将系统时间与网络时间进行同步
timedatectl status          #检查服务状态
```

### 7.更换国内镜像源加快下载速度

```bash
vim /etc/pacman.d/mirrorlist    #不会vim的同学，此处注意视频中的vim操作步骤
```

放在最上面的是会使用的更新源,把中科大 ustc 的或者清华的放在最上面。

### 8.分区

这里总共设置四个分区，可以满足绝大多数人的需求。

- 根目录： `/` 100G
- EFI： `/boot` 300M
- 交换分区: `swap` 2G
- 用户主目录： `/home` 剩余全部 越大越好

```bash
lsblk                       #显示分区情况
parted /dev/sdx             #执行parted，进行磁盘类型变更
(parted)mktable
New disk label type? gpt    #输入gpt 将磁盘类型转换为gpt 如磁盘有数据会警告，输入yes即可
quit                        #最后quit退出parted命令行交互
cfdisk  /dev/sdx            #来执行分区操作,分配各个分区大小，类型
fdisk -l                    #复查磁盘情况
```

cfdisk 分区的详细操作见视频中的教学。一般建议将 EFI 分区设置为磁盘的第一个分区，据说有些主板如果不将 EFI 设置为第一个分区，可能有不兼容的问题。

### 9.格式化

这里的 sdax 只是例子，具体根据你的实际情况来，请注意视频中的操作。

```bash
#磁盘若有数据会问 'proceed any way?' y回车 即可
mkfs.ext4  /dev/sdax            #格式化根目录和home目录的两个分区
mkfs.vfat  /dev/sdax            #格式化efi分区
mkswap -f /dev/sdax             #格式化swap
swapon /dev/sdax                #打开swap分区
```

### 10.挂载

在挂载时，挂载是有顺序的，需要从根目录开始挂载  
这里的 sdax 只是例子，具体根据你的实际情况来，请注意视频中的操作。

```bash
mount /dev/sdax  /mnt
mkdir /mnt/home
mount /dev/sdax /mnt/home
mkdir /mnt/boot
mount /dev/sdax /mnt/boot
```

### 11.安装系统

基础包

```bash
pacstrap /mnt base base-devel linux linux-firmware  #base-devel在AUR包的安装是必须的
```

功能性软件

```bash
pacstrap /mnt dhcpcd iwd vim sudo bash-completion   #一个有线所需 一个无线所需 一个编辑器  一个提权工具 一个补全工具 iwd也需要dhcpcd
```

### 12.生产 fstab

fstab 用来定义磁盘分区

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

复查一下 /mnt/etc/fstab 确保没有错误

```bash
cat /mnt/etc/fstab
```

### 13.change root

把环境切换到新系统的/mnt 下

```bash
arch-chroot /mnt
```

### 14.时区

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime     #为/usr下合适的时区在/etc下创建符号连接
```

### 15.硬件时间设置

将系统时间同步到硬件时间

```bash
hwclock --systohc
```

### 16.设置 Locale

Locale 决定了软件使用的语言、书写习惯和字符集。

编辑 /etc/locale.gen，去掉 en_US.UTF-8 行以及 zh_CN.UTF-8 的注释符号（#）。

然后使用如下命令生成 locale。

```bash
locale-gen
```

向 /etc/locale.conf 输入内容

```bash
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
```

### 17.为 root 用户设置密码

```bash
passwd root
```

### 18.安装微码

```bash
pacman -S intel-ucode   #Intel
pacman -S amd-ucode     #AMD
```

### 19.安装引导程序

```bash
pacman -S grub efibootmgr   #grub是启动引导器，efibootmgr被 grub 脚本用来将启动项写入 NVRAM。
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB #取名为GRUB 并将grubx64.efi安装到之前的指定位置
```

接下来编辑/etc/default/grub 文件，去掉`GRUB_CMDLINE_LINUX_DEFAULT`一行中最后的 quiet 参数，这样是为了后续如果出现系统错误，方便排错。不会 vim 的同学注意视频中的操作。

```bash
vim /etc/default/grub
```

最后生成 GRUB 所需的配置文件

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

> 在某些主板安装完成后，你会发现没有启动条目。这是因为某些主板的 UEFI 固件在显示 UEFI NVRAM 引导条目之前，需要在特定的位置存放可引导文件，不支持自定义存放 efi 文件(如微星 Z170-A Gaming PRO)。解决方案是在默认启动路径下安装 GRUB。重新插入安装优盘，挂载目录，chroot 到/mnt，然后你可以直接把已经生成好的 efi 文件移动到默认目录下，如下代码所示。只有安装完成后你的主板不出现启动条目才需要尝试如下命令，正常安装无需执行。[官方参考文档](https://wiki.archlinux.org/index.php/GRUB#Default/fallback_boot_path)

```bash
mkdir -p /boot/EFI/BOOT
mv /boot/EFI/GRUB/grubx64.efi /boot/EFI/BOOT/BOOTX64.EFI
```

### 20.完成安装

```bash
exit                # 退回安装环境#
umount -R  /mnt     # 卸载新分区
reboot              # 重启
```

注意，重启前要先拔掉优盘，否则你重启后还是进安装程序而不是安装好的系统。重启后，开启 dhcp 服务，即可连接网络

```bash
systemctl start dhcpcd  #立即启动dhcp
ping www.baidu.com      #测试网络连接
```

若为无线链接，则还需要启动 iwd 才可以使用 iwctl 连接网络

```bash
systemctl start iwd #立即启动iwd
iwctl               #和之前的方式一样，连接无线网络
```

到此为止，一个基础的，无 UI 界面的 Arch Linux 已经安装完成了。紧接着下一节，我们来安装图形界面。
