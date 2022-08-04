# Desktop environment and common applications

Official Documentation: [Working After Installation](https://wiki.archlinux.org/index.php/General_recommendations)
This section describes only the most basic components needed to make the system truly usable

Note: The software with <sup>AUR</sup> in the document represents the third-party software packaged by the user [AUR](https://aur.archlinux.org/), which is not officially supported by Arch. It may be There will be various problems such as untimely updates, inability to install, and use errors. If you encounter problems, you can go to their AUR page to see if there are solutions in other people's comments. If it is not a similar software that is not officially supported, it is not recommended to use it.

## 1. Make sure the system is up to date

If you restarted and left it for a while after completing the content of the previous section, you need to reconnect to the network as at the end of the previous section, and then update the system.

```bash
pacman -Syyu #Upgrade all packages in the system
```

## 2. Prepare non-root user

Add a user, for example, the newly added user is called testuser

```bash
useradd -m -G wheel -s /bin/bash testuser #wheel additional group can be sudo, execute the command as root user -m create user home directory at the same time
```

Set a password for the new user testuser

```bash
passwd testuser
```

Edit sudoers configuration file

```bash
EDITOR=vim visudo # need to run visudo command as root user
```

Find the following line, remove the preceding comment symbol `#`, save and exit with `:wq`.

```sudoers
#%wheel ALL=(ALL) ALL
```

Here's a little explanation
%wheel represents the wheel group, and the percent sign is the prefix
ALL= means it takes effect on all hosts (if the same `sudoers` file is sent to multiple hosts)
(ALL) means that you can be any target user
ALL means that any command can be executed
A more detailed example:

```sudoers
%mailadmin snow,rain=(root) /usr/sbin/postfix, /usr/sbin/postsuper, /usr/bin/doveadm
nobody ALL=(root) NOPASSWD: /usr/sbin/rndc reload
```

The group mailadmin can execute some mail server control commands as the root user. Can be executed on both "snow" and "rain" hosts
User nobody can execute the `rndc reload` command as root. Can be executed on all hosts. At the same time, you can not enter a password. (Normally sudo requires the caller's password)

## 3. Install KDE Plasma Desktop Environment

```bash
pacman -S plasma-meta konsole dolphin # install the plasma-meta meta package as well as the terminal and file manager
```

## 4. Configure greeter sddm

<!-- pacman -S sddm //included in plasma-meta, no need to install it separately
But plasma-desktop does not have to install it
-->

```
systemctl enable sddm
```

## 5. Set the swap file swap (optional)

In the desktop environment, the swap partition or file is used to implement the function of hibernate, that is, to save the current environment in the swap file or partition part of the disk. In addition, some specific software requires swap to function correctly. The performance of the swap file is the same as that of the partition, and the swap file is more flexible and can be changed in size, added and deleted at any time. [[1]](https://wiki.archlinux.org/title/Swap#Swap_file)

```bash
dd if=/dev/zero of=/swapfile bs=1M count=4096 status=progress #Create a 4G swap space, the size can be customized as needed
chmod 600 /swapfile #Set the correct permissions
mkswap /swapfile #Format swap file
swapon /swapfile #Enable swap file
```

Finally, **append** the following to /etc/fstab:

```bash
/swapfile none swap defaults 0 0
```

KDE itself provides an out-of-the-box sleep function (suspend), which suspends the system to memory and consumes a small amount of power. Hibernate (hibernate) will suspend the system to the swap partition or files, almost no power consumption. The sleep function can already meet the needs of most people. If you absolutely need the sleep function, you can refer to the [official document](https://wiki.archlinux.org/title/Power_management/Suspend_and_hibernate) to set up the relevant steps for sleep.

## 6. Enable 32-bit support library

```bash
vim /etc/pacman.conf
```

Uncomment the two lines in the [multilib] section to enable 32-bit library support.

Finally: wq save and exit, refresh the pacman database

```bash
pacman-Syyu
```

Restart the computer, you can see the welcome interface, enter the password of the new user to log in to the desktop

## 7. Install the basic function package

Once on the desktop, search for konsole. It is the default command line terminal for the KDE desktop environment.

First perform the network settings in the desktop environment:

```bash
sudo systemctl disable iwd #Ensure that iwd is turned off, its wireless connection will conflict with NetworkManager
sudo systemctl stop iwd #Same as above, close iwd immediately
sudo systemctl enable --now NetworkManager #Make sure to start NetworkManager first and connect to the network If iwd has conflicted with NetworkManager, just restart the computer after performing the previous step.
```

Next install some basic function packages.

```bash
sudo pacman -S sof-firmware alsa-firmware alsa-ucm-conf #some sound firmware that may be needed
sudo pacman -S ntfs-3g #Identify NTFS formatted hard disks
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei #Install several open source Chinese fonts Generally, installing Wenquanyi can solve the problem of most wine application Chinese squares
sudo pacman -S noto-fonts-cjk noto-fonts-emoji noto-fonts-extra #Install Google open source fonts and expressions
sudo pacman -S firefox chromium #Install commonly used Firefox and Google Chrome
sudo pacman -S ark # with dolphin right-click to decompress
sudo pacman -S p7zip unrar unarchiver lzop lrzip #Install ark optional dependencies
sudo pacman -S packagekit-qt5 packagekit appstream-qt appstream #Ensure that Discover (Software Center) is available and needs to be restarted
sudo pacman -S gwenview #imageviewer
sudo pacman -S git wget kate bind #some tools
```

> Don't install too many fonts: when there are more than 255 fonts, some QT programs may not display some emojis and symbols correctly, see link [2](https://wiki.archlinux.org/title/fonts#Emoji_and_symbols).

## 8. Set up DNS

Generally speaking, most routers connected to computers today can automatically handle DNS. If your router cannot handle it, you need to perform additional DNS settings. At the same time, if you use the default DNS provided by your ISP, your network access records will be at a greater risk of being leaked or stored by authorities. In addition, the use of DNS provided by the ISP may also resolve some services to some servers that have failed or degraded. Even if your network environment can handle DNS settings automatically, we recommend that you use trusted international DNS settings. The configuration below will always use Google's DNS, but network access latency may increase. After reading the proxy settings section that follows, your DNS requests will be sent through a proxy, which will maximize your privacy and security in DNS sending.

vim edit /etc/resolv.conf, delete existing entries, and add the following to it

```bash
nameserver 8.8.8.8
nameserver 2001:4860:4860::8888
nameserver 8.8.4.4
nameserver 2001:4860:4860::8844
```

If your router can automatically handle DNS, resolvconf will overwrite the settings in the local /etc/resolv.conf with the router's settings each time the network is connected. Execute the following command to add an immutable flag so that it cannot overwrite the configuration added above. [[3]](https://wiki.archlinux.org/title/Domain_name_resolution#Overwriting_of_/etc/resolv.conf)[[4]](https://nssurge.zendesk.com/hc/en-us/articles/360011927114-DNS-%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8D%97).

```bash
sudo chattr +i /etc/resolv.conf
```

## 9. Install yay

AUR is the archlinux user repository. Any user can upload their own AUR packages, which is why there are so many software available for Arch Linux. Since anyone can upload, there are corresponding risks. Generally, a package recognized by the public can be used.

Use [yay](https://github.com/Jguer/yay) to install packages from the AUR. Due to [Mainland China government blocks Github](https://zh.wikipedia.org/wiki/%E5%AF%B9GitHub%E7%9A%84%E5%AE%A1%E6%9F%A5%E5%92%8C%E5%B0%81%E9%94%81#%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD), you may not be able to install yay in the normal way in the official yay repository, so ArchLinuxStudio provides a bin package that can be installed directly for your temporary use during installation.

Execute the following command to install yay.

```bash
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/yay-bin-11.1.2-1-x86_64.pkg.tar.zst
sudo pacman -U yay-bin-11.1.2-1-x86_64.pkg.tar.zst
```

> github.io is also blocked by the Chinese mainland government, but the blockade has not been very strong for the time being. If you get stuck during the download process, you can try ctrl+c to terminate the command and try the download again, or you can try to change the network environment of the mobile hotspot to download again. The same is true when installing Qv2ray later. When you configure the global proxy, you will no longer need to worry about any network blocking issues. We will continue to provide readers of this book with a reliable process for breaking through Internet censorship.

## 10. Configure the system default editor

By default, Arch Linux uses the vi editor for some terminal editing scenarios, but we use vim. If you do not do an additional configuration, in scenarios such as git, calling the editor in the terminal will cause an error. Edit the `EDITOR=vim sudoedit /etc/profile` file and add the following to set vim as the default EDITOR

```bash
export EDITOR='vim'
```

This eliminates the need to specify `EDITOR=vim` every time you execute a command.

## 11. Enable Bluetooth (if any)

If you have a bluetooth device, you need to install the bluetooth package and enable the bluetooth service. Then you can add devices and connections in the system settings.

```bash
sudo pacman -S bluez bluez-utils
sudo systemctl enable --now bluetooth
```

If you want to connect a bluetooth audio device, you need to install `pulseaudio-bluetooth` and restart `pulseaudio`.

```bash
sudo pacman -S pulseaudio-bluetooth
pulseaudio -k
```

To set the bluetooth device to automatically start at boot, edit the `/etc/bluetooth/main.conf` file and set `AutoEnable` to true.
