# Linux daily operations and basics

After reading the `Beginners on the Road` chapter, your system is completely ready to use, the KDE desktop environment provides a powerful [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) for normal users. Press the `Windows` key (also often called the Meta key under Linux) to call out the menu bar, find `Settings`=>`System Settings`, you can find most of the system settings.

But if you want to master your system with ease, you also need to read this article.
If you want to learn more about the detailed knowledge of each section of this article, you can click on the extension links given in each section to learn.
If you don't want to know in detail, the knowledge introduced in this chapter is enough for you to deal with daily use.

## Must-learn Linux knowledge

Only the most basic and necessary Linux knowledge points and tips are introduced here.

1. In Linux, the file directory structure is completely different from Windows. There are drive letters such as C drive and D drive in Windows, but these divisions do not exist in Linux. The top-level directory is the root directory, and the path is _/_ , and is distinguished from one level to the next in a tree structure.
2. For the tree file structure of Linux, there are relative paths and absolute paths. An absolute path represents a full path starting from the root path _/_, such as `/home/testuser/Download`. A relative path represents a partial path from the current directory to the target directory. For example, the current directory you are in is `/home/testuser`, then the relative path to switch to the absolute path `/home/testuser/Download` is `./Download`. Where `./` represents from the current directory, and then look down. In addition, the two periods of `..` represent the search to the upper layer. For example, your current path is `/home/testuser/Download`, and the relative path to `/home/testuser/Desktop` is `../Desktop`.
3. Simply put, there are two types of users in Linux. The first type of user is the root user, also known as the super user, which has the highest authority in the system. The second type of users are ordinary users other than the root user, who can have different levels of permissions. Be very careful when using root privileges.
4. In theory, any operation in the graphical interface can be completed with the corresponding command line command. If you open a program and report an error, try to find its corresponding startup command, execute this command in the terminal, and observe the error log output when it is running, consult relevant information, and solve the problem.

## Terminal Operation Basics

If you want to be proficient in Linux, you must master the common commands and usage of the terminal.

```bash
ls /some_path # View files and subfolders under a certain folder / represents the root directory, which is the top path of Linux and is an absolute path
pwd # View the path where the current terminal is located
cd /home/testuser # switch directory command, switch the current terminal to a certain path
cp ./a.cpp ./b.cpp # Copy command Copy a.cpp in the current path as b.cpp ./ represents the path of the current folder, which is a relative path
cp -r ./a ./b # copy the whole folder
rm b.cpp # delete command delete b.cpp
mv a.cpp b.cpp # move (rename) command to rename a.cpp to b.cpp
mkdir new_folder # create a new folder new_folder
sudo some command # Make ordinary users execute certain commands with root privileges
```

Extension link: It is recommended to read the online advanced book [Linux Command Line and Shell Script Tutorial](https://archlinuxstudio.github.io/ShellTutorial/#/).

## Pacman Package Management

Pacman is the package manager for Arch Linux, it is used to install, remove, query software, etc.

```bash
sudo pacman -S package_name # install the package
sudo pacman -Syu package_name # Upgrade the system and install the software package. Arch Linux does not support partial upgrades. It is recommended to use this command to upgrade first and then install
sudo pacman -Syu # upgrade system
sudo pacman -Syyu # upgrade the system yy mark forced refresh u mark upgrade action
sudo pacman -R package_name # remove the package
sudo pacman -Rs package_name # remove the package and all its dependencies not used by other installed packages
sudo pacman -Qdt # find orphaned packages Q is to query the local package database d mark dependent packages t mark unwanted packages dt merge marks orphaned packages
sudo pacman -Rs $(pacman -Qtdq) # remove orphaned packages
sudo pacman -Fy # update command to query file list database
sudo pacman -F xxx # When you don't know which package a command belongs to, it is used to query which package a xxx command belongs to
```

An easy-to-use graphical package management software

```bash
yay -S octopi #package manager front-end interface
```

Extension link: [Official Documentation](https://wiki.archlinux.org/index.php/Pacman)

## Operation and introduction of system services

There are various services running in the Linux system, and you need to master the way to query and change the status of the service. At the same time, it is best to have a general understanding of creating services. Here is the usage of the command `systemctl`. Take dhcpcd as an example

```bash
systemctl start dhcpcd # start the service
systemctl stop dhcpcd # stop the service
systemctl restart dhcpcd # restart the service
systemctl reload dhcpcd # Reload the service and its configuration file
systemctl status dhcpcd # View service status
systemctl enable dhcpcd # Set the boot service
systemctl enable --now dhcpcd # Set the service to start on boot and start the unit immediately:
systemctl disable dhcpcd # Cancel automatic startup at boot
systemctl daemon-reload dhcpcd # Reload systemd configuration Scan for new or changed service units Will not reload changed configuration Use reload to load changed configuration
```

Extension link: [systemctl official documentation](https://wiki.archlinux.org/index.php/Systemd#Basic_systemctl_usage)  
[systemd configuration file example explanation](https://www.freedesktop.org/software/systemd/man/systemd.service.html#Examples)

## Edit system configuration files

#### Edit configuration files with sudoedit

In the previous section "[Desktop Environment and Common Applications](../rookie/DE%26App.md)", we have edited the system configuration file several times. Their characteristics are that they are effective for all users in the system, are owned by the root user, and only the root user has write permissions, which requires us to use sudo to elevate to root permissions to edit them. It is easy to think of using the sudo command to run a text editor, taking vim as an example:

```shell
sudo vim the path to the file you want to edit
```

But this is not the best way because it violates the "[Least Privilege Principle](https://en.wikipedia.org/wiki/%E6%9C%80%E5%B0%8F%E6%9D%83%E9%99%90%E5%8E%9F%E5%88%99)". Because when we execute a command with sudo, the whole process gets root privileges. In other words, all vim operations, including all vim plugins, will run under root privileges, which is usually very dangerous. Some text editors will even refuse to run when they detect that they are running with root privileges to avoid dangerous actions.

On the other hand, just editing a file does not require such powerful permissions, we only need to have read and write permissions to this configuration file. And `sudoedit` (or `sudo -e`, which are completely equivalent) is the best practice for editing a system configuration file.

```shell
EDITOR=vim sudoedit the file to edit
```

The sudoedit command works roughly like this: it will first create a temporary file that ordinary users have the right to edit, copy the files to be edited into this temporary file with root permissions, and then according to environment variables such as EDITOR, ** as ordinary users **permission to run the text editor. After the text editor finishes editing and exits, it will overwrite the original configuration file with this edited temporary file with root privileges again.

For more information on sudoedit, see [sudo's manual](https://man.archlinux.org/man/sudo.8.en#e).

#### Syntax highlighting for configuration files

Strictly speaking this is not a question about sudoedit but a question about text editors, but it is often encountered when editing files with sudoedit .

Because sudoedit creates a temporary file with a random name, the text editor may not recognize the file name and what syntax highlighting to enable. At this time, we need to actively tell the text editor what syntax to use. Taking vim as an example, you can set the syntax as follows in command line mode:

```vim
:set syntax=file syntax
```

Another problem is how to know the name of the grammar. On the one hand, we can use a search engine to search, or find it in vim's built-in plug-ins, but for those configuration files that ordinary users can also read, you can use vim to view it directly. At this time, vim will open the file in read-only mode. But syntax highlighting is enabled based on the filename. This just needs to be run in command line mode:

```vim
:set syntax
```

You can view the highlighted syntax used by the current vim.

#### Edit sudoers configuration file

Earlier we edited the sudoers configuration file. sudoers are a special case of system configuration files, and the best practice for editing them is not to use `sudoedit`, but the `visudo` command.

```shell
sudo visudo # visudo needs to be run with root privileges. Edit /etc/sudoers by default
sudo visudo -f The path to the sudoers file to be edited # You can also specify the file path
```

Similar to sudoedit, visudo will also copy the configuration file to be edited to a temporary file, and then call the text editor to edit, but the difference is that before starting to edit, visudo will also lock the sudoers file being edited, so that This avoids editing it by two people at the same time; and will check the syntax of sudoers after the edit is complete, rejecting the result of the edit if an error is found.

This is because if a syntax error is encountered in the sudoers file, sudo will disable the entire sudoers configuration file for security reasons. In this case, if ordinary users accidentally change the sudoers file, they may lose the permission to use the sudo command, as if "closing the door and shutting themselves out", at this time, they need to log in directly with the root user or even need to Live USB first aid only. And visudo checks the syntax of sudoers to avoid this to a large extent.

On the other hand, visudo needs to be run as root, which means that its text editor actually runs as root as well, unlike sudoedit. For security, it can be configured to only use certain restricted "safe" text editors to edit the sudoers file. See the editor section in [ArchWiki](https://wiki.archlinux.org/title/Sudo#Using_visudo) and [sudoers manual](https://man.archlinux.org/man/sudoers.5) and [env_editor](https://man.archlinux.org/man/sudoers.5#env_editor) section.

For more information about visudo, see the [Manual](https://man.archlinux.org/man/visudo.8).

## File transfer and system backup

Readers with a little Linux experience should know the [scp](<https://wiki.archlinux.org/index.php/SCP_and_SFTP#Secure_copy_protocol_(SCP)>) command. It is often used to transfer files between servers. But for now it should be replaced by a more modern tool [rsync](https://wiki.archlinux.org/index.php/Rsync) with new features like on-the-fly compression, delta transfer, etc. At the same time, `rsync` is also used for backup operations.

```bash
rsync foo.txt me@server:/home/me/ # The most basic copy file is exactly the same as the scp operation
rsync -a bar/ me@server:/home/me/ # The -a flag implements directory copying, etc. Better than scp -r to handle symbolic links, etc.
```

For full disk backup, please read the [official documentation](https://wiki.archlinux.org/index.php/Rsync#Full_system_backup).

## File decompression

In addition to the well-known tar command, the [ark](https://archlinux.org/packages/extra/x86_64/ark/) package we installed before can be directly decompressed with the dolphin file manager with an easy right-click, which is optional Dependency provides support for various compression formats, and you can choose to install it yourself. It should be noted that decompressing the compressed package under windows may cause garbled characters. Install unarchiver, one of the optional dependencies of ark, and use unar to avoid this problem.

```bash
sudo pacman -S unarchiver
unar-xxx.zip
```

## System hardware information detection

Disk detection can be done using [smartmontools](https://archlinux.org/packages/extra/x86_64/smartmontools/)

```bash
sudo smartctl -A /dev/sda #hard disk
sudo smartctl -d sat -A /dev/sdc #usb device
```

Disk space analysis can directly use the dh command, or use the [Filelight](https://archlinux.org/packages/extra/x86_64/filelight/) graphical interface to visually check the disk usage

```bash
df -h
```

The following two softwares can be used to view the information of cpu and graphics card

```bash
yay -S cpu-x
yay -S gpu-viewer
```

Use [dmidecode](https://archlinux.org/packages/extra/x86_64/dmidecode/) to fully view most of the hardware information of the system, including hard-to-get memory frequency, motherboard BIOS, etc.

```bash
sudo dmidecode
```

## Make windows 10 boot disk

You may be under linux, and sometimes you need to make a boot disk for win10. In the past, it was very simple to make a win10 boot disk under linux, but with the update of Microsoft in recent years, there is a file named `install.wim` in its iso installation image, and its size has exceeded 4GB. Exceeded the maximum 4GB limit for a single file required by fat32. This necessitates an extra step to make a bootable disk. The fat32 format is still used here because its compatibility is the best, and the uefi boot disk of ntfs is not recognized in many cases.

First of all, similar to some steps in the basic installation, first use the parted command to create the partition label of the U disk as gpt. Next create a new partition with the cfdisk command and select Microsoft basic data in Type. Next use the mkfs.vfat command to format the created partition. The USB stick is now ready.

Next download the iso image of win10 and extract it. In some file managers, you will get errors like the following.

```bash
This disc contains a "UDF" file system and requires an operating system
that supports the ISO-13346 "UDF" file system specification.w
```

In this case, you need to manually mount and copy it out

```bash
mount -o loop /path/of/windows10.iso /mnt/your/mountpoint
```

After getting the copied file, the last thing to do is to compress the install.wim file, here you need to install a package first

```bash
sudo pacman -S wimlib
```

Next, compress, this step will last for a long time, wait patiently. When finished, you can see that the file has been compressed to 3.x GB.

```bash
sudo wimlib-imagex optimize install.wim --solid
```

Finally, copy all the files to the U disk.

Ref: [[1]](https://www.dedoimedo.com/computers/windows-10-usb-media-linux.html)
