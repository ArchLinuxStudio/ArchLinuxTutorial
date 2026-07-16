<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Linux day-to-day operations and basic knowledge

After reading`新手上路`Chapters, your system is fully operational, and KDE desktop environment provides a powerful environment[GUI](https://zh.wikipedia.org/wiki/%E5%9B%BE%E5%BD%A2%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)For ordinary users. Press`Windows`Key (Linux is also often called Meta Key) pops out of the menu bar and finds`设置`=>`系统设置`, most system settings can be found.

But if you want to control your system, you need to read what you know.
If you want more detailed information on the various sections of this paper, you can learn by clicking on the outreach links given in each subsection.
If you do not want to know more, the knowledge presented in this chapter will be sufficient for your daily use.

## You have to have Linux knowledge.

Only basic, most necessary Linux knowledge points and small skills are presented here.

1. In Linux, the file directory structure is completely different from Windows. Windows exists with discs like C, D, and these divides do not exist in Linux. The top directory is the root directory with the path_/_, and is distinguished from one level down by a tree structure.
2. For the tree file structure of Linux, there is a difference between the relative path and the absolute path. The absolute path is the root path._/_Start full path, e. g.`/home/testuser/Download`I don't know. Relative paths represent a partial path from the current directory to the target directory. Like the directory you're in right now.`/home/testuser`, switch to absolute path`/home/testuser/Download`is the relative path`./Download`I don't know. of which`./`represents the current directory, then search down. In addition,`..`These two lines mean looking up, like the path you're on.`/home/testuser/Download`Look up to find`/home/testuser/Desktop`is the relative path`../Desktop`I don't know.
3. Simply put, there are two types of users in Linux. The first type of user is a root user, also known as a superuser, with the highest privileges in the system. The second type of user is an ordinary user with different levels of permission except for root users. Use root privileges with great care.
4. In theory, any operation in a graphical interface can be performed with a corresponding command line command. If you open a program to report errors, try to find its corresponding start-up command, execute it in the terminal, and observe the error log output when it runs, access the relevant information and solve the problem.

## Terminal operating basis

If you want to master Linux, you have to master the usual command and use of terminals.

```bash
ls /some_path       # 查看某个文件夹下的文件与子文件夹 /代表根目录，是Linux最顶端的路径，是绝对路径
pwd                 # 查看当前终端所在路径
cd /home/testuser   # 切换目录命令，将当前终端切换到某一个路径下
cp ./a.cpp ./b.cpp  # 复制命令 将当前路径下的a.cpp复制一份为b.cpp ./代表当前文件夹所在路径，是相对路径
cp -r ./a ./b       # 复制整体文件夹
rm b.cpp            # 删除命令 删除b.cpp
mv a.cpp b.cpp      # 移动(重命名)命令 将a.cpp更名为b.cpp
mkdir new_folder    # 新建文件夹new_folder
sudo some command   # 使普通用户以root权限执行某些命令
```

Bash Terminal Set Path to`~/.bashrc`

```
$include /etc/inputrc # 引入全局bash配置
set completion-ignore-case on # 补全路径忽略大小写
set horizontal-scroll-mode Off # 允许提示换行
set bell-style none # 关闭提示警告音
```

Outreach links: recommended reading of online progress books Nationality[Linux command line and Shell script teaching Cheng](https://archlinuxstudio.github.io/ShellTutorial/#/)I don't know.

## Pacman Package Management

Pacman is Arch Linux 's package manager, which is used to install, delete, query software, etc.

```bash
sudo pacman -S package_name     # 安装软件包
sudo pacman -Syu package_name   # 升级系统并安装软件包，Arch Linux 不支持部分升级，建议用此命令先升级再安装
sudo pacman -Syu                # 升级系统
sudo pacman -Syyu               # 升级系统 yy标记强制刷新 u标记升级动作
sudo pacman -R package_name     # 删除软件包
sudo pacman -Rs package_name    # 删除软件包，及其所有没有被其他已安装软件包使用的依赖包
sudo pacman -Qdt                # 找出孤立包 Q为查询本地软件包数据库 d标记依赖包 t标记不需要的包 dt合并标记孤立包
sudo pacman -Rs $(pacman -Qtdq) # 删除孤立软件包
sudo pacman -Fy                 # 更新命令查询文件列表数据库
sudo pacman -F xxx              # 当不知道某个命令属于哪个包时，用来查询某个xxx命令属于哪个包
```

A good graphical package management software

```bash
yay -S octopi #包管理器前端界面
```

Outreach links:[Official documents](https://wiki.archlinux.org/index.php/Pacman)

## Operation and presentation of system services

The Linux system runs a variety of services, and you need to know how to query and change service status. At the same time, there is a general understanding of the best way to create services. Here are the orders.`systemctl`Usage. Take the example of dhcpcd

```bash
systemctl start dhcpcd          # 启动服务
systemctl stop dhcpcd           # 停止服务
systemctl restart dhcpcd        # 重启服务
systemctl reload dhcpcd         # 重新加载服务以及它的配置文件
systemctl status dhcpcd         # 查看服务状态
systemctl enable dhcpcd         # 设置开机启动服务
systemctl enable --now dhcpcd   # 设置服务为开机启动并立即启动这个单元:
systemctl disable dhcpcd        # 取消开机自动启动
systemctl daemon-reload dhcpcd  # 重新载入 systemd 配置 扫描新增或变更的服务单元 不会重新加载变更的配置 加载变更的配置用 reload
```

Outreach links:[ssystemctl official document](https://wiki.archlinux.org/index.php/Systemd#Basic_systemctl_usage) [ssystemd profile sample explanation](https://www.freedesktop.org/software/systemd/man/systemd.service.html#Examples)

## Edit System Profile

#### Edit Profile with Sudoedit

In the front."[Desktop Environment and Usual Applications](../rookie/DE%26App.md)In the section, we have edited the system profile several times. They are characterised as valid for all users in the system, owned by root users, and only root users have write permissions, which requires us to edit them with sudo up to root privileges. It is easy to think of running text editor using sudo commands, for example:

```shell
sudo vim 你要编辑的文件的路径
```

But it's not the best way, because it violates."[Minimum Permission Principle](https://zh.wikipedia.org/wiki/%E6%9C%80%E5%B0%8F%E6%9D%83%E9%99%90%E5%8E%9F%E5%88%99)I'm sorry. Because when we use sudo to execute an order, the whole process gets root privileges. That is, all operations of vim, even all vim plugins, are run under root, which is usually very dangerous. Some text editors refuse to run even when they detect themselves running with root privileges to avoid dangerous operations.

Consider, in turn, that simply editing a document does not require such a strong mandate, and that all we need is the right to read and write in this configuration. And...`sudoedit`(or)`sudo -e`The two are fully equivalent) are best practices in editing a system configuration file.

```shell
EDITOR=vim sudoedit 要编辑的文件
```

The sudoedit command works roughly this way: it creates a temporary file that ordinary users have the right to edit, copys the file to edit with root privileges to this temporary file, and then uses environmental variables like EDITOR.**With common user permissions**Runs the text editor. Once the text editor has finished and exited, it will again overwrite the original configuration with root privileges using this edited temporary file.

For more information about sudoedit, see[Sudo's handbook](https://man.archlinux.org/man/sudo.8.en#e)I don't know.

#### Highlight profile

Strictly speaking, it is not a question of sudoedit, but of a text editor, but it is often encountered when editing files with sudoedit.

Because Sudoedit will create a temporary file with a random name, the text editor may not know the file name and not know what syntax highlighting should be enabled. At this point we need to be proactive in informing the text editor about the syntax to use, for example, vim, which can be used in command line mode as follows:

```vim
:set syntax=文件的语法
```

Another question was how to know the grammatical name. On the one hand, we can search for the search engine, or we can find it in an inner plugin of the vim, but for those profiles that are also readable by ordinary users, we can look directly at it with the vim, which opens the file in read-only mode, but uses the syntax according to the filename. So you just have to run in command line mode:

```vim
:set syntax
```

can view the high-profile syntax currently used by the vim.

#### Edit sudoers profile

Before we edit the sudoers profile. Sudoers is a special case of a system configuration file whose best practice for editing is not to use`sudoedit`But...`visudo`Command.

```shell
sudo visudo  # visudo 需要使用 root 权限运行。默认编辑 /etc/sudoers
sudo visudo -f 要编辑的sudoers文件的路径  # 也可以指定文件路径
```

Similar to sudoedit, it will copy the configuration file to be edited to a temporary file and then call the text editor to edit. The difference is that before editing starts, the visudo locks the sudoers file that is being edited so that two people can not edit it at the same time; and check the semantics of sudoers after editing has been completed, and if errors are found, the result of the editing will be rejected.

This is because if you encounter a grammatical error in a sudoers file, sudo, for security purposes, will render the entire sudoers profile invalid. In this way, if ordinary users inadvertently alter the sudoers files, there is a risk that they will lose access to the sudo command, as if they "close the door and shut themselves outside," and then they will need to log in directly with root users and even live USB first aid. And the fact that the visudo check the sudoers grammar can largely avoid this.

On the other hand, the visudo needs to run as root, which means that its text editor actually also operates as root, unlike sudoedit. To be safe, you can be configured to edit sudoers files using only some restricted " secure " text editor. For more details.[ArchWiki](https://wiki.archlinux.org/title/Sudo#Using_visudo)and[Sudoers Manual](https://man.archlinux.org/man/sudoers.5)and[env_editor](https://man.archlinux.org/man/sudoers.5#env_editor)Section.

For more details about visudo[Handbook](https://man.archlinux.org/man/visudo.8)I don't know.

## File Transfer and System Backup

A little bit, Linux.[scp](<https://wiki.archlinux.org/index.php/SCP_and_SFTP#Secure_copy_protocol_(SCP)>)This order. It is often used to transmit files between servers. But now it should be used more modernly.[rsync](https://wiki.archlinux.org/index.php/Rsync)Alternative, with new features such as instant compression, differential transmission. In the meantime,`rsync`It is also used for backup operations.

```bash
rsync foo.txt me@server:/home/me/   # 最基础的复制文件 与scp的操作完全相同
rsync -a bar/ me@server:/home/me/   # -a 标记实现目录复制等 比scp -r 能更好的处理符号链接等情况
```

For a complete backup, read it.[Official documents](https://wiki.archlinux.org/index.php/Rsync#Full_system_backup)I don't know.

## File extraction

Except for the well-known tar command, we installed it before.[ark](https://archlinux.org/packages/extra/x86_64/ark/)The package can be decompressed directly with the easy right key of the dolfin file manager. The option depends on the support of the various compression formats that you can choose to install. It needs to be noted that the compressor package under the decompression window may be uncoded, and one of the options to install ark is unarchiver, using unar to avoid this problem.

```bash
sudo pacman -S unarchiver
unar xxx.zip
```

## System hardware information detection

Disk Test Available[smartmontools](https://archlinux.org/packages/extra/x86_64/smartmontools/)

```bash
sudo smartctl -A /dev/sda   #硬盘
sudo smartctl -d sat -A /dev/sdc #usb设备
```

Disk space analysis can directly use the df command or can also be used[Filelight](https://archlinux.org/packages/extra/x86_64/filelight/)Graphical interface visualize disk occupancy

```bash
df -h
```

cpu and graphic card information can be viewed using two softwares:

```bash
yay -S cpu-x
yay -S gpu-viewer
```

Use[dmidecode](https://archlinux.org/packages/extra/x86_64/dmidecode/)A complete view of most of the system ' s hardware information, including the more difficult-to-access memory frequency, the master panel, the BIOS, etc.

```bash
sudo dmidecode
```

## Make Windows 10 starter

You might have to make a win10 starter under the linux sometimes. In the past, it was easy to create a win10 starter under linux, but with the recent update of Microsoft, it iso has a name in its installation mirror.`install.wim`, the size of the file exceeds 4GB, exceeding the maximum 4GB limit for the single file required by fat32. This makes it necessary to take additional steps to create a start-up disk. The fat32 format is still used here because its compatibility is the best, and the ntfs' uefi starter is not recognized in many cases.

The first steps are similar to those in the basic installation, first creating the partition label for the U-disk with a parted command. Creates a new partition next with a cfdisk command, select Microsoft Basic Data in Type. The created partition is then formatted using the mkfs.vfat command. So the U-disk is ready.

Next, download the win10 iso mirror and depress. In some file manager, you get the following error.

```bash
This disc contains a "UDF" file system and requires an operating system
that supports the ISO-13346 "UDF" file system specification.w
```

In this case, it needs to be mounted manually and copied.

```bash
mount -o loop /path/of/windows10.iso /mnt/your/mountpoint
```

Once the copied file is made, the last thing to do is compress the install.wim file.

```bash
sudo pacman -S wimlib
```

The compression is followed by a longer and patient process. Once completed, it can be seen that the file has been compressed to 3.x GB.

```bash
sudo wimlib-imagex optimize install.wim --solid
```

Could not close temporary folder: %s

Ref: [[1]](https://www.dedoimedo.com/computers/windows-10-usb-media-linux.html)

## Create Windows11 startup disk

Download Windows 11 ISO from Microsoft and verify checksum with Sha256sum

Ready U-disk:

Create partition tables (GPT)

Creates a 1024MiB FAT32 partition, labeled BOOT

Create a NTFS partition with the tag INSTALL

Mount Windows 11 ISO and copy files:

Copy all contents except the source folders to the BOOT partition.

Copy Boot.wim folders from sources to BOOT partition, but keep directory structure (so it should still be in a folder named sources)

Copy all contents to INSTALL Partition

Unmount all content (takes some time)

ref:

- https://web.archive.org/web/20250705040832/https://nixaid.com/bootable-usb-windows-linux/
- https://www.reddit.com/r/linux4noobs/comments/1d17crd/guide_to_creating_windows_11_usb_on_linux/?tl=zh-hans
