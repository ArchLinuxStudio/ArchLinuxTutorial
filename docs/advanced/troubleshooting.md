# 常见问题排除与解决

本节描述一些在日常使用过程中你有很大概率可能遇到的问题，并提供解决方法。

### 使用 BIOS+GPT 模式安装 Arch Linux

虽然使用传统 BIOS 模式安装的场景已经越来越少，但是在某些特殊场景，如在 VPS 上安装 Arch Linux,可能依然需要使用到 BIOS 模式。本小节讲述在使用 BIOS+GPT 模式安装时，与 UEFI+GPT 模式安装的不同点，其中绝大多数步骤是相同的。

- 安装前，在主板的 BIOS 设置中，或在 VPS 的启动设置中(如有)，将启动模式调整为传统 BIOS 模式启动。
- 在分区时，需要额外分出一个 2M 大小的 BIOS boot 模式的分区，此分区无需进行格式化与挂载。
- 在安装引导程序时，对应的命令修改为: `grub-install --target=i386-pc /dev/vda` 以及 `grub-mkconfig -o /boot/grub/grub.cfg`。其中，第一条命令中的`/dev/vda`为安装 GRUB 的磁盘，而非分区。具体的名字根据安装者的实际情况进行更改。

### 静态 IP 设置

虽然使用可以自动获取 ip 地址的工具可以覆盖绝大多数场景，但是仍有部分特殊场景，如校园网，VPS 等环境下需要进行静态 IP 的设置。本小节给出一个简略的设置静态 IP 的方式。如需要设置静态 IP,需要首先禁用 dhcpcd 或 NetworkManager 等自动获取 ip 的工具。

```bash
sudo systemctl stop dhcpcd NetworkManager
sudo systemctl disable dhcpcd NetworkManager
```

接下来启用 systemd-networkd

```bash
sudo systemctl enable --now systemd-networkd
```

使用`ip ad`命令查看当前网卡的名字，如这里使用名字 ens3。随后创建配置文件`/etc/systemd/network/10-static-ens3.network`。接下来在其中填入内容。其中的 ip 地址和网关需要从你的网络提供商处获取。其中的 DNS 设置同样需要在`/etc/resolv.conf`中按照前文中的方式进行设置。

```conf
[Match]
Name=ens3

[Network]
Address=YOUR_IPV4_ADDRESS/MASK
Gateway=YOUR_IPV4_GATEWAY
DNS=8.8.8.8

[Network]
Address=YOUR_IPV6_ADDRESS/MASK
Gateway=YOUR_IPV6_GATEWAY
DNS=2001:4860:4860::8888
```

最后，重启服务即可。

```bash
sudo systemctl restart systemd-networkd
```

### 鼠标出现按键不灵敏或失灵的现象

一般来说大多数鼠标都是即插即用的，但 5.14 内核前后更新后可能遇到失灵的情况。根据自身鼠标品牌安装对应的驱动即可解决。[[1]](https://openrazer.github.io/#arch)

### 关机时卡住很久才能关机

一般屏幕会出现形如`A stop job is running for...(1m30s)`的信息，这是经常会遇到的关机卡住 1 分 30 秒的问题，一般来说这种情况是出现了某个进程在关机时不愿停止，需要等到超时时间到达强行停止。通用的解决办法是调整缩短这个等待时间，建议从 1 分 30 秒调整至 30 秒，30 秒已经足够几乎所有进程正常结束。

编辑 `/etc/systemd/system.conf`

```bash
sudo vim /etc/systemd/system.conf
```

找到其中`DefaultTimeoutStopSec`一项，将其前方的井号去掉，并赋值为 30s 即可。最后执行 daemon-reload 使其生效。

```bash
sudo systemctl daemon-reload
```

上述解决方案其实只是将这个等待时间缩小了，并没有解决实际问题。如果你想排查问题真正的原因所在，在关机时如果出现了`A stop job is running for...(1m30s)`的信息，耐心等待其结束关机，然后重新启动电脑，执行以下命令：

```bash
journalctl -p5
```

按/(斜杠键)搜索`Killing`关键字，找到你关机的时间附近所在的匹配行，你可以在附近看到到底是哪一个进程导致了 timeout,然后再去排查这个进程有什么问题即可。

ref: [[1](https://forum.manjaro.org/t/a-stop-job-is-running-for-user-manager-for-uid-1000-during-shutdown/37799)][[2](https://unix.stackexchange.com/questions/273876/a-stop-job-is-running-for-session-c2-of-user)]

### 磁盘容量不足的处理方式

一般使用 LVM 安装 Linux 系统则不用担心这种情况发生。但是我们使用的是传统的 ext4 经典分区方式。这种情况下一般建议在安装的开始就将根目录设置的大一些，如 100G。如果/home 分区大小不够了，可以新安装一块硬盘，将其挂载到你想要的位置，再按照`基础安装`的步骤中重新 genfstab 一下就行了。

除此之外，如果根目录容量不足，可以不定期清理一下 pacman 的缓存，详见[archwiki](https://wiki.archlinux.org/title/Pacman#Cleaning_the_package_cache)。太长不看的可以直接用下面这一行命令清理没有安装的所有缓存的包，和没有被使用的同步数据库。

```bash
sudo pacman -Sc
```

### 软件的降级

在 archlinux 上 偶尔会出现某一个包的最新版本有各种问题的情况，如某些软件过新, 而一些依赖并没有支持,比如[virtualbox 在 linux5.18 内核下的崩溃](https://bugs.archlinux.org/task/74900)，此时需要降级该包以正常使用。包可以是普通软件，也可以是内核。

```bash
yay -S downgrade
```

安装此包即可，使用方法也很简单，downgrade 后加上需要降级的包名即可，随后会提示你选择需要降级到的版本，点选即可。

### 升级系统时出现形如 unable to lock database 的错误

可能存在升级系统时异常关机或程序异常退出的情况，或者多个 pacman 的相关程序在同时执行。移除 pacman 的 db 锁即可

```bash
sudo rm /var/lib/pacman/db.lck
```

### 手动开关混成器

有时混成器会因为某些原因需要手动开启或关闭，但是目前在 KDE 下混成器在设置里无法在不关机的情况下直接关闭，下面命令提供手动开关混成器的效果。[[1]](https://unix.stackexchange.com/questions/597736/disabling-kwin-compositor-from-command-line)

```bash
qdbus org.kde.KWin /Compositor suspend  #禁用

qdbus org.kde.KWin /Compositor resume   #开启


```

### 屏幕溢出: overscan

在连接一些老式的显示设备时，可能与出现[overscan](https://en.wikipedia.org/wiki/Overscan)的现象，简单来说就是电视屏幕四圈会有一圈溢出了，不显示出来。对于英特尔核芯显卡，可以选择 intel panel fitter 的方式[[1]](https://askubuntu.com/questions/508358/overscanning-picture-problem-using-hdmi-with-intel-graphics)。最后就是要加入到一个 service 里开机自动启动，并且是在 DE 加载完成后执行[[2]](https://unix.stackexchange.com/questions/397853/how-to-set-a-systemd-unit-to-start-after-loading-the-desktop)。

```
sudo intel_panel_fitter -p A -x 1230 -y 700
```

---

## Ref

- [[1]GUID 分区表*(GPT)*特殊操作](<https://wiki.archlinux.org/title/GRUB_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#GUID%E5%88%86%E5%8C%BA%E8%A1%A8_(GPT)_%E7%89%B9%E6%AE%8A%E6%93%8D%E4%BD%9C>)
