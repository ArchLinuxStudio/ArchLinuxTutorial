# 桌面环境与常用应用

官方文档: [安装后的工作](https://wiki.archlinux.org/index.php/General_recommendations)  
本节只介绍最基本的，能使系统真正意义上可用所需的组件  
相关视频链接： [安装 KDE 与常用软件](https://www.bilibili.com/video/BV1Fv411H7x2) 视频文字结合效果更好  
注: 文档中带有 <sup>AUR</sup> 角标的软件代表是用户自行打包的第三方软件[AUR](https://aur.archlinux.org/)，不在 Arch 官方支持范围内，可能会出现更新不及时、无法安装、使用出错等各种问题。如果不是实在没有官方支持的同类软件，则不建议使用。

## 1.确保系统为最新

如果你在做完上一节的内容后，重启并放置过一段时间，那需要先按照上节末尾处的方式重新连接网络，然后更新系统。

```bash
pacman -Syyu    #升级系统中全部包
```

## 2.准备非 root 用户

添加用户，比如新增加的用户叫 testuser

```bash
useradd -m -G wheel -s /bin/bash testuser  #wheel附加组可sudo进行提权 -m同时创建用户家目录
```

设置新用户 testuser 的密码

```bash
passwd testuser
```

编辑 sudo 文件

```bash
EDITOR=vim visudo
```

找到这样的一行,把前面的注释符号#去掉，`:wq`保存并退出即可。

```bash
#%wheel ALL=(ALL) ALL
```

这里稍微解释一下
%wheel 代表是 wheel 组，百分号是前缀  
ALL= 代表在所有主机上都生效(如果把同样的`sudoers`文件下发到了多个主机上)  
(ALL) 代表可以成为任意目标用户  
ALL 代表可以执行任意命令  
一个更详细的例子:

```bash
%mailadmin   snow,rain=(root) /usr/sbin/postfix, /usr/sbin/postsuper, /usr/bin/doveadm
nobody       ALL=(root) NOPASSWD: /usr/sbin/rndc reload
```

组 mailadmin 可以作为 root 用户，执行一些邮件服务器控制命令。可以在 "snow" 和 "rain"这两台主机上执行  
用户 nobody 可以以 root 用户执行`rndc reload`命令。可以在所有主机上执行。同时可以不输入密码。(正常来说 sudo 都是要求输入调用方的密码的)

## 3.安装 KDE Plasma 桌面环境

```bash
pacman -S plasma-meta konsole dolphin  #安装plasma-meta元软件包以及终端和文件管理器
```

## 4.配置 greeter sddm

<!-- pacman -S sddm //包含在plasma-meta了 不用单独装
但是plasma-desktop 没有 还是要装
-->

```
systemctl enable sddm
```

## 5.设置交换文件 swap

在桌面环境中，交换分区或文件用来实现休眠(hibernate)的功能，即将当前环境保存在磁盘的交换文件或分区部分。除此之外，某些特定软件需要 swap 才可以正确运行。交换文件与分区性能相同，且交换文件更为灵活，可随时变更大小，增加与删除。[[1]](https://wiki.archlinux.org/title/Swap#Swap_file)

```bash
dd if=/dev/zero of=/swapfile bs=1M count=16384 status=progress #创建16G的交换空间 大小根据需要自定
chmod 600 /swapfile #设置正确的权限
mkswap /swapfile #格式化swap文件
swapon /swapfile #启用swap文件
```

最后，向/etc/fstab 中追加如下内容：

```bash
/swapfile none swap defaults 0 0
```

KDE 自身提供开箱即用的睡眠功能(suspend)，即将系统挂起到内存，消耗少量的电量。休眠(hibernate)会将系统挂起到交换分区或文件，几乎不消耗电量。sleep 睡眠功能已可满足绝大多数人的需求，如果你一定需要休眠功能，可以参考[官方文档](https://wiki.archlinux.org/title/Power_management/Suspend_and_hibernate)设置休眠相关步骤。

## 6.开启 32 位支持库与 ArchLinuxCN 支持库

```bash
vim /etc/pacman.conf
```

去掉[multilib]一节中两行的注释，来开启 32 位库支持。  
在文档结尾处加入下面的文字，来开启 ArchLinuxCN 源。

```bash
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

上面服务器的地址是中科大的，也可用下面清华的。

```bash
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

[此处](https://github.com/archlinuxcn/mirrorlist-repo#arch-linux-cn-community-repo-mirrors-list)为 archlinuxcn 全部仓库地址 可以根据自己实际情况另行选择。

最后:wq 保存退出，刷新 pacman 数据库

```bash
pacman -Syyu
```

重启电脑，即可看到欢迎界面，输入新用户的密码即可登录桌面

## 7.安装基础功能包

进入桌面后，搜索 konsole。它是 KDE 桌面环境默认的命令行终端。

首先先进行桌面环境中的网络设置：

```bash
sudo systemctl disable iwd                                                  #确保iwd开机处于关闭状态，其无线连接会与NetworkManager冲突
sudo systemctl stop iwd                                                     #同上，立即关闭iwd
sudo systemctl enable --now NetworkManager                                  #确保先启动NetworkManager，并进行网络连接 若iwd已经与NetworkManager冲突 则执行完上一步重启一下电脑即可。
```

接下来安装一些基础功能包。

```bash
sudo pacman -S ntfs-3g                                                      #识别NTFS格式的硬盘
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei                   #安装几个开源中文字体 一般装上文泉驿就能解决大多wine应用中文方块的问题
sudo pacman -S noto-fonts-cjk noto-fonts-emoji noto-fonts-extra             #安装谷歌开源字体及表情
sudo pacman -S firefox chromium                                             #安装常用的火狐、谷歌浏览器
sudo pacman -S ark                                                          #与dolphin同用右键解压 注意可同时安装可选解压支持项
sudo pacman -S packagekit-qt5 packagekit appstream-qt appstream             #确保Discover(软件中心）可用 需重启
sudo pacman -S gwenview                                                     #图片查看器
sudo pacman -S steam                                                        #稍后看完显卡驱动再使用 专有软件
```

最后要安装 archlinuxcn 源的相关步骤。

```bash
sudo pacman -S archlinuxcn-keyring                                          #cn源中的签名(archlinuxcn-keyring在archLinuxCn)
sudo pacman -S yay                                                          #yay命令可以让用户安装AUR中的软件(yay在archLinuxCn)
```

若安装 archlinuxcn-keyring 时报错，是由于密钥环的问题，可先按照[此链接](https://www.archlinuxcn.org/gnupg-2-1-and-the-pacman-keyring/)执行其中的命令，再安装 archlinuxcn-keyring

## 8.设置系统为中文

打开 _System Settings_ > _Regional Settings_ > _Language_ -> _Add languages_ 中选择中文加入，再拖拽到第一位，Apply。

再将*System Settings* > _Regional Settings_ > _Formats_ 中的值设为`中文-简体中文(zh_CN)`

最后重新登陆即可。

> 很多人会错误的更改 _System Settings_ > _Regional Settings_ > _Formats_ 中的值为中文蒙古(mn_CN)，默认，或者其他值，这会导致系统中一半英文一般中文。这里的值要保持默认的 en_US 或 zh_CN,或者改为你在 locale.gen 中添加的任意一种语言。

## 9.安装输入法

[Fcitx5 官方文档](<https://wiki.archlinux.org/index.php/Fcitx5_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)  
中文及日文输入法均体验良好。

```bash
sudo pacman -S fcitx5-im #基础包组
sudo pacman -S fcitx5-chinese-addons #官方中文输入引擎
sudo pacman -S fcitx5-anthy #日文输入引擎
sudo pacman -S fcitx5-pinyin-moegirl #萌娘百科词库 二刺猿必备(ArchLinuxCn)
sudo pacman -S fcitx5-material-color #主题
```

设置环境变量 编辑文件 `sudo vim /etc/environment` 加入以下内容。konsole 以及 dophin 都需要这些环境变量，倒是 chrome 和 firefox 都不需要就可以输入中文

```bash
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
```

打开 _系统设置_ > _区域设置_ > _输入法_，先点击`运行Fcitx`即可，拼音为默认添加项。如你还需要更多输入法如五笔，则再点击`添加输入法`，找到简体中文下的五笔 ，点击添加即可加入五笔输入法。

接下来点击 _拼音_ 右侧的配置按钮，点选`云拼音`和`在程序中显示预编辑文本` 最后应用。

回到输入法设置，点击`配置附加组件`，找到 _经典用户界面_ 在主题里选择一个你喜欢的颜色 最后应用。

注销，重新登陆，就可以发现已经可以在各个软件中输入中文了

## 10.配置系统默认编辑器

默认情况下，Arch Linux 在一些终端编辑场景使用 vi 编辑器，但是我们使用 vim。如果不做一个额外配置，在 git 等场景下，在终端调用编辑器会出错。编辑~/.bashrc 文件，加入如下内容，将 vim 设置为默认 EDITOR

```bash
export EDITOR='vim'
```

## 11.启动蓝牙(若有)

如果你有蓝牙设备，需要启用蓝牙服务。随后在系统设置中进行添加设备与连接即可。

```bash
sudo systemctl enable --now bluetooth
```

<!-- ## 11.异型字体设置

个人的设置是英文使用 Hack，中文使用 Noto Sans CJK SC。可以在系统设置->外观->字体中进行设置。如遇到`门复关`等字形现实为日型字体，有关用户全局级别更改日文异型字的设置，可参考[官方文档](<https://wiki.archlinux.org/index.php/Localization_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Simplified_Chinese_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BF%AE%E6%AD%A3%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%E6%98%BE%E7%A4%BA%E4%B8%BA%E5%BC%82%E4%BD%93%EF%BC%88%E6%97%A5%E6%96%87%EF%BC%89%E5%AD%97%E5%BD%A2>) -->
