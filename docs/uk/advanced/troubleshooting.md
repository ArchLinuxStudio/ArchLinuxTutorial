<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Exclusion and resolution of common problems

This section describes some of the problems you may encounter during your daily use with great probability and provides solutions.

### Install Arch Linux using BIOS+GPT mode

Although there are fewer scenarios installed using the traditional BIOS model, there may still be a need to use the BIOS model for certain special scenarios, such as the installation of Arch Linux on VPS. This subsection describes the difference between installation in the BIOS+GPT mode and installation in the UEFI+GPT mode, most of the steps being the same.

- Prior to installation, in the BIOS settings of the main board, or in the VPS startup settings, if any, adjust the startup mode to the traditional BIOS mode.
- An additional 2M BIOS Boot mode partition is required for partitions, which need not be formatted or mounted.
- The corresponding command was amended to read:`grub-install --target=i386-pc /dev/vda`and`grub-mkconfig -o /boot/grub/grub.cfg`I don't know. Of which, in the first order,`/dev/vda`To install a GRUB disk instead of partitioning. The specific name is changed according to the actual circumstances of the installation.

### Static IP Settings

While most scenes are covered by the use of tools that automatically access the ip address, some special scenarios, such as campus networks and VPS, require static IP settings. This subsection gives a brief way to set static IPs. If static IPs are to be set, tools such as dhcpcd or NetworkManager need to be disabled to automatically access ip first.

```bash
sudo systemctl stop dhcpcd NetworkManager
sudo systemctl disable dhcpcd NetworkManager
```

Enable next stepmd-network

```bash
sudo systemctl enable --now systemd-networkd
```

Use`ip ad`Commands to view the name of the current card, e.g. by name ens3. Then create profile`/etc/systemd/network/10-static-ens3.network`I don't know. It is then filled in. Of which ip addresses and gateways need to be obtained from your network provider. The DNS settings are also required`/etc/resolv.conf`.

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

### The mouse appears to be insensitive or inoperable

Generally, most of the mouse is plug-in, but 5.14 kernel updates may result in failure. It can be solved by installing the corresponding driver on your own mouse brand.[[1]](https://openrazer.github.io/#arch)

### It's a long time before we can shut it down.

Usually the screen will be like`A stop job is running for...(1m30s)`This information, which is often encountered as a problem of closing in 1 minute and 30 seconds, is generally a situation where a process does not want to stop when it is off and needs to wait until the time has elapsed to force a halt. The common solution is to adjust this waiting time to reduce it from 1 minute 30 seconds to 30 seconds, which is enough for almost all processes to end normally.

Edit`/etc/systemd/system.conf`

```bash
sudo vim /etc/systemd/system.conf
```

Find it.`DefaultTimeoutStopSec`One, remove its forward well number and give it 30s. Finally implement daemon-reload to make it effective.

```bash
sudo systemctl daemon-reload
```

The above-mentioned solution simply reduced the waiting time and did not solve the real problem. If you want to figure out the real reason for the problem, if you turn it off,`A stop job is running for...(1m30s)`The information, patiently waiting for it to close down, then restart the computer and execute the following orders:

```bash
journalctl -p5
```

Press/ (Slash) search`Killing`Keywords, find the matching line in the vicinity of the time you shut down, and you can see in the vicinity which process caused the timeout and then go and check out what's wrong with the process.

ref: [[1](https://forum.manjaro.org/t/a-stop-job-is-running-for-user-manager-for-uid-1000-during-shutdown/37799)][[2](https://unix.stackexchange.com/questions/273876/a-stop-job-is-running-for-session-c2-of-user)]

### Processing methods with insufficient disk capacity

The use of LVM for the installation of Linux does not worry about this. But we use the traditional ext4 classic partition. In this case, it is generally recommended that the root directory be larger at the beginning of the installation, e.g. 100G. If the/home partition is not large enough, you can install a new hard drive to mount it in the location you want, then press`基础安装`The steps to reset the genfstab will suffice.

In addition to this, if the root directory is not sufficient, the cache of the pacman can be cleaned from time to time.[archwiki](https://wiki.archlinux.org/title/Pacman#Cleaning_the_package_cache)I don't know. It is too long to see that all cached packages that are not installed can be cleaned directly by using the following line command and the synchronized database that is not used.

```bash
sudo pacman -Sc
```

### Reduction of software

On archlinux there are occasional problems with the latest version of a particular package, such as new software, and some dependence is not supported, for example[virtualbox crashed under kernel 5.18](https://bugs.archlinux.org/task/74900), the package needs to be downgraded for normal use. Packages can be either generic software or kernels.

```bash
yay -S downgrade
```

Installing this package is sufficient and the method used is simple, and downgrade is followed by the name of the package that needs to be downgraded, which then prompts you to select the version that needs downgraded and click on it.

### Error while upgrading the system

There may be cases of abnormal shutdowns or abnormal exits at the time of system upgrades, or multiple pacman-related programs are being executed simultaneously. Remove the db lock of Pacman

```bash
sudo rm /var/lib/pacman/db.lck
```

### Manual Switch Composer

Sometimes the mixer needs to be manually turned on or off for some reason, but it is not possible for the mixer under KDE to shut it down directly without turning it off. The following command provides the effect of manual switch mixers.[[1]](https://unix.stackexchange.com/questions/597736/disabling-kwin-compositor-from-command-line)

```bash
qdbus org.kde.KWin /Compositor suspend  #禁用

qdbus org.kde.KWin /Compositor resume   #开启


```

### Screen overflow: overscan

When connected to some old display device, it may appear[overscan](https://en.wikipedia.org/wiki/Overscan)The phenomenon, in short, is that there's gonna be a loop out of the screen, and it doesn't show. For Intel core card, select the intel panel field[[1]](https://askubuntu.com/questions/508358/overscanning-picture-problem-using-hdmi-with-intel-graphics)I don't know. Finally, you have to add a service to the start-up autostart and execute it after the loading of the DE.[[2]](https://unix.stackexchange.com/questions/397853/how-to-set-a-systemd-unit-to-start-after-loading-the-desktop)I don't know.

```
sudo intel_panel_fitter -p A -x 1230 -y 700
```

---

## Ref

- [[1] GUID Partition Table* (GPT)* Special Operations](<https://wiki.archlinux.org/title/GRUB_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#GUID%E5%88%86%E5%8C%BA%E8%A1%A8_(GPT)_%E7%89%B9%E6%AE%8A%E6%93%8D%E4%BD%9C>)
