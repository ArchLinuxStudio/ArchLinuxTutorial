# 编程软件

很多人不清楚的是，Linux 几乎是最适合编程的操作系统，其对于各个方向的编程支持非常到位(微软与苹果的专有系统编程除外)，可以为你省去很多痛苦。本文介绍各个编程方向优质的软件介绍。

## 前端编程

对于前端来说，一般需要浏览器以及 IDE 即可，附加一些网络工具。

关于 IDE(或编辑器),可以使用 [OSS code](https://www.archlinux.org/packages/community/x86_64/code/)，[vscodium-bin](https://aur.archlinux.org/packages/vscodium-bin/)，或者 [atom](https://archlinux.org/packages/community/x86_64/atom/)。

> 微软公司 Visual Studio Code 的二进制构建实际为专有软件。很多人在此存在误解。如此偷梁换柱的手段越来越被更多公司发掘使用。

浏览器方面有 [firefox](https://archlinux.org/packages/extra/x86_64/firefox/)，[chromium](https://archlinux.org/packages/extra/x86_64/chromium/)，[firefox-developer-edition](https://www.archlinux.org/packages/community/x86_64/firefox-developer-edition/)，等众多软件可供选择。

网络工具常使用 [charles](https://aur.archlinux.org/packages/charles/)<sup>AUR</sup>，以及 [wireshark-qt](https://archlinux.org/packages/community/x86_64/wireshark-qt/)。

至于 [yarn](https://www.archlinux.org/packages/community/any/yarn/)、[npm](https://www.archlinux.org/packages/community/any/npm/) 等前端常用工具，也均可用 pacman 安装。

> OSS code 存在的问题：[官方 wiki](https://wiki.archlinux.org/index.php/Visual_Studio_Code)。一个普遍问题是删文件 UI 会卡住很久，原因是 electron 在 linux 下默认使用 `gio` 删除，但是 KDE 用户一般都不装这个。解决办法是把 `ELECTRON_TRASH=kioclient5` 环境变量加在~/.pam_environment 里。

## 后端编程

Jetbrains 家的全家桶基本都有支持可以在源中或 AUR 中自行搜索，如[IntelliJ Idea](https://www.archlinux.org/packages/community/x86_64/intellij-idea-community-edition/)，[PyCharm](https://www.archlinux.org/packages/community/x86_64/pycharm-community-edition/)，[GoLand](https://aur.archlinux.org/packages/goland/)<sup>AUR</sup>等。
较为老式的 IDE 有 [Netbeans](https://www.archlinux.org/packages/community/any/netbeans/) 以及 eclipse，eclipse 有多种版本，可在 AUR 中自行搜索。

关于编程语言自身，更是不必多说，除了 c 语言和 c++自身即支持外，java, node，等都可以被轻易安装。

关于数据库相关软件，也有多种选择。

- [Mysql Workbench](https://www.archlinux.org/packages/community/x86_64/mysql-workbench/)
- [pgadmin4](https://www.archlinux.org/packages/community/x86_64/pgadmin4/)
- [dbeaver](https://www.archlinux.org/packages/community/x86_64/dbeaver/)
- [robo3t](https://aur.archlinux.org/packages/robo3t-bin/)<sup>AUR</sup>
- [redis-desktop-manager](https://aur.archlinux.org/packages/redis-desktop-manager/)<sup>AUR</sup>
- [rdm-bin](https://aur.archlinux.org/packages/rdm-bin/)<sup>AUR</sup> 如果上面的编译有问题，可用这个 bin 版本

针对大数据方面，可安装[hadoop](https://aur.archlinux.org/packages/hadoop/)<sup>AUR</sup>等包。如有包长期没有更新或包不存在，如 hbase 和 hive，则只能去官网自行下载并配置。

关于软件测试，[junit](https://archlinux.org/packages/extra/any/junit/)等常见软件也可轻松安装，配合你喜欢的 IDE 来使用。

## 安卓客户端编程

目前来说，安卓开发已经统一到了 [Android Studio](https://aur.archlinux.org/packages/android-studio/)<sup>AUR</sup> 进行开发。当然老式的 Eclipse 也可以用来使用。常用的安卓模拟器则也可使用[genymotion](https://aur.archlinux.org/packages/genymotion/)<sup>AUR</sup>。

## 桌面应用编程

目前桌面开发较为流行的是 [electron](https://archlinux.org/packages/community/x86_64/electron/) 和 [Qt](https://archlinux.org/packages/extra/x86_64/qt6-base/) 应用。electron 可直接用 OSS Code 进行开发，Qt 应用使用 [Qt Creator](https://www.archlinux.org/packages/extra/x86_64/qtcreator/) 进行开发。

## 机器学习与深度学习

针对机器学习方面的编程，IDE 可使用同后端编程中一样的软件。机器学习常用的[jupyter-notebook](https://archlinux.org/packages/community/any/jupyter-notebook/) 以及所需要的相关库如[numpy](https://archlinux.org/packages/extra/x86_64/python-numpy/)、[sklearn](https://archlinux.org/packages/community/x86_64/python-scikit-learn/)、[pandas](https://archlinux.org/packages/community/x86_64/python-pandas/)等，也均可在源中找到。同时,[tensorflow](https://archlinux.org/packages/community/x86_64/tensorflow/)、[pytorch](https://archlinux.org/packages/?sort=&q=python-pytorch&maintainer=&flagged=)以及其相关的 cuda 支持包等深度学习相关的包也均可安装使用。

## 逆向工程

逆向工程中很知名的软件 IDA 也可安装，分为[免费版](https://aur.archlinux.org/packages/ida-free/)<sup>AUR</sup>与[收费版](https://aur.archlinux.org/packages/ida-pro/)<sup>AUR</sup>。另外也可安装知名的[ghidra](https://archlinux.org/packages/community/x86_64/ghidra/)。除此之外再介绍一个好用的十六进制编辑器[Bless](https://archlinux.org/packages/community/any/bless/)。
