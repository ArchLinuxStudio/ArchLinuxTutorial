# Linux 日常操作与基础知识

阅读完`新手上路`章节，你的系统已完全可以使用，KDE 桌面环境提供了强大的 [GUI](https://zh.wikipedia.org/wiki/%E5%9B%BE%E5%BD%A2%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2) 以供普通用户使用。按`windows`键(Linux 下也常被叫做 Meta 键)呼出菜单栏，找到`设置`=>`系统设置`，可以找到绝大多数系统设置项。

但如果想要游刃有余的掌控你的系统，你还需要阅读掌握本文的内容。  
如果你想进一步详细了解本文各部分的详细知识，可以点击群主在各个小节给出的拓展链接进行学习。  
如果你不想详细了解，本章介绍的知识也足够你来应付日常的使用。

## 必须掌握的 Linux 知识

此处只介绍最基本的，最必要的 Linux 知识点与小技巧 。

1. 在 Linux 中，文件目录结构与 Windows 完全不同。Windows 存在 C 盘，D 盘等盘符，而在 Linux 中不存在这些划分，最上层的目录是根目录，路径为 _/_ ，并以一个树形结构从此向下一级一级区分。
2. 对于 Linux 的树形文件结构，存在相对路径与绝对路径之分。绝对路径是代表从根路径 _/_ 开始的完整路径，如`/home/wallen/Download`。相对路径代表从当前目录，到目标目录的一个部分路径。比如当前你所在的目录为`/home/wallen`，那么切换到绝对路径`/home/wallen/Download`的相对路径即为`./Download`。其中`./`代表从当前目录，再向下寻找。另外，`..`这种两个句点代表的是向上层寻找，比如你当前所在的路径为`/home/wallen/Download`，向上寻找到`/home/wallen/Desktop`的相对路径即为`../Desktop`。
3. 简单来说，Linux 中存在两类用户。第一类用户即为 root 用户，也成为超级用户，它拥有系统中最高的权限。第二类用户就是除了 root 用户的普通用户，他们可以拥有不同等级的权限。任何时候都应该避免始终用 root 用户操作你的系统。
4. 理论上来说，任何图形化界面中的操作都可以用对应的命令行命令完成。如果你打开某个程序报错，不妨试试找到它的对应启动命令，在终端中执行此命令，并观察它运行时的错误日志输出，查阅相关资料，解决问题。

## 终端操作基础

如果想要熟练掌握 Linux，就必须掌握终端的常见命令与使用方式。

```bash
ls /some_path       #查看某个文件夹下的文件与子文件夹 /代表根目录，是Linux最顶端的路径，是绝对路径
pwd                 #查看当前终端所在路径
cd /home/wallen     #切换目录命令，将当前终端切换到某一个路径下
cp ./a.cpp ./b.cpp  #复制命令 将当前路径下的a.cpp复制一份为b.cpp ./代表当前文件夹所在路径，是相对路径
cp -r ./a ./b       #复制整体文件夹
rm b.cpp            #删除命令 删除b.cpp
mv a.cpp b.cpp      #移动(重命名)命令 将a.cpp更名为b.cpp
mkdir new_folder    #新建文件夹new_folder
```

拓展链接：推荐阅读在线书籍 [Linux 命令行与 Shell 脚本教程](https://archlinuxstudio.github.io/ShellTutorial/#/)。 群主也提供了与此书配套的教学视频 [Linux 命令行与 Shell 教程](https://bilibili.com)<sup>TODO</sup>。

## Pacman 包管理

在 Arch Linux 上安装的软件都通过 Pacman 来进行管理。你可以把它理解为一个软件管理器，可以进行软件的安装，删除，查询等。

```bash
sudo pacman -S package_name     #安装软件包
sudo pacman -Syyu               #升级系统 yy标记强制刷新 u标记升级动作
sudo pacman -R package_name     #删除软件包
sudo pacman -Rs package_name    #删除软件包，及其所有没有被其他已安装软件包使用的依赖包
sudo pacman -Qdt                #找出孤立包 Q为查询本地软件包数据库 d标记依赖包 t标记不需要的包 dt合并标记孤立包
sudo pacman -Rs $(pacman -Qtdq) #删除孤立软件包
sudo pacman -Fy                 #更新命令查询文件列表数据库
sudo pacman -F xxx              #当不知道某个命令属于哪个包时，用来查询某个xxx命令属于哪个包
```

一个好用的图形化包管理软件

```bash
yay -S octopi #包管理器前端界面
```

拓展链接: [官方文档](https://wiki.archlinux.org/index.php/Pacman)

## 终端编辑器的使用

你需要掌握一个能在终端中进行文本编辑的软件，这里介绍 vim。

```bash
vim 1.txt   #创建并编辑名为1.txt的文件
```

你可以看到进入了一个空的界面。此时你处在 vim 的`命令模式`。在`命令模式`下，可以用一些快捷指令来对文本进行操作。  
现在我们输入`a`进入 vim 的`编辑模式`，此时输入任意文本，即可进行编辑。  
在输入完成后，我们按下 Esc 键，即可从`编辑模式`退出到`命令模式`。此时输入`:wq`即可保存并退出 vim。  
下面介绍一些在命令模式下常用的命令

```bash
:wq     #保存退出
:q!     #不保存，强制退出
dd      #删除一行
d2d     #删除两行
gg      #回到文本第一行
ctrl+g  #转到文本最后一行
/xxx    #在文中搜索内容'xxx' 回车搜索，按n键转到下一个
```

拓展链接：需要完整教程的同学可以在终端中输入命令`vimtutor`来学习完整的 vim 教程。

## 系统服务的操作与介绍

Linux 系统中运行着各种服务，你需要掌握查询，变更服务状态的方式。同时对创建服务最好也有大致的了解。这里讲述命令`systemctl`的用法。以 dhcpcd 为例

```bash
systemctl start dhcpcd          #启动服务
systemctl stop dhcpcd           #停止服务
systemctl restart dhcpcd        #重启服务
systemctl reload dhcpcd         #重新加载服务以及它的配置文件
systemctl status dhcpcd         #查看服务状态
systemctl enable dhcpcd         #设置开机启动服务
systemctl enable --now dhcpcd   #设置服务为开机启动并立即启动这个单元:
systemctl disable dhcpcd        #取消开机自动启动
systemctl daemon-reload dhcpcd  #重新载入systemd配置 扫描新增或变更的服务单元 不会重新加载变更的配置 加载变更的配置用reload
```

拓展链接: [systemctl 官方文档](https://wiki.archlinux.org/index.php/Systemd#Basic_systemctl_usage) [systemd 配置文件样例解释](https://www.freedesktop.org/software/systemd/man/systemd.service.html#Examples)

## 系统硬件信息检测

磁盘检测：  
使用 [smartmontools](https://archlinux.org/packages/extra/x86_64/smartmontools/)

```bash
sudo pacman -S smartmontools
sudo smartctl -A /dev/sda   #硬盘
sudo smartctl -d sat -A /dev/sdc #usb设备
```

cpu 与显卡：  
如下两款是群主目前找到的，最佳的图形化查看 cpu 与显卡信息的软件。

```bash
yay -S cpu-x
yay -S gpu-viewer
```

系统完整信息:  
使用 dmidecode 可以完整查看系统绝大部分硬件信息，包括较难得到的内存频率等。

```bash
sudo pacman -S dmidecode
sudo dmidecode
```

## 文件传输与系统备份

有一点 Linux 经验的同学应该知道[scp](<https://wiki.archlinux.org/index.php/SCP_and_SFTP#Secure_copy_protocol_(SCP)>)这个命令。它常被用来在服务器间传输文件。但是目前它应该被更现代的工具[rsync](https://wiki.archlinux.org/index.php/Rsync)替代，其拥有即时压缩，差量传输等新特性。同时，`rsync`也被用来进行备份操作。

```bash
rsync foo.txt me@server:/home/me/   #最基础的复制文件 与scp的操作完全相同
rsync -a bar/ me@server:/home/me/   #-a 标记实现目录复制等 比scp -r 能更好的处理符号链接等情况
```

关于全盘备份，请阅读[官方文档](https://wiki.archlinux.org/index.php/Rsync#Full_system_backup)

## 文件解压缩

除了众所周知的 tar 命令，我们在之前安装过的 ark 包可以配合 dolphin 文件管理器轻松的右键直接解压缩。需要注意的是解压 windows 下的压缩包，可能会乱码。使用 unar 可以避免这个问题。

```bash
sudo pacman -S unarchiver
unar xxx.zip
```

## 磁盘容量不足的处理方式

一般使用 LVM 安装 Linux 系统则不用担心这种情况发生。但是我们使用的是传统的 ext4 经典分区方式。这种情况下一般建议在安装的开始就将根目录设置的大一些，如 100G。如果/home 分区大小不够了，可以新安装一块硬盘，将其挂载到你想要的位置，再按照`基础安装`的步骤中重新 genfstab 一下就行了。
