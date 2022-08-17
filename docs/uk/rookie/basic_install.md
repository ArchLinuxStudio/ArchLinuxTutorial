# Arch Linux Basic Installation

This section starts with installing the most basic non-graphical ArchLinux system. [Official Installation Guide](https://wiki.archlinux.org/index.php/Installation_guide)

## 0. Disable reflector

Reflector will choose a mirror source with suitable speed for you, but the result is not accurate, and it will clear the content in the configuration file. It is not suitable for newcomers, so we first disable it.

```bash
systemctl stop reflector.service
```

## 1. Make sure again if it is UEFI mode

After a series of information flashes, you can see that the installation system has been logged in as root, and the commands that can be executed at this time:

```bash
ls /sys/firmware/efi/efivars
```

If it outputs a bunch of things, namely the efi variable, it means that it is already in UEFI mode. Otherwise, please confirm whether your boot method is UEFI.

## 2. Connect to the Internet

Generally speaking, almost all the networks you connect to can perform IP address and DNS related settings through DHCP, and you do not need to perform additional operations. In the absence of a suitable network, using the mobile hotspot of the mobile phone is also a very convenient choice. If your network environment needs to configure static IP and DNS, please refer to the Arch Wiki.

For wired connections, just plug in the network cable directly.

For wireless connection, you need to perform the following operations to connect to the network.

The wireless connection is made using the iwctl command, and the network connection is made according to the following steps:

```bash
iwctl #Execute the iwctl command to enter the interactive command line
device list #List the device name, for example, the wireless network card is called wlan0
station wlan0 scan #Scan network
station wlan0 get-networks #List networks For example, if you want to connect to the wireless network of YOUR-WIRELESS-NAME
station wlan0 connect YOUR-WIRELESS-NAME #Connect and enter the password
exit # exit after success
```

You can wait a few seconds for the network to establish a link before proceeding with the following test network operations.

```bash
ping www.gnu.org
```

---

**If** you cannot connect to the network normally, first make sure that the system has enabled the network interface [[1]](https://wiki.archlinux.org/index.php/Network_configuration/Wireless#Check_the_driver_status).

```bash
ip link #List network interface information, such as a device that cannot be connected to the Internet is called wlan0
ip link set wlan0 up #For example, when the wireless network card sees it is called wlan0
```

**If** you then see an error like `Operation not possible due to RF-kill`, continue to try the `rfkill` command to unlock the wireless card.

```bash
rfkill unblock wifi
```

## 3. Update the system clock

```bash
timedatectl set-ntp true #Sync system time with network time
timedatectl status #Check service status
```

## 4. Partition

There are a total of three partitions set up here, which is a **we think** a more general scheme. This step will clear all the contents of the disk, please confirm in advance.

- EFI partition[[2]](https://wiki.archlinux.org/title/EFI_system_partition#Mount_the_partition): `/efi` 800M
- root directory: `/` 100G
- User home directory: `/home` and everything else

> The size of the root directory here is for reference only. Generally speaking, 100G allocated for linux for daily use is enough. The minimum recommended root directory size is not less than 50G. If the root directory is too small, it will cause problems such as inability to update system software packages.

First convert the disk to gpt type, assuming that the name of the disk you want to install is sdx. If you are using an NVME SSD, you may see the disk name as nvme0n1.

```bash
lsblk #Display partition situation Find the name of the disk you want to install
parted /dev/sdx #Execute parted, enter the interactive command line, and change the disk type
(parted)mktable #Enter mktable
New disk label type? gpt #Enter gpt to convert the disk type to gpt If the disk has data, it will warn you, enter yes
quit #Finally quit quits parted command line interaction

```

Next use the cfdisk command to partition the disk. The operation after entering cfdisk is very intuitive. You can use the arrow keys, Tab key and Enter key of the keyboard to operate and assign the size and format of each partition. It is generally recommended to set the EFI partition as the first partition of the disk. It is said that some motherboards may have incompatibility problems if they do not set the EFI as the first partition. The EFI partition selects the `EFI System` type, and the other two partitions select the `Linux filesystem` type.

```bash
cfdisk /dev/sdx #To perform partition operations, assign the size and type of each partition
fdisk -l #After the partition is over, review the disk status
```

## 5. Formatting

After creating the partition, you need to format the partition with a suitable file system. Here, use the `mkfs.ext4` command to format the root partition and home partition, and use the `mkfs.vfat` command to format the EFI partition. In sdax in the following command, x represents the serial number of the partition. The format command must correspond to the partition name generated in the previous step.

If the disk has data in advance, it will prompt you: 'proceed any way?' Press y and press Enter to continue.

```bash
mkfs.ext4 /dev/sdax #Format the two partitions of the root directory and the home directory
mkfs.vfat /dev/sdax #Format efi partition
```

## 6. Mount

When mounting, the mounting is sequential, the root partition is mounted first, and then the EFI partition is mounted.
The sdax here is just an example, according to your own actual partition situation.

```bash
mount /dev/sdax /mnt
mkdir /mnt/efi #Create efi directory
mount /dev/sdax /mnt/efi
mkdir /mnt/home #Create home directory
mount /dev/sdax /mnt/home
```

## 7. Mirror source selection

Edit the mirror list with the following command:

```bash
vim /etc/pacman.d/mirrorlist
```

The first line of this is the image source that will be used. Add the ones from the University of Science and Technology of China or Tsinghua University and put them on the top.

```
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
```

If it's not as fast, you can manually specify another mirror source. For a complete list of mirror sources, please refer to the official [mirror source generator](https://archlinux.org/mirrorlist/).

> Here use the mirror source in China to improve the access speed. However, there is a problem with this, mirror sources (such as arch linux Tsinghua mirror source) and third-party sources (such as archlinux-cn) can know what your ip is, when you updated the system, when you checked the system, and when you updated what Software, what is the list of software you have installed. Mirror source maintainers in authoritarian countries are entirely possible to provide these data according to the requirements of authoritarian authorities. Many maintainers are almost online with real names on the Internet, and they have no resistance. Further, authoritarian countries can communicate with you based on these metadata. Compare with other metadata generated to further locate and identify you. As a simple example, the maintainer is required to provide or monitor the ip of users who have installed packages such as v2ray/qv2ray, as well as the installation time, and a list of all their software.

> If your network is already in proxy mode when you install arch linux, you can choose a mirror source from a non-authoritarian country that is close to your proxy location to use. If there is no proxy in the network environment when you install arch linux, then after the installation, you need to replace the mirror source of a non-authoritative country as soon as possible to use it. Some of the more high-quality international sources are listed below.

```bash
Server = https://mirror.archlinux.tw/ArchLinux/$repo/os/$arch   #East Asia: Republic of China
Server = https://mirror.0xem.ma/arch/$repo/os/$arch #North America:Canada
Server = https://mirror.aktkn.sg/archlinux/$repo/os/$arch #Southeast Asia:Singapore
Server = https://archlinux.uk.mirror.allworldit.com/archlinux/$repo/os/$arch #Europe Region: UK
Server = https://mirrors.cat.net/archlinux/$repo/os/$arch #East Asia: Japan
```

## 8. Install the system

Required base package

```bash
pacstrap /mnt base base-devel linux linux-headers linux-firmware #base-devel is required to install the AUR package
```

> Note that at present, it is necessary to ensure that the pacman-init.service service is started before executing the pacstrap or pacman command to install the package, otherwise an error will be raised and the installation process cannot be performed. Use the `systemctl status pacman-init.service` command to check the current service status. For more content, refer to the [post] in bbs (https://bbs.archlinux.org/viewtopic.php?id=278518&p=2)

> If there is an error related to the keyring during installation, refer to this article [GnuPG-2.1 and the pacman keyring](https://archlinux.org/news/gnupg-21-and-the-pacman-keyring/) and execute the commands.

Required functional software

```bash
pacstrap /mnt dhcpcd iwd vim bash-completion #Required for a wired (iwd also requires dhcpcd) A wireless requires an editor and a completion tool
```

## 9. Generate fstab file

fstab is used to define disk partitions

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

Double check /mnt/etc/fstab to make sure there are no errors

```bash
cat /mnt/etc/fstab
```

## 10. change root

Switch the environment to /mnt of the new system

```bash
arch-chroot /mnt
```

## 11. Time zone settings

To set the time zone, create a symlink under /etc/localtime with the appropriate time zone in /usr. Set the Shanghai time zone as follows.

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

The hardware time setting is then performed to write the current correct UTC time to the hardware time.

```bash
hwclock --systohc
```

## 12. Set Locale for localization

Locale determines the format, character arrangement, and other localization criteria for locale, currency, time zone dates.

First, use vim to edit /etc/locale.gen, and remove the comment symbol (#) on the line where en_US.UTF-8 is located and the line where zh_CN.UTF-8 is located. Here you need to use vim's search and editing functions. If you forget, please turn to the previous section to review the operation of vim.

```bash
vim /etc/locale.gen
```

Then use the following command to generate the locale.

```bash
locale-gen
```

Finally import the content to /etc/locale.conf

```bash
echo 'LANG=en_US.UTF-8' > /etc/locale.conf
```

## 13. Set the hostname

First set the hostname in `/etc/hostname`

```bash
vim /etc/hostname
```

Add the hostname you want for the host, for example myarch here.

Next set the matching entry in `/etc/hosts`.

```
vim /etc/hosts
```

add the following

```bash
127.0.0.1 localhost
::1 localhost
127.0.1.1 myarch
```

> In some cases, if you do not set the hostname, there may be a problem in KDE that the GUI application cannot be started when the network conditions change, and a message like `No protocol specified qt.qpa.xcb: could not connect to display` will appear in the terminal error, which is relatively rare [[3]](https://bbs.archlinux.org/viewtopic.php?id=241338)[[4]](https://bbs.archlinux.org/viewtopic.php?id=243674)[[5]](https://wiki.archlinux.org/title/Network_configuration#Local_hostname_resolution).

## 14. Set password for root user

```bash
passwd root
```

## 15. Install microcode

```bash
pacman -S intel-ucode #Intel
pacman -S amd-ucode #AMD
```

## 16. Install the bootloader

```bash
pacman -S grub efibootmgr #grub is the bootloader, efibootmgr is used by the grub script to write boot entries into NVRAM.
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=GRUB
```

Next, edit the /etc/default/grub file, remove the last quiet parameter in the `GRUB_CMDLINE_LINUX_DEFAULT` line, and change the log level value from 3 to 5. This is for the convenience of troubleshooting if a system error occurs in the future. Also add the nowatchdog parameter on the same line, which can significantly speed up the power on and off. Here you need to use the editing function of vim. If you forget, please turn to the previous section to review the operation of vim.

```bash
vim /etc/default/grub
```

Finally generate the configuration files required by GRUB

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

> We specified the bootloader-id as GRUB in the previous command, which usually doesn't cause problems. However, after some motherboards are installed, you will find that there is no nvme boot entry. This is because the UEFI firmware of some motherboards needs to store the bootable file in a specific location before displaying the UEFI NVRAM boot entry, and does not support custom storage of efi files [[6]](https://wiki.archlinux.org/index.php/GRUB#Default/fallback_boot_path). The workaround is to use the `--removable` parameter to resolve some motherboard NVRAM compatibility issues.

```bash
grub-install --target=x86_64-efi --efi-directory=/efi --removable
grub-mkconfig -o /boot/grub/grub.cfg
```

In addition, if your motherboard is some older models, such as intel 9 series or below or older AMD motherboards, they are likely to not support booting the system from nvme, although it can be solved by modifying the BIOS to add the NVME support module, But this is beyond the scope of this article.

## 17. Complete the installation

```bash
exit # Return to the installation environment#
umount -R /mnt # unmount the new partition
reboot # reboot
```

Note that you must unplug the USB before restarting, otherwise you will still enter the installer instead of the installed system after restarting. After restarting, start the dhcp service to connect to the network

```bash
systemctl start dhcpcd #Start dhcp immediately
ping www.gnu.org #test network connection
```

If it is a wireless link, you also need to start iwd before you can use iwctl to connect to the network

```bash
systemctl start iwd #Start iwd immediately
iwctl #Same as before, connect to the wireless network
```

So far, a basic, UI-less Arch Linux has been installed. In the next section, let's install the graphical interface.

> archlinux has an [installation script](https://archlinux.org/packages/extra/any/archinstall/) built into the installation image in April 2021, providing some options for quick installation. Similar to all one-click installation scripts, it provides an automated and inflexible installation process. This type of installation script is not recommended, and aside from being inflexible, beginners won't be able to learn anything during this type of installation. If you need to quickly start a basic archlinux environment for any reason, then try this script.
