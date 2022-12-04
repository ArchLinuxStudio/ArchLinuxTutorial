# Troubleshooting and solutions

This section describes some of the problems that you are likely to encounter in daily use, and provides solutions.

### Install Arch Linux using BIOS+GPT mode

Although there are fewer and fewer installation scenarios using traditional BIOS mode, in some special scenarios, such as installing Arch Linux on a VPS, it may still be necessary to use BIOS mode. This section describes the differences between installing in BIOS+GPT mode and UEFI+GPT mode, and most of the steps are the same.

- Before installation, in the motherboard's BIOS settings, or in the VPS's boot settings (if any), adjust the boot mode to Legacy BIOS mode boot.
- When partitioning, you need to separate a 2M BIOS boot mode partition, this partition does not need to be formatted and mounted.
- When installing the bootloader, the corresponding commands are modified to: `grub-install --target=i386-pc /dev/vda` and `grub-mkconfig -o /boot/grub/grub.cfg`. Among them, `/dev/vda` in the first command is the disk where GRUB is installed, not a partition. The specific name is changed according to the actual situation of the installer.

### Static IP Settings

Although the use of tools that can automatically obtain IP addresses can cover most scenarios, there are still some special scenarios, such as campus networks, VPS and other environments that require static IP settings. This section gives a brief way to set a static IP. If you need to set a static IP, you need to disable the tools that automatically obtain IP such as dhcpcd or NetworkManager.

```bash
sudo systemctl stop dhcpcd NetworkManager
sudo systemctl disable dhcpcd NetworkManager
```

Next enable systemd-networkd

```bash
sudo systemctl enable --now systemd-networkd
```

Use the `ip ad` command to view the name of the current network card, for example, the name ens3 is used here. Then create the configuration file `/etc/systemd/network/10-static-ens3.network`. Then fill in the content in it. The ip address and gateway need to be obtained from your network provider. The DNS settings also need to be set in `/etc/resolv.conf` in the same way as above.

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

Finally, restart the service.

```bash
sudo systemctl restart systemd-networkd
```

### The mouse button is insensitive or malfunctioning

Generally speaking, most mice are plug and play, but may experience failure after the 5.14 kernel update. It can be solved by installing the corresponding driver according to your own mouse brand. [[1]](https://openrazer.github.io/#arch)

### It takes a long time to shut down when shutting down

Generally, a message in the form of `A stop job is running for...(1m30s)` will appear on the screen. This is a common problem that the shutdown is stuck for 1 minute and 30 seconds. Generally speaking, this situation is caused by a certain A process is unwilling to stop when it is shut down, and needs to wait until the timeout period is reached to force it to stop. The general solution is to adjust and shorten this waiting time. It is recommended to adjust it from 1 minute and 30 seconds to 30 seconds. 30 seconds is enough for almost all processes to end normally.

Edit `/etc/systemd/system.conf`

```bash
sudo vim /etc/systemd/system.conf
```

Find the `DefaultTimeoutStopSec` item, remove the pound sign in front of it, and assign the value to 30s. Finally execute daemon-reload to make it take effect.

```bash
sudo systemctl daemon-reload
```

The above solution actually only reduces this waiting time, and does not solve the actual problem. If you want to troubleshoot the real cause of the problem, if the message `A stop job is running for...(1m30s)` appears during shutdown, wait patiently for the shutdown to end, then restart the computer and execute the following commands:

```bash
journalctl -p5
```

Press / (slash key) to search for the `Killing` keyword, find the matching line near the time you shut down, you can see which process caused the timeout nearby, and then check what is wrong with this process. Can.

ref: [[1](https://forum.manjaro.org/t/a-stop-job-is-running-for-user-manager-for-uid-1000-during-shutdown/37799)][[ 2](https://unix.stackexchange.com/questions/273876/a-stop-job-is-running-for-session-c2-of-user)]

### How to deal with insufficient disk capacity

Generally use LVM to install Linux system without worrying about this happening. But we are using the traditional ext4 classic partitioning method. In this case, it is generally recommended to set the root directory larger at the beginning of the installation, such as 100G. If the size of the /home partition is not enough, you can install a new hard disk, mount it to the location you want, and then follow the steps of `basic installation` to re-genfstab it.

In addition, if the root directory capacity is insufficient, you can clean the pacman cache from time to time, see [archwiki](https://wiki.archlinux.org/title/Pacman#Cleaning_the_package_cache) for details. If it is too long to read, you can directly use the following command to clean up all cached packages that are not installed, and the synchronization database that is not used.

```bash
sudo pacman -Sc
```

### Software downgrade

Occasionally, on archlinux, the latest version of a certain package has various problems, such as some software is too new, and some dependencies are not supported, such as [virtualbox crash under linux5.18 kernel](https:// bugs.archlinux.org/task/74900), at which point the package needs to be downgraded for normal use. A package can be either normal software or the kernel.

```bash
yay -S downgrade
```

Just install this package, and the usage method is also very simple. Just add the package name to be downgraded after downgrade, and then you will be prompted to select the version to be downgraded to, just click.

### An error like unable to lock database occurs when upgrading the system

There may be abnormal shutdown or abnormal program exit when the system is upgraded, or multiple pacman related programs are executed at the same time. Just remove the db lock of pacman

```bash
sudo rm /var/lib/pacman/db.lck
```

### Manual switch mixer

Sometimes the mixer needs to be turned on or off manually for some reason, but currently the mixer cannot be turned off directly in the settings under KDE without shutting down. The following command provides the effect of manually switching the mixer on and off. [[1]](https://unix.stackexchange.com/questions/597736/disabling-kwin-compositor-from-command-line)

```bash
qdbus org.kde.KWin /Compositor suspend #disable

qdbus org.kde.KWin /Compositor resume #Open


```

### Screen overflow: overscan

When connecting some old-fashioned display devices, the phenomenon of [overscan](https://en.wikipedia.org/wiki/Overscan) may appear. Simply put, the TV screen will overflow in four circles, and it will not be displayed. . For Intel HD graphics, you can choose intel panel fitter [[1]](https://askubuntu.com/questions/508358/overscanning-picture-problem-using-hdmi-with-intel-graphics). The last thing is to add to a service to automatically start at boot, and execute [[2]](https://unix.stackexchange.com/questions/397853/how-to-set-a-systemd-unit-to-start-after-loading-the-desktop).

```
sudo intel_panel_fitter -p A -x 1230 -y 700
```

---

## Ref

- [[1]GUID 分区表*(GPT)*特殊操作](<https://wiki.archlinux.org/title/GRUB_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#GUID%E5%88%86%E5%8C%BA%E8%A1%A8_(GPT)_%E7%89%B9%E6%AE%8A%E6%93%8D%E4%BD%9C>)
