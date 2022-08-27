# Streaming and Multimedia Production

This section will list all kinds of high-quality software in the direction of multimedia production, including the software required for live broadcast, video editing, image editing and drawing.

## Live streaming and barrage Ji auxiliary software

The live broadcast and recording are done on linux using [obs-studio](https://www.archlinux.org/packages/community/x86_64/obs-studio/), and the usage is basically the same as that under windows.

You can use [danmaku library](https://www.danmaku.live/) for the live broadcast of station b. This history is more complicated. The v1 version of the warehouse is [here](https://github.com/pandaGao/bilibili-live-helper), but the author said that it will not be updated. The author of the v2 version is currently not open source, and said that it [will not be updated in the future](https://t.bilibili.com/378501835576827480). AUR: [bilibili-live-helper-bin](https://aur.archlinux.org/packages/bilibili-live-helper-bin/).

In addition to this, there is also a [bilibili-live-chat](https://github.com/Tsuk1ko/bilibili-live-chat), which is a browser's bullet chat implementation, the style is modeled after youtube's bullet chat style, It is also the basis of many barrage software, which can be used directly on the web. In addition to the live broadcast of station B, the live broadcast methods of other platforms such as twitch are similar, but you need to find different bullet screen plug-ins. For example, you can refer to [this article](https://www.bilibili.com/read/cv10092277/) on twitch .

> Browser-based danmakuji implementations such as bilibili-live-chat require the use of obs integrated with browser plug-ins. The default obs-studio in the arch official repository does not have this function. If you want to use bilibili-live-chat, please Install [obs-studio-browser](https://aur.archlinux.org/packages/obs-studio-browser/) in AUR.

If you use a newer NVIDIA graphics card, you can use the NVENC encoder, which will greatly reduce the pressure on the cpu during live streaming or recording, see [NVIDIA NVENC OBS Guide](https://www.nvidia.cn/geforce/guides/broadcasting-guide/)

Note that if you use qv2ray+cgproxy to enable transparent proxy, then you need to add obs to the value of program_noproxy in /etc/cgproxy/config.json.

## Video production editing and special effects

The free software [shotcut](https://www.archlinux.org/packages/community/x86_64/shotcut/) is recommended for video editing and production. It can meet most video editing needs. Similar software includes [kdenlive](https://www.archlinux.org/packages/extra/x86_64/kdenlive/) and [mkvtoolnix](https://archlinux.org/packages/extra/x86_64/mkvtoolnix-gui/).

Some of KDE's accessibility features are useful when recording video. In KDE's system settings, find Workspace Behavior->Desktop Effects, check `Mouse Positioning` and `Mouse Click Animation` in Accessibility Functions, and use them. These two settings can highlight the mouse position and click effect in video production, which is quite useful for video production.

For keyboard input, you can install the package [screenkey](https://archlinux.org/packages/community/any/screenkey/), which can display the keyboard input on the display screen, which is also quite useful for video production.

## Drawing, drafting and retouching

Retouched images on linux are available [gimp](https://www.archlinux.org/packages/extra/x86_64/gimp/). If you need to draw with the tablet, you can use [krita](https://www.archlinux.org/packages/extra/x86_64/krita/), krita also provides certain drawing functions. Vector image manipulation can be done using [inkscape](https://www.archlinux.org/packages/extra/x86_64/inkscape/)

[Aseprite](https://www.aseprite.org/) is a pixel art drawing tool, you can use the yay installation package [aseprite](https://aur.archlinux.org/packages/aseprite/).

[RawTherapee](https://archlinux.org/packages/community/x86_64/rawtherapee/) is a free and open source cross-platform RAW format image processing program.

[hugin](https://archlinux.org/packages/community/x86_64/hugin/) is an open source software that can synthesize the depth of field of pictures and stitch pictures. It can replace the automatic alignment layers and Automatically merge layers.

As for format conversion, you can use the convert function of [imagemagick](https://archlinux.org/packages/extra/x86_64/imagemagick/) to convert between image formats.

For handwriting and various handwriting needs, you can try to use [rnote](https://archlinux.org/packages/community/x86_64/rnote/)

## Modeling

- [blender](https://archlinux.org/packages/community/x86_64/blender/) powerful 3D modeling software
- [Sweet Home 3D](https://archlinux.org/packages/community/x86_64/sweethome3d/) Sweet Home 3D is a free home improvement assistant design software. It can help you design and arrange your furniture through a two-dimensional home floor plan, and you can also browse the entire decoration layout with a three-dimensional perspective.
- [Synfig Studio](https://archlinux.org/packages/community/x86_64/synfigstudio/) Synfig Studio is a free and open source 2D animation software for creating film-quality animations using vector and bitmap artwork.

## Audio

Professional audio production can use the following software.

- [Kwave](https://archlinux.org/packages/extra/x86_64/kwave/) Kwave is a free and open source audio editing software developed by KDE, which can record, play, import and edit many audio files, including many soundtrack file.
- [lmms](https://archlinux.org/packages/community/x86_64/lmms/) LMMS is a free, open source and cross-platform composition tool. Create music by crafting melodies and beats, synthesizing and mixing audio, arranging audio clips, and more.
- [carla](https://archlinux.org/packages/community/x86_64/carla/) Carla is a fully-featured modular audio plugin host, with support for many audio drivers and plugin formats.
- [Ardour](https://archlinux.org/packages/community/x86_64/ardour/) Ardour is a free and open source software that allows you to record, edit and mix on Linux.
- [vcvrack](https://aur.archlinux.org/packages/vcvrack-bin/) VCV Rack is an open source visual, modular sound synthesizer.
- [Mixxx](https://archlinux.org/packages/community/x86_64/mixxx/) Mixxx integrates the tools DJs need for creative live mixing using digital music files.
- [MuseScore](https://archlinux.org/packages/community/x86_64/lmms/) MuseScore is a cross-platform free and open source notation software developed by Muse Group.
- [SoundConverter](https://archlinux.org/packages/community/any/soundconverter/) SoundConverter is an audio file converter for the GNOME desktop (this does not affect use in the Plasma desktop environment).
- [Reaper](https://archlinux.org/packages/community/x86_64/reaper/) REAPER is a complete digital audio production application for computers, offering a full multitrack audio and MIDI recording, editing, processing, mixing and mastering toolset. 

## UI/UX Design

- [figma-linux](https://github.com/Figma-Linux/figma-linux) figma online version, or use an unofficial Linux figma desktop software
- [Akira](https://aur.archlinux.org/packages/akira/) Designing Linux-native apps with UI/UX built with Vala and GTK

## Subtitles

Generally speaking, it is more common to add srt subtitles to a video. Here is how to add subtitles to youtube videos.
The first thing to do is to download video subtitles, here you can use a chrome extension: [YouTube™ Dual Subtitles](https://chrome.google.com/webstore/detail/youtube-dual-subtitles/hkbdddpiemdeibjoknnofflfgbgnebcm), you can download your Required subtitle file. If you have a more convenient way to download, please let us know.
Next, re-burn the subtitles and video. MKVToolNix can only do that kind of separated subtitles, but some video sites such as Bilibili need to upload and burn it. For better compatibility, it is recommended to always re-burn the video and file. Do it with ffmpeg:

```bash
ffmpeg -i input.mp4 -vf subtitles=input.srt output.mp4
```

If you need to make bilingual subtitles (display at the same time, instead of subtitle tracks), after youtube selects automatic translation, click Chinese, if the video supports, the file download of bilingual subtitles will appear. If the video does not support bilingual subtitle download, you can use the ffmpeg command twice, the first to add the main subtitle and the second to add the subtitle. The first operation uses MarginV for vertical differentiation. For more parameters, you can refer to the ffmpeg documentation yourself.

```bash
ffmpeg -i hack.mp4 -strict -2 -vf subtitles=hack_en.srt:force_style='Fontsize=20\,Fontname=FZYBKSJW--GB1-0\,MarginV=30\,Bold=-1\,BorderStyle=1 ' -qscale:v 3 hack_with_en.mp4
ffmpeg -i hack_with_en.mp4 -strict -2 -vf subtitles=hack_en.srt:force_style
='Fontsize=15\,Fontname=FZYBKSJW--GB1-0\,Bold=-1\,BorderStyle=1' -qscale:v 3 hack_with_double_subtitles.mp4
```

In addition, ffmpeg can also perform transcoding and many other operations. It is a very powerful tool and an important component of many audio and video software. More about ffmpeg can be inquired by yourself.

## Material extraction for visual novels

At present, [GARbro](https://github.com/morkt/GARbro) is commonly used, but it cannot be used normally through wine under linux. Here is a cross-platform gal game content extraction tool [arc_unpacker](https://aur.archlinux.org/packages/arc_unpacker-git/). For detailed usage, you can check its github by yourself.
