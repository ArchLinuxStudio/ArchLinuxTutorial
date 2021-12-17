# Linux 日常操作与基础知识

阅读完`新手上路`章节，你的系统已完全可以使用，KDE 桌面环境提供了强大的 [GUI](https://zh.wikipedia.org/wiki/%E5%9B%BE%E5%BD%A2%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2) 以供普通用户使用。按 `Windows` 键（Linux 下也常被叫做 Meta 键）呼出菜单栏，找到`设置`=>`系统设置`，可以找到绝大多数系统设置项。

但如果想要游刃有余的掌控你的系统，你还需要阅读掌握本文的内容。
如果你想进一步详细了解本文各部分的详细知识，可以点击在各个小节给出的拓展链接进行学习。
如果你不想详细了解，本章介绍的知识也足够你来应付日常的使用。

## 必须掌握的 Linux 知识

此处只介绍最基本的，最必要的 Linux 知识点与小技巧 。

1. 在 Linux 中，文件目录结构与 Windows 完全不同。Windows 存在 C 盘、D 盘等盘符，而在 Linux 中不存在这些划分，最上层的目录是根目录，路径为 _/_ ，并以一个树形结构从此向下一级一级区分。
2. 对于 Linux 的树形文件结构，存在相对路径与绝对路径之分。绝对路径是代表从根路径 _/_ 开始的完整路径，如`/home/testuser/Download`。相对路径代表从当前目录，到目标目录的一个部分路径。比如当前你所在的目录为`/home/testuser`，那么切换到绝对路径`/home/testuser/Download`的相对路径即为`./Download`。其中`./`代表从当前目录，再向下寻找。另外，`..`这种两个句点代表的是向上层寻找，比如你当前所在的路径为`/home/testuser/Download`，向上寻找到`/home/testuser/Desktop`的相对路径即为`../Desktop`。
3. 简单来说，Linux 中存在两类用户。第一类用户即为 root 用户，也称为超级用户，它拥有系统中最高的权限。第二类用户就是除了 root 用户的普通用户，他们可以拥有不同等级的权限。使用 root 权限时需要十分小心。
4. 理论上来说，任何图形化界面中的操作都可以用对应的命令行命令完成。如果你打开某个程序报错，不妨试试找到它的对应启动命令，在终端中执行此命令，并观察它运行时的错误日志输出，查阅相关资料，解决问题。

## 终端操作基础

如果想要熟练掌握 Linux，就必须掌握终端的常见命令与使用方式。

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

拓展链接：推荐阅读在线进阶书籍 [Linux 命令行与 Shell 脚本教程](https://archlinuxstudio.github.io/ShellTutorial/#/)。 随后也将提供与此书配套的教学视频 [Linux 命令行与 Shell 教程](https://www.youtube.com/channel/UCVO7lXKucA6z3O37WV7FG5w/videos)<sup>TODO</sup>。

## Pacman 包管理

Pacman 是 Arch Linux 的包管理器，它用于安装、删除、查询软件等。

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
:wq     # 保存退出
:q!     # 不保存，强制退出
dd      # 删除一行
2dd     # 删除两行
gg      # 回到文本第一行
shift+g  # 转到文本最后一行
/xxx    # 在文中搜索内容'xxx' 回车搜索，按n键转到下一个
?xxx   # 反向搜索
```

拓展链接：需要完整教程的同学可以在终端中输入命令`vimtutor`来学习完整的 vim 教程。

## 系统服务的操作与介绍

Linux 系统中运行着各种服务，你需要掌握查询，变更服务状态的方式。同时对创建服务最好也有大致的了解。这里讲述命令`systemctl`的用法。以 dhcpcd 为例

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

拓展链接: [systemctl 官方文档](https://wiki.archlinux.org/index.php/Systemd#Basic_systemctl_usage) [systemd 配置文件样例解释](https://www.freedesktop.org/software/systemd/man/systemd.service.html#Examples)

## 编辑系统配置文件

#### 用 sudoedit 编辑配置文件

在前面的“[桌面环境与常用应用](../rookie/DE%26App.md)”一节中，我们已经多次编辑了系统配置文件。它们的特点是对系统中的所有用户生效、归 root 用户所有、并且只有 root 用户才拥有写入的权限，这就需要我们用 sudo 提升到 root 权限才能编辑它们。很容易想到用 sudo 命令去运行文本编辑器，以 vim 为例：

```shell
sudo vim 你要编辑的文件的路径
```

但是这样却不是最好的方式，因为它违反了“[最小权限原则](https://zh.wikipedia.org/wiki/%E6%9C%80%E5%B0%8F%E6%9D%83%E9%99%90%E5%8E%9F%E5%88%99)”。因为当我们用 sudo 执行一个命令时，整个进程都会获得 root 权限。也就是说，vim 的所有操作、甚至包括所有的 vim 插件都会在 root 权限下运行，这通常来说是非常危险的。有的文本编辑器甚至会在检测到自身以 root 权限运行的时候拒绝运行，以避免做出危险的操作。

反过来考虑，只是编辑一个文件不需要那么强大的权限，我们只需要拥有对这一个配置文件的读写权限就足够了。而 `sudoedit`（或 `sudo -e`，二者是完全等效的）是编辑一个系统配置文件的最佳实践。

```shell
EDITOR=vim sudoedit 要编辑的文件
```

sudodit 命令大致是这样工作的：它会先创建一份普通用户有权编辑的临时文件，把要编辑的文件以 root 权限复制到这个临时文件中，接着根据 EDITOR 等环境变量，**以普通用户的权限**运行文本编辑器。在文本编辑器编辑完成并退出后，它会再次以 root 权限用这个编辑好的临时文件去覆盖掉原先的配置文件。

关于 sudoedit 的更多信息，详见 [sudo 的手册](https://man.archlinux.org/man/sudo.8.en#e)。

#### 配置文件的语法高亮

严格来说这不是一个关于 sudoedit 的问题，而是一个关于文本编辑器的问题，但是它经常在用 sudoedit 编辑文件时遇到。

因为 sudoedit 会创建一个随机名称的临时文件，文本编辑器可能不认识这个文件名，不知道该启用什么语法的高亮显示。这时候就需要我们主动告诉文本编辑器该使用什么语法，以 vim 为例，可以在命令行模式下用如下设置语法：

```vim
:set syntax=文件的语法
```

另一个问题是如何知道语法的名称。一方面我们可以用搜索引擎搜索，或者在 vim 的内置插件里寻找，不过对于那些普通用户也能读取的配置文件，可以直接用 vim 去查看它，这时候 vim 会以只读模式打开文件，但是会根据文件名启用语法高亮。这样只需要在命令行模式下运行：

```vim
:set syntax
```

即可查看当前 vim 所使用的高亮语法。

#### 编辑 sudoers 配置文件

在前面我们编辑过 sudoers 配置文件。sudoers 算是系统配置文件中的一个特例，编辑它的最佳实践不是使用 `sudoedit`，而是 `visudo` 命令。

```shell
sudo visudo  # visudo 需要使用 root 权限运行。默认编辑 /etc/sudoers
sudo visudo -f 要编辑的sudoers文件的路径  # 也可以指定文件路径
```

visudo 与 sudoedit 类似的是，它也会把要编辑的配置文件先复制到一个临时文件，再调用文本编辑器编辑，而不同的是，在开始编辑之前 visudo 还会锁定正在编辑的 sudoers 文件，以此避免两个人同时对它编辑；并且会在编辑完成之后检查 sudoers 的语法，如果发现错误则会拒绝这次编辑的结果。

这是因为，如果在 sudoers 文件中遇到语法错误，sudo 为了安全性，会让整个 sudoers 配置文件都不生效。这样的话，如果普通用户不慎改坏了 sudoers 文件，则有可能失去使用 sudo 命令的权限，就好像“关上了大门并把自己关在了外面”，这时候就需要直接用 root 用户登录甚至需要 live USB 急救才行。而 visudo 检查 sudoers 语法就可以很大程度上避免这种情况发生。

另一方面，visudo 需要使用 root 身份运行，这意味着它的文本编辑器实际上也是以 root 身份运行的，这一点与 sudoedit 不同。为了安全，可以配置为只使用某些受限制的“安全的”文本编辑器来编辑 sudoers 文件。详见 [ArchWiki](https://wiki.archlinux.org/title/Sudo#Using_visudo) 以及 [sudoers 手册](https://man.archlinux.org/man/sudoers.5)中的 editor 一节和 [env_editor](https://man.archlinux.org/man/sudoers.5#env_editor) 一节。

关于 visudo 的更多内容详见[手册](https://man.archlinux.org/man/visudo.8)。

## 文件传输与系统备份

有一点 Linux 经验的同学应该知道[scp](<https://wiki.archlinux.org/index.php/SCP_and_SFTP#Secure_copy_protocol_(SCP)>)这个命令。它常被用来在服务器间传输文件。但是目前它应该被更现代的工具[rsync](https://wiki.archlinux.org/index.php/Rsync)替代，其拥有即时压缩，差量传输等新特性。同时，`rsync`也被用来进行备份操作。

```bash
rsync foo.txt me@server:/home/me/   # 最基础的复制文件 与scp的操作完全相同
rsync -a bar/ me@server:/home/me/   # -a 标记实现目录复制等 比scp -r 能更好的处理符号链接等情况
```

关于全盘备份，请阅读[官方文档](https://wiki.archlinux.org/index.php/Rsync#Full_system_backup)。如果你寻求一种图形化的操作方式，可以自行尝试[Timeshift](https://aur.archlinux.org/packages/timeshift/)<sup>AUR</sup>。

## 文件解压缩

除了众所周知的 tar 命令，我们在之前安装过的 [ark](https://archlinux.org/packages/extra/x86_64/ark/) 包可以配合 dolphin 文件管理器轻松的右键直接解压缩，其可选依赖提供了各个压缩格式的支持，可以自行选择安装。需要注意的是解压 windows 下的压缩包，可能会乱码，安装 ark 的可选依赖之一 unarchiver，使用 unar 可以避免这个问题。

```bash
sudo pacman -S unarchiver
unar xxx.zip
```

## 系统硬件信息检测

磁盘检测可使用 [smartmontools](https://archlinux.org/packages/extra/x86_64/smartmontools/)

```bash
sudo smartctl -A /dev/sda   #硬盘
sudo smartctl -d sat -A /dev/sdc #usb设备
```

磁盘空间分析可直接使用 dh 命令，也可使用 [Filelight](https://archlinux.org/packages/extra/x86_64/filelight/)图形化界面直观查看磁盘占用情况

```bash
df -h
```

cpu 与显卡的信息查看可使用如下两款软件

```bash
yay -S cpu-x
yay -S gpu-viewer
```

使用 [dmidecode](https://archlinux.org/packages/extra/x86_64/dmidecode/) 可以完整查看系统绝大部分硬件信息，包括较难得到的内存频率，主板 BIOS 等等。

```bash
sudo dmidecode
```

## 制作 windows10 启动盘

你可能在 linux 下，有时需要制作 win10 的启动盘。在以往，在 linux 下制作一个 win10 启动盘还是很简单的，但是随着近几年微软的更新，其 iso 安装镜像中存在一个名为`install.wim`的文件，其大小已经超出了 4GB，超出了 fat32 所要求的单个文件最大 4GB 的限制。这使得必须用额外的步骤才能制作一个启动盘。这里依旧使用 fat32 格式是因为其兼容性是最好的，ntfs 的 uefi 启动盘很多情况下不被识别。

首先和基础安装中的部分步骤类似，首先用 parted 命令创建 U 盘的分区 label 为 gpt。接下来用 cfdisk 命令创建新分区，在 Type 中选择 Microsoft basic data。接下来使用 mkfs.vfat 命令格式化所创建的分区。这样 U 盘就准备好了。

接下来下载 win10 的 iso 镜像并解压。在某些文件管理器中，你会得到如下错误。

```bash
This disc contains a "UDF" file system and requires an operating system
that supports the ISO-13346 "UDF" file system specification.w
```

这种情况下则需要手动挂载并复制出来

```bash
mount -o loop /path/of/windows10.iso /mnt/your/mountpoint
```

得到复制出来的文件后，最后要进行的就是压缩 install.wim 文件，这里需要首先安装一个包

```bash
sudo pacman -S wimlib
```

接下来进行压缩，这一步会持续较长时间，耐心等待。完成后可以看到文件已经被压缩到了 3.x GB。

```bash
sudo wimlib-imagex optimize install.wim --solid
```

最后把全部文件复制到 U 盘中即可。

Ref: [[1]](https://www.dedoimedo.com/computers/windows-10-usb-media-linux.html)
