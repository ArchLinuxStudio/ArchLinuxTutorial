# 直播与多媒体制作

本节将列出多媒体制作方向的各类优质软件，包括做直播，视频剪辑，图像编辑与绘制等方向所需的软件。

## 直播推流及弹幕姬辅助软件

直播以及录制在 linux 上使用[obs-studio](https://www.archlinux.org/packages/community/x86_64/obs-studio/)完成，用法与 windows 下基本一致。

b 站直播时的弹幕可以使用[弹幕库](https://www.danmaku.live/),这个历史比较复杂，v1 版本的仓库在[这里](https://github.com/pandaGao/bilibili-live-helper)，但是作者说不更新了。v2 版本的作者目前没有开源，并且说以后[也不会更新了](https://t.bilibili.com/378501835576827480)。AUR:[bilibili-live-helper-bin](https://aur.archlinux.org/packages/bilibili-live-helper-bin/)。

除此之外还有一个[bilibili-live-chat](https://github.com/Tsuk1ko/bilibili-live-chat),这是一个浏览器的弹幕实现，风格仿照 youtube 的弹幕风格，也是很多弹幕软件的基础，直接在 web 上使用。除了 B 站直播，twitch 等其他平台的直播方式大同小异，只不过你需要寻找不同的弹幕插件，如在 twitch 上可参考[这篇文章](https://www.bilibili.com/read/cv10092277/)。

> bilibili-live-chat 等基于浏览器的弹幕姬实现需要使用有浏览器插件集成的 obs, arch 官方仓库中默认的 obs-studio 是无此功能的，如需使用 bilibili-live-chat，请安装 AUR 中的[obs-studio-browser](https://aur.archlinux.org/packages/obs-studio-browser/)

如果你使用较新的英伟达显卡，可以使用 NVENC 编码器，这将大大降低直播或录制过程中 cpu 的压力，详情可见[NVIDIA NVENC OBS 指南](https://www.nvidia.cn/geforce/guides/broadcasting-guide/)

注意，如果你使用 qv2ray+cgproxy 开启了透明代理，那么需要将 obs 加入到/etc/cgproxy/config.json 的 program_noproxy 的值中。

## 视频制作剪辑与特效

视频剪辑与制作推荐使用自由软件[shotcut](https://www.archlinux.org/packages/community/x86_64/shotcut/)。它可以满足大多数的视频剪辑制作需求，可以收看[简明视频教程](https://www.bilibili.com/video/BV1zb411H7J5/)。同类的软件还有[kdenlive](https://www.archlinux.org/packages/extra/x86_64/kdenlive/)以及[mkvtoolnix](https://archlinux.org/packages/extra/x86_64/mkvtoolnix-gui/)。

如果你需要功能更加强大的软件，可以尝试免费使用的专有软件[davinci-resolve](https://aur.archlinux.org/packages/davinci-resolve/)<sup>AUR</sup>或者其收费版[davinci-resolve-studio](https://aur.archlinux.org/packages/davinci-resolve-studio/)<sup>AUR</sup>。达芬奇是一个特效、剪辑、调色、配音的综合体软件。需要注意的是，Linux 下免费版达芬奇支持的编解码格式有限[[1]](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_15_Supported_Codec_List.pdf)。

> 因为达芬奇没有编译入 fcitx 模块，所以无法输入中文。正常来说只能等待新版达芬奇加入这个模块。喜欢折腾的可以尝试下老 K 给出的[魔改解决方案](https://www.csslayer.info/wordpress/fcitx-dev/a-case-study-how-to-compile-a-fcitx-platforminputcontext-plugin-for-a-proprietary-software-that-uses-qt-5/)

在视频录制时，一些 KDE 的辅助功能非常实用。在 KDE 的系统设置中，找到工作区行为->桌面特效，在无障碍功能中勾选`鼠标定位`与`鼠标点击动效`两项，并使用。这两项设置在视频制作中可以突出的显示鼠标位置与点击效果，对于视频制作来说相当有用。

对于键盘的输入，可以安装包[screenkey](https://archlinux.org/packages/community/any/screenkey/)，它可以将键盘的键入显示在显示屏上，对于视频的制作同样相当有用。

## 绘图、制图与修饰

在 linux 上的修饰图片可用[gimp](https://www.archlinux.org/packages/extra/x86_64/gimp/)。如果你需要配合数位板绘图，可使用[krita](https://www.archlinux.org/packages/extra/x86_64/krita/)，krita 同时也提供一定的制图功能。矢量图片操作可使用 [inkscape](https://www.archlinux.org/packages/extra/x86_64/inkscape/)

## 建模

可使用强大的 3D 建模软件[blender](https://archlinux.org/packages/community/x86_64/blender/)

## 音频

专业的音频制作可使用如下软件。

- [Kwave](https://archlinux.org/packages/extra/x86_64/kwave/)
- [audacity](https://archlinux.org/packages/community/x86_64/audacity/)
- [lmms](https://archlinux.org/packages/community/x86_64/lmms/)
- [carla](https://archlinux.org/packages/community/x86_64/carla/)

## UI/UX 设计

可使用 figma 在线版，或者使用一个非官方的 Linux figma 桌面端软件[figma-linux](https://github.com/Figma-Linux/figma-linux)

## 字幕制作

一般情况来讲，一个视频加上外带的 srt 字幕是较为普遍的情况。这里描述如何为 youtube 视频加入字幕。  
首先要进行视频字幕的下载，这里可以使用一个 chrome 拓展：[YouTube™ 双字幕](https://chrome.google.com/webstore/detail/youtube-dual-subtitles/hkbdddpiemdeibjoknnofflfgbgnebcm)，即可下载你所需要的字幕文件。如果你有更方便的下载方式，欢迎告诉群主。  
接下来进行字幕与视频的重新烧录。MKVToolNix 只能做那种分离的字幕，但是 B 站要上传烧录好的，为了更好的兼容性，建议始终将视频和文件重新烧录。使用 ffmpeg 进行操作：

```bash
ffmpeg -i input.mp4 -vf subtitles=input.srt output.mp4
```

如果需要制作双语字幕(同时显示，而不是分字幕轨道)，在 youtube 选择自动翻译后，点击中文，如视频支持，会出现双语字幕的文件下载。如视频不支持双语字幕下载，可以使用两次 ffmpeg 命令，第一次添加主字幕，第二次添加副字幕。第一次操作使用 MarginV 进行垂直方向的区分。更多参数可以自行参考 ffmpeg 文档。

```bash
ffmpeg -i hack.mp4 -strict -2 -vf subtitles=hack_zh.srt:force_style='Fontsize=20\,Fontname=FZYBKSJW--GB1-0\,MarginV=30\,Bold=-1\,BorderStyle=1' -qscale:v 3 hack_with_zh.mp4
ffmpeg -i hack_with_zh.mp4 -strict -2 -vf subtitles=hack_en.srt:force_style
='Fontsize=15\,Fontname=FZYBKSJW--GB1-0\,Bold=-1\,BorderStyle=1' -qscale:v 3 hack_with_double_subtitles.mp4
```

## 视觉小说的素材提取

目前一般常用的为 [GARbro](https://github.com/morkt/GARbro)，但是其在 linux 下通过 wine 无法正常使用。这里提供一个跨平台的 gal game 内容提取工具[arc_unpacker](https://aur.archlinux.org/packages/arc_unpacker-git/)。详细用法可自行查看其 github。
