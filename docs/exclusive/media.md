# 直播与自媒体

本节将列出自媒体方向的各类优质软件，包括做直播，视频剪辑，图像编辑与绘制等方向所需的软件。

## 直播推流及辅助软件

- [obs-studio](https://www.archlinux.org/packages/community/x86_64/obs-studio/) 直播以及视频录制
- [弹幕库](https://www.danmaku.live/) 这个历史比较复杂，v1 版本的仓库在[这里](https://github.com/pandaGao/bilibili-live-helper)，但是作者说不更新了。v2 版本的作者目前没有开源，并且说以后[不会更新了](https://t.bilibili.com/378501835576827480)。AUR 搜索:`bilibili-live-helper-bin`
- [bilibili-live-chat](https://github.com/Tsuk1ko/bilibili-live-chat) 还没试过，据说是很多弹幕软件的基础。直接在 web 上使用。

## 视频剪辑与特效

- [shotcut](https://www.archlinux.org/packages/community/x86_64/shotcut/)
- [kdenlive](https://www.archlinux.org/packages/extra/x86_64/kdenlive/)
- [mkvtoolnix](https://archlinux.org/packages/extra/x86_64/mkvtoolnix-gui/)
- [davinci-resolve](https://aur.archlinux.org/packages/davinci-resolve/)<sup>AUR</sup> 特效剪辑调色综合体 免费版
- [davinci-resolve-studio](https://aur.archlinux.org/packages/davinci-resolve-studio/)<sup>AUR</sup> 收费完整版

> 因为达芬奇没有编译入 fcitx 模块，所以无法输入中文。正常来说只能等待新版达芬奇加入这个模块。喜欢折腾的可以尝试下老 K 给出的[魔改解决方案](https://www.csslayer.info/wordpress/fcitx-dev/a-case-study-how-to-compile-a-fcitx-platforminputcontext-plugin-for-a-proprietary-software-that-uses-qt-5/)

Linux 下免费版支持的编解码格式有限
https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_15_Supported_Codec_List.pdf

## 绘图、制图与修饰

- [krita](https://www.archlinux.org/packages/extra/x86_64/krita/)
- [gimp](https://www.archlinux.org/packages/extra/x86_64/gimp/)
- [inkscape](https://www.archlinux.org/packages/extra/x86_64/inkscape/)

<!--
#### 声卡驱动

[alsa 官方文档](https://wiki.archlinux.org/index.php/Advanced_Linux_Sound_Architecture)
[PulseAudio 官方文档](https://wiki.archlinux.org/index.php/PulseAudio)
音频问题：需要安装一些包来解决声道独占的问题(davinci reslove 会出现声道抢占)

不确定是否需要的：
sudo pacman -S pulseaudio-alsa  #作为一个pulseaudio与alsa的bridge，可能解决了没有声音的问题
sudo pacman -S pulseeffects
sudo pacman -S pulseaudio-jack -->
